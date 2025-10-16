// server.js (ESM)
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// --- util para __dirname en ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- app/http/io ---
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: true, methods: ['GET', 'POST'] }
});

// ---------- estado en memoria ----------
const aerials = new Map(); // Map<socketId, { id, color:{r,g,b}, hex, updatedAt }>
const control = {
  speed: 0.5,
  density: 0.5,
  color: { r: 255, g: 255, b: 255 }
};

// ---------- helpers ----------
const rgbToHex = ({ r, g, b }) =>
  '#' + [r, g, b]
    .map(v => Math.max(0, Math.min(255, Number(v) | 0)).toString(16).padStart(2,'0'))
    .join('');

const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex || ''));
  if (!m) return { r: 255, g: 255, b: 255 };
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
};

// ---------- static (clientes) ----------
app.use('/mobile',  express.static(path.join(__dirname, 'MobileClient')));
app.use('/desktop', express.static(path.join(__dirname, 'DesktopClient')));
app.use('/control', express.static(path.join(__dirname, 'Control')));
app.use('/visuals', express.static(path.join(__dirname, 'Visuals')));

// ---------- landing raíz ----------
app.get('/', (_req, res) => {
  res.send(`
    <h1>Clientes</h1>
    <ul>
      <li><a href="/mobile/">Mobile</a></li>
      <li><a href="/desktop/">Desktop</a></li>
      <li><a href="/control/">Control</a></li>
      <li><a href="/visuals/">Visuals</a></li>
      <li><a href="/api/aerials">API · Aerials</a></li>
    </ul>
  `);
});

// ---------- API ----------
app.get('/api/aerials', (_req, res) => {
  res.json({ count: aerials.size, aerials: Array.from(aerials.values()) });
});

// ---------- SOCKET.IO ----------
io.on('connection', (socket) => {
  const referer = (socket.handshake.headers.referer || '').toLowerCase();

  socket.emit('whoami', { id: socket.id });

  // Room "Visuales" (para el renderer)
  socket.on('messageClienteVisuales', () => {
    socket.join('Visuales room');
    console.log(`Client ${socket.id} joined 'Visuales room'`);
  });

  // CONTROL: slider individual
  socket.on('slider_changed', (data) => {
    if (data && typeof data.label === 'string') {
      if (data.label === 'speed')   control.speed   = Number(data.value);
      if (data.label === 'density') control.density = Number(data.value);
    }
    io.to('Visuales room').emit('slider_changed', data); // para Visuals
    io.emit('state', { state: { control, aerials: Array.from(aerials.values()) } }); // debug/TD/UIs
  });

  // CONTROL/DESKTOP: estado completo
  socket.on('update', (newControl) => {
    if (newControl && typeof newControl === 'object') {
      Object.assign(control, newControl);
      io.emit('state', { state: { control, aerials: Array.from(aerials.values()) } });
    }
  });

  // MOBILE: alta al conectar (detectado por URL /mobile)
  const isMobileClient = referer.includes('/mobile');
  if (isMobileClient) {
    const hex = '#ffffff';
    const rgb = hexToRgb(hex);
    const aerial = { id: socket.id, color: rgb, hex, updatedAt: Date.now() };
    aerials.set(socket.id, aerial);
    console.log(`(MOBILE) Aerial creado: ${socket.id}`);

    socket.emit('state:init', { control, aerials: Array.from(aerials.values()) });
    io.emit('state', { state: { control, aerials: Array.from(aerials.values()) } });
  }

  // MOBILE: cambio color HEX
  socket.on('mobile:colorHex', (hex) => {
    const a = aerials.get(socket.id);
    if (!a) return;
    const rgb = hexToRgb(hex);
    a.color = rgb;
    a.hex = rgbToHex(rgb);
    a.updatedAt = Date.now();
    aerials.set(socket.id, a);

    io.emit('state', { state: { control, aerials: Array.from(aerials.values()) } });
    io.emit('color', { type:'color', id:socket.id, r:rgb.r, g:rgb.g, b:rgb.b, hex:a.hex, updatedAt:a.updatedAt });
  });

  // MOBILE: cambio color RGB
  socket.on('mobile:colorRgb', (rgb) => {
    const a = aerials.get(socket.id);
    if (!a) return;
    const safe = {
      r: Math.max(0, Math.min(255, Number(rgb?.r) || 0)),
      g: Math.max(0, Math.min(255, Number(rgb?.g) || 0)),
      b: Math.max(0, Math.min(255, Number(rgb?.b) || 0)),
    };
    a.color = safe;
    a.hex = rgbToHex(safe);
    a.updatedAt = Date.now();
    aerials.set(socket.id, a);

    io.emit('state', { state: { control, aerials: Array.from(aerials.values()) } });
    io.emit('color', { type:'color', id:socket.id, r:safe.r, g:safe.g, b:safe.b, hex:a.hex, updatedAt:a.updatedAt });
  });

  socket.on('disconnect', () => {
    if (aerials.has(socket.id)) {
      aerials.delete(socket.id);
      console.log(`(MOBILE) Aerial removido: ${socket.id}`);
      io.emit('state', { state: { control, aerials: Array.from(aerials.values()) } });
    }
  });
});

// ---------- start ----------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
