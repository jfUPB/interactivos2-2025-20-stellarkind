# Unidad 3
Profe le agradezco si me recibe el trabajo, se me ha dificultado asistir a las últimas clases de la materia por temas de salud. No se si ya le compartieron mi proceso de ajustes razonables en este semestre, si no es así por favor hazmelo saber y al correo te envío toda la información.


## 💡 Fase: Set 
### Actividad 01: Caso de estudio  

Diagrama de bloques:

<img width="621" height="111" alt="SFI2DiagBloques drawio" src="https://github.com/user-attachments/assets/17262356-a16a-46a2-974c-b649c68733c8" />

Descripción paso por paso:
1. Cliente móvil envía datos de la posición.
2. Calculo y serialización de json para envío al servidor.
3. Servidor manda mensajes a receptores del mensaje de móvil (a desktop).
4. Cliente desktop deserializa json y dibuja la posición recibida.

## 🔎 Fase: Seek  
### Actividad 02: Modificación de la aplicación base

El código de cada una de las aplicaciones:
- public/desktop/sketch.js:
``` js
let socket;
let circleX = 200;
let circleY = 200;
const port = 3000;


function setup() {
    createCanvas(300, 400);
    background(220);

    //let socketUrl = 'http://localhost:3000';
    socket = io(); 

    // Evento de conexión exitosa
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    // Recibir mensaje del servidor
    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
        try {
            let parsedData = JSON.parse(data);
            /*
            if (parsedData && parsedData.type === 'touch') {
                circleX = parsedData.x;
                circleY = parsedData.y;
            }
            */
        } catch (e) {
            console.error("Error parsing received JSON:", e);
        }
    });    

    // Evento de desconexión
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    fill(255, 0, 0);
    ellipse(circleX, circleY, 50, 50);
}
```
- public/mobile/sketch.js:
``` js
let socket;
let lastTouchX = null; 
let lastTouchY = null; 
const threshold = 5;

function setup() {
    createCanvas(300, 400);
    background(220);

    // Conectar al servidor de Socket.IO
    //let socketUrl = 'http://localhost:3000';
    socket = io();

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    fill(255, 128, 0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Touch to move the circle', width / 2, height / 2);
}

function touchMoved() {
    if (socket && socket.connected) { 
        let dx = abs(mouseX - lastTouchX);
        let dy = abs(mouseY - lastTouchY);

        if (dx > threshold || dy > threshold || lastTouchX === null) {
            let touchData = {
                type: 'touch',
                x: mouseX,
                y: mouseY
            };
            socket.emit('message', JSON.stringify(touchData));

            lastTouchX = mouseX;
            lastTouchY = mouseY;
        }
    }
    return false;
}
```
- public/mobile2/sketch.js:
``` js
let socket;
let lastTouchX = null; 
let lastTouchY = null; 
const threshold = 5;

function setup() {
    createCanvas(300, 400);
    background(220);

    // Conectar al servidor de Socket.IO
    //let socketUrl = 'http://localhost:3000';
    socket = io();

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    fill(255, 128, 0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Touch to move the circle', width / 2, height / 2);
}

function touchMoved() {
    if (socket && socket.connected) { 
        let dx = abs(mouseX - lastTouchX);
        let dy = abs(mouseY - lastTouchY);

        if (dx > threshold || dy > threshold || lastTouchX === null) {
            let touchData = {
                type: 'touch-2',
                x: mouseX,
                y: mouseY
            };
            socket.emit('message', JSON.stringify(touchData));

            lastTouchX = mouseX;
            lastTouchY = mouseY;
        }
    }
    return false;
}

```
[Enlace al video de Youtube](https://youtu.be/ny3gZfxj594)

## 🛠 Fase: Apply  
### Actividad 03: Finalización del prototipo  
- public/control/sketch.js:
``` js
let socket;
let lastTouchX = null; 
let lastTouchY = null; 
const threshold = 5;

function setup() {
    createCanvas(300, 400);
    background(220);

    // Conectar al servidor de Socket.IO
    //let socketUrl = 'http://localhost:3000';
    socket = io();

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    fill(255, 128, 0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Touch to change the color', width / 2, height / 2);
}

function touchMoved() {
    if (socket && socket.connected) { 
        let dx = abs(mouseX - lastTouchX);
        let dy = abs(mouseY - lastTouchY);

        if (dx > threshold || dy > threshold || lastTouchX === null) {
            let touchData = {
                type: 'color',
                x: mouseX,
                y: mouseY
            };
            socket.emit('message', JSON.stringify(touchData));

            lastTouchX = mouseX;
            lastTouchY = mouseY;
        }
    }
    return false;
}
```
- public/desktop/sketch.js con cambios realizados:
``` js
let socket;
let circleX = 200;
let circleY = 200;
const port = 3000;
let squareX = 100;
let squareY = 100;
let purple;

function setup() {
    purple = color(188, 155, 243);
    createCanvas(300, 400);
    background(220);

    //let socketUrl = 'http://localhost:3000';
    socket = io(); 

    // Evento de conexión exitosa
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    // Recibir mensaje del servidor
    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
        try {
            let parsedData = JSON.parse(data);
            
            if (parsedData.type === 'touch') {
                circleX = parsedData.x;
                circleY = parsedData.y;
            }else if(parsedData.type === 'touch-2'){
                squareX = parsedData.x;
                squareY = parsedData.y;
            }else if(parsedData.type === 'color'){
                let r = Math.max(0, Math.min(255, parsedData.x));
                let g = Math.max(0, Math.min(255, parsedData.y));
                purple = color(r, g, 200);
            }

        } catch (e) {
            console.error("Error parsing received JSON:", e);
        }
    });    

    // Evento de desconexión
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    fill(purple);
    noStroke();
    ellipse(circleX, circleY, 50, 50);
    rect(squareX,squareY,100,50);
}

```
[Enlace al video de Youtube](https://youtu.be/HNPM2E-NoC8)

## 🤔 Fase: Reflect  
### Actividad 04: Autoevaluación

1) Arquitectura y flujo de datos:  
**Flujo completo (móvil → servidor → visuales):**
    - **Clientes móvil:** captura entradas. Cuando detecta cambios sobre un umbral, empaqueta un JSON con tipo de evento y datos y lo envía por socket.emit.
    - **Servidor (Node.js + Socket.IO):** recibe el mensaje, valida estructura mínima, agrega timestamp de servidor y reemite al room de la pieza hacia el renderer. En algunos casos transforma los datos.
    - **Cliente de visuales:** escucha los eventos y mantiene un estado interno con los últimos valores de cada fuente. Aquí vive mi máquina de estados. Cada estado lee los inputs agregados y mapea parámetros a salidas visuales simples (aún placeholders).
    - **Consola de control:** cambia de estado y ajusta parámetros en tiempo real; el servidor propaga esos mensajes al renderer.

1.1. **Rol de cada componente:**  
    - **Móviles:** fuentes de datos “públicas” (sensores/gestos).  
    - **Browser:** inputs adicionales (mouse/teclado/micrófono si quiero).  
    - **Consola de control:** orquesta la narrativa técnica (cambia estados y define parámetros por estado).  
    - **Servidor:** rutea, valida, normaliza y desacopla productores/consumidor.  
    - **Renderer:** integra inputs simultáneos y ejecuta la lógica de _estado → mapeo → salida_.  


2) **Retos técnicos y aprendizajes:**
- **Reto más desafiante:** la consistencia temporal y el volumen de mensajes.
- Al principio tenía una variación en el tiempo de entrega de los paquetes de datos porque cada móvil emitía muy rápido y los paquetes llegaban con desorden.
    - Solución:
        - Implementé validación básica del payload y descarté mensajes demasiado grandes o mal formados.
        - Cuidé no mezclar sesiones.
- **Aprendizajes:**
    - Los sistemas distribuidos no se tratan solo de “enviar datos”, sino de tiempo, frecuencia y responsabilidades claras.
    - La orquestación por rooms/roles y una convención de eventos estable evita spaghetti.
    - Es preferible una capa de normalización en el servidor antes de reemitir (ej. mapear x,y → r,g,b).
 
3)** Conexión teoría-práctica:**
- **Input–Process–Output:**
    - **Input:** móviles + browser + control remoto.
    - **Process:** servidor + renderer.
    - **Output:** visuales placeholder que ya evidencian reactividad (tamaño/posición/color/text overlays).

- Agencia distribuida (Future Narratives):
    - El público (móviles) tiene agencia local (sus gestos/sensores inciden).
    - El controller define el staging (escena/estado) y los nodos a activar.
    - El renderer habilita distintos estados, con reglas de fusión de inputs, producen trayectorias visuales diferentes.

**¿Tu infraestructura está preparada para las visuales generativas de la siguiente unidad?**
Sí, pues la infraestructura está lista (sockets, rooms, control, máquina de estados, parámetros por estado). Falta diseñar los mapeos estéticos complejos, pero la base técnica ya soporta esas capas creo yo.

---

### Actividad 05: Coevaluación
_NULL_

---

### Actividad 06: Feedback de la unidad  
1. **Efectividad de la transición:**  
Lo más valioso fue la integración gradual de tecnologías con un objetivo claro (sistema en tiempo real). El caso de estudio me ayudó a contextualizar, pero donde más aprendí fue al conectar clientes reales y ver latencia, reconexión, y la disciplina de eventos.
2. **Dificultad técnica:**
    - Sincronización temporal y gestión de frecuencia de mensajes.
    - Pequeños roces con CORS y namespaces/rooms al principio.
    - Decidir dónde transformar datos (cliente vs servidor) para mantener coherencia
3. **Metodología de implementación:**
Prefiero partir de un caso base funcional y modificarlo con guías de “por qué” y “dónde” tocar. Me acelera el aprendizaje y reduce bloqueo inicial; luego ya me siento cómoda rearmando desde cero para la aplicación que quiera darle a la base funcional.
4. **Conexión teoría–práctica:**
Sí vi la conexión IPO/Future Narratives en el ruteo de eventos y la máquina de estados. Donde más costó fue operacionalizar “agencia” en reglas concretas de fusión de inputs sin que una fuente opaque a las otras.
5. **Preparación para visuales:**
Me siento técnicamente lista para integrar visuales generativas complejas.
    - **Confianza:** estructura de sockets estable, control remoto por estado, parámetros en caliente.
    - **Incertidumbre principal:** diseño de mapeos para que múltiples inputs se traduzcan en visuales estéticamente coherentes (evitar ruido visual y saturación). También quiero afinar audio-reactividad y optimización.


