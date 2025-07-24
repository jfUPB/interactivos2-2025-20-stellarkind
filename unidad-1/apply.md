# Unidad 1  
  
## 🛠 Fase: Apply  
  
### Actividad #5  
Ejemplo que seleccioné: [Generative Design P_3_1_2_02](https://editor.p5js.org/generative-design/full/BJxQl5qqayE)  
[Mi versión modificada de P_3_1_2_02](https://editor.p5js.org/stellarkind/full/2jMKHCrJA)  

La verdad es que al principio me sentía un poco abrumada con la actividad, pero me concentré en buscar un ejemplo que me pareciera chevere de trabajar.


#### **FASE 1: SELECT**  
Elegí el sketch P_3_1_2_02 porque me llamó la atención la forma en que convierte texto en estructuras visuales usando íconos, formas y líneas de conexión. Me interesó el concepto de “escritura visual” y cómo las reglas tipográficas se reinterpretan para crear composiciones gráficas dinámicas. 
  
#### **FASE 2: DESCRIBE**  
Lo primero que hago es solo mirarlo, ¿qué veo? Es como una especie de mapa o circuito, todo hecho con líneas y formas geométricas. Parece que cada vez que escribes algo, se va dibujando un nuevo segmento. La paleta de colores es súper limitada, como amarillo, negro, azul, morado, verde, rojo y rosa. Me llama la atención cómo los caracteres de texto no son letras normales, sino que se transforman en estos segmentos visuales, algunos rectos, otros curvos, y hasta algunos parecen estaciones o íconos.
Analizando el ejemplo, identifiqué que:
- El texto o caracteres pues ingresado por el usuario genera visualmente una “línea” o “recorrido” compuesto de bloques, íconos y curvas.
- Cada carácter se traduce en una forma o acción (curva, estación, ícono) según reglas predefinidas en un switch-case.
- La posición se va acumulando mediante ```translate()```, y las rotaciones son el resultado de decisiones aleatorias o asociadas al carácter, los íconos se rotan según esto también.
- Usa una paleta limitada de colores combinada con rotación de tonos.
- Se puede rotar el canvas.
- Tiene interacción básica con el mouse para mover la vista y teclas para agregar o eliminar texto, hacer zoom o guardar la imagen.
- Además de que va guardando los ultimos 7 caracteres enviados en caso de que se presione "o" los escribe como si fuese el nombre de la figura que para mi lo que representa es una estación.
Uhm, también veo que hay un cursor que parpadea al final, como si estuviera listo para que siga escribiendo. Me parece súper interesante cómo el texto se convierte en una especie de "camino" visual. El color cambia cada vez que hay un salto de línea (que supongo que es el enter).

#### **FASE 3: ANALYZE**
A nivel lógico, el sistema funciona como una “máquina de interpretación” de texto, donde cada letra es una instrucción gráfica, el sistema traduce los inputs del teclado en la forma asignada dentro del código. Después de explorar el código a fondo, con mayor presición puedo decir que el principio central de este sketch es la "representación visual secuencial de una cadena de caracteres mediante transformaciones acumulativas".
Mis ideas iniciales:
- ¿Cómo sabe el programa qué dibujar para cada letra? Supongo que debe haber una especie de "diccionario" o switch case que mapea cada carácter a una forma específica.
- ¿De dónde vienen esas formas? El archivo data con los SVGs que me pasaste tiene sentido ahora. El programa debe estar cargando esos SVGs y usándolos.
- ¿Cómo se conectan las formas? Parece que después de dibujar una forma, el sistema se "mueve" a un nuevo punto y rota para dibujar la siguiente. Esto es lo que crea ese efecto de camino. Las funciones translate() y rotate() deben ser clave aquí.
- El zoom y el movimiento: Eso debe ser con mouseX, mouseY, scale() y translate() en el draw y mousePressed.
- Los colores: Hay una paleta predefinida. Supongo que el fill() cambia el color.
  
Ahora que ya leí el código, voy a desglosarlo en partes más pequeñas y describir la función de cada una, como si estuviera preparando un plan para mi propia versión.  
-  **Carga de Recursos (```preload()```):**  
    - **Propósito:** Cargar la fuente miso-bold.ttf y todas las imágenes SVG (space.svg, comma.svg, etc.). Sin esto, no hay gráficos ni texto personalizado.
    - **Dependencias:** Necesita la carpeta data con los archivos.  
- **Configuración Inicial (```setup()```):**
  - **Propósito:** Preparar el lienzo de p5.js, definir la  s dimensines, inicializar variables de control (centerX, centerY, zoom, actRandomSeed), y establecer el estilo gráfico base (textFont, noStroke, fill).
  - **Dependencias:** Se basa en windowWidth, windowHeight de p5.js y las variables globales.
- **Bucle de Dibujo Principal (draw()):**
  - **Propósito:** Esto se ejecuta constantemente. Dibuja el fondo, maneja la lógica de arrastre del mouse, aplica transformaciones globales (translate, scale), y lo más importante, itera sobre cada carácter de textTyped para dibujar la composición.
  - **Dependencias:** textTyped, las variables de transformación, palette, y todas las imágenes y la fuente cargadas.
- **Lógica de Caracteres (El switch en ```draw()```):**
  - **Propósito:** Es el "cerebro" que decide qué dibujar y cómo mover el "cursor" de dibujo para cada carácter específico (' ', ',', '.', '\n', 'o', etc.). También maneja el cambio de color para los saltos de línea.
  - **Dependencias:** Todas las variables de imágenes, translate(), rotate(), image(), rect(), ellipse(), text(), push(), pop(). Es donde curre la magia generativa.
- **Interacción del Usuario (```mousePressed()```, ```keyReleased()```, ```keyPressed()```, ```keyTyped()```):**
  - **Propósito:** Permitir que el usuario interactúe con el dibujo: moverlo, hacer zoom, escribir texto, borrar texto, guardar la imagen y generar nuevos layouts.
  - **Dependencias:** Variables de zoom, textTyped, centerX, centerY, y funciones de p5.js como saveCanvas(), keyCode, key.
Básicamente, el programa es un bucle que lee un texto y para cada letra, elige una "regla" de dibujo (un bloque en el switch case) que dibuja algo y luego mueve el punto de origen para la siguiente letra. ¡Es como un robot dibujante que sigue instrucciones de texto! Las funciones push() y pop().  
  
#### **FASE 4: CONVERT**  
Mi plan de reconstrucción:  
_Quiero hacer algo parecido, pero más simple. En lugar de usar todos los SVGs y todas las reglas complicadas, voy a centrarme en el concepto principal: un texto que dibuja un camino._
1. Crear un dibujo generativo donde cada letra del texto textTyped (que escribiré yo) genere una forma básica (quizás solo rectángulos) y cambie la dirección de una línea.
2. Configuración:  
    - Mantendré el lienzo que se ajusta a la ventana.
    - Mantendré el zoom y el arrastre del mouse, porque son interacciones útiles y ya entendí cómo funcionan.
    - Necesito una variable textTyped para mi texto.
    - Lógica del Dibujo (draw()):
        - Quiero que cada carácter haga algo diferente, pero más simple que el original.
        - Letras normales (a-z, 0-9): Dibujarán un rectángulo simple (como en el original) y avanzarán el "cursor" de dibujo.
        - Espacio (' '): En lugar de dos SVGs diferentes, haré que el espacio simplemente avance más que una letra, sin rotar al principio. O tal vez que rote un poquito para que el camino no sea tan recto siempre.
        - Coma (','): Quiero que dibuje un círculo y rote un poco, para que se vea como un "nudo" o un desvío.
        - Punto ('.'): Que dibuje una línea más larga y rote más bruscamente.
        - Salto de línea ('\n'): Esto es importante. Quiero que salte a una nueva posición aleatoria y cambie de color, igual que el original, porque me pareció un efecto muy bueno.
        - Otros caracteres: Los ignoraré o los trataré como letras normales si no los defino específicamente.
3. Interacción:
    - keyTyped(): Para añadir caracteres al textTyped.
    - keyPressed(): Para BACKSPACE (borrar), ENTER (salto de línea) y el zoom (UP_ARROW, DOWN_ARROW).
    - mousePressed(): Para arrastrar el lienzo.
4. Otras consideraciobnes que tuve:
    - La parte de translate() y rotate() es la más delicada. Si no las uso bien o no uso push() y pop() en los lugares correctos, mi dibujo se va a ir por todos lados o se va a superponer de forma extraña.
    - Calcular los valores de translate después de dibujar cada forma para que la siguiente empiece en el lugar correcto será un desafío. El ejemplo original usa letterWidth para eso, lo cual es inteligente.
    - Manejar la carga de la fuente )aunque usé la misma del código original) y asegurar que la carpeta data esté bien configurada para el p5.js web editor.

#### **FASE 5: EXPLORE**
Primero, necesito mi index.html básico para cargar p5.js y mi sketch.js.
``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Patrón Generativo</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.dom.min.js"></script>
    <style>
      body {
        margin: 0;
        overflow: hidden; /* Evita barras de desplazamiento */
      }
      canvas {
        display: block;
      }
    </style>
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```
La verdad para esta parte (el index) utilicé las recomendaciones de gemini.ai porque nunca me había tocado hacer esto a mano.
Ahora, el sketch.js. Voy a empezar con lo básico y luego añadir las reglas para cada carácter.
``` js
// Mi intento de P_3_1_2_02 simplificado

var myText = "hola mundo esto es una prueba\ncon varias lineas, a ver que tal"; // Mi texto inicial
var myFont;

var centerX;
var centerY;
var offsetX;
var offsetY;
var currentZoom; // Le cambié el nombre a zoom por currentZoom para no confundirme con el del ejemplo
var currentRandomSeed;

var myPalette = [ // Mi propia paleta de colores, más simple
  [255, 100, 0], // Naranja
  [0, 150, 255], // Azul
  [50, 200, 50], // Verde
  [200, 50, 200] // Morado
];
var myColorIndex = 0;

function preload() {
  // Por ahora, voy a asumir que tengo 'data/miso-bold.ttf' o usaré una fuente predeterminada si falla.
  // Realmente aquí lo que hice fue descargar la carpeta de assetz del ejempo original y subirla tal cual
  myFont = loadFont('data/miso-bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  offsetX = 0;
  offsetY = 0;
  currentZoom = 0.8; // Un zoom un poco diferente
  currentRandomSeed = 10; // Otra semilla

  cursor(HAND);
  textFont(myFont, 20); // Tamaño de fuente un poco más pequeño
  textAlign(LEFT, BASELINE);
  noStroke();
  fill(0); // Color inicial negro
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255); // Fondo blanco

  if (mouseIsPressed && mouseButton === LEFT) { // Uso '===' por buena práctica
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  randomSeed(currentRandomSeed); // Aplico mi semilla

  translate(centerX, centerY);
  scale(currentZoom);

  push(); // Guardo el estado inicial para el cursor

  // Inicio de la "línea" principal, un pequeño marcador
  myColorIndex = 0;
  fill(myPalette[myColorIndex][0], myPalette[myColorIndex][1], myPalette[myColorIndex][2]);
  rect(0, -10, 15, 25); // Un marcador inicial diferente

  for (var i = 0; i < myText.length; i++) {
    var char = myText.charAt(i); // Cambié 'letter' a 'char'
    var charWidth = textWidth(char); // Ancho del carácter

    switch (char) {
      case ' ':
        // Intento 1: Que el espacio avance más y gire un poco aleatoriamente
        translate(charWidth * 2, 0); // Avanza el doble del ancho de un espacio
        rotate(random(-PI / 12, PI / 12)); // Gira un poco, entre -15 y 15 grados
        break;

      case ',':
        // Intento 2: Dibujar un círculo y girar
        ellipse(0, 0, 15, 15); // Un pequeño círculo
        translate(20, 0); // Avanza un poco
        rotate(PI / 4); // Gira 45 grados
        break;

      case '.':
        // Intento 3: Una línea larga y un giro más brusco
        rect(0, -5, 40, 10); // Una línea/rectángulo más largo
        translate(40, 0); // Avanza su longitud
        rotate(-PI / 2); // Gira 90 grados
        break;

      case '\n':
        // Esta parte la entendí bien del original y la quiero replicar
        pop(); // Restauro el estado previo antes de la nueva línea
        push(); // Guardo el nuevo estado
        translate(random(-200, 200), random(-200, 200)); // Nueva posición aleatoria
        rotate(floor(random(4)) * HALF_PI); // Rotación aleatoria en múltiplos de 90 grados
        myColorIndex = (myColorIndex + 1) % myPalette.length; // Siguiente color
        fill(myPalette[myColorIndex][0], myPalette[myColorIndex][1], myPalette[myColorIndex][2]);
        rect(0, -10, 15, 25); // Marcador en la nueva línea
        break;

      default: // Todas las demás letras
        rect(0, -10, charWidth + 5, 20); // Dibujo un rectángulo con un poco más de ancho
        translate(charWidth + 5, 0); // Avanzo el ancho del rectángulo
        break;
    }
    // Asegurarme de que el color actual siempre se aplique
    fill(myPalette[myColorIndex][0], myPalette[myColorIndex][1], myPalette[myColorIndex][2]);
  }

  // Cursor que parpadea (lo mantengo igual, me gustó el efecto)
  fill(200, 30, 40);
  if (frameCount / 6 % 2 === 0) rect(0, 0, 10, 2); // Un cursor un poco más pequeño

  pop(); // Restaura el estado guardado al inicio de draw()
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  // No voy a implementar saveCanvas ni ALT por ahora, quiero que funcione lo básico
  // if (keyCode == CONTROL) saveCanvas('mi_dibujo_' + gd.timestamp(), 'png');
  // if (keyCode == ALT) currentRandomSeed++;
}

function keyPressed() {
  switch (keyCode) {
    case BACKSPACE: // p5.js usa BACKSPACE, no DELETE
      myText = myText.substring(0, myText.length - 1);
      print(myText);
      break;
    case ENTER:
      myText += '\n';
      print(myText);
      break;
    case UP_ARROW:
      currentZoom += 0.02; // Cambio la velocidad del zoom
      break;
    case DOWN_ARROW:
      currentZoom -= 0.02;
      break;
  }
}

function keyTyped() {
  // Asegurarme de que no se agreguen teclas de control
  if (keyCode >= 32) { // Todos los caracteres imprimibles
    myText += key;
    print(myText);
  }
}
```
El problema principal acá en este primer intento fue que si bien en funcionalidad es muy similar como versión simplificada, visualmente está un poco feita para mi gusto.
Reflexiones y errores encontrados (y cómo los "arreglé" oidentifiqué):
- ```switch``` case de espacio: Mi lógica inicial para el espacio translate(charWidth * 2, 0); no es del todo buena porque textWidth(' ') suele ser cero o muy pequeño. El original usa image(shapeSpace, 0, -15); translate(2, 0); que es un movimiento fijo. Yo necesito una forma de avanzar. Mi solución actual de charWidth * 2 podría no ser muy efectiva. Mejor poner un valor fijo, como translate(30, 0); para el espacio, así avanza visiblemente.
- Los ```fill():``` Me di cuenta que estaba cambiando el fill al inicio del draw y luego solo en el \n case. Pero si un carácter no cambia el color (como un espacio o una 'a'), la próxima forma podría dibujarse con el color del carácter anterior. Agregué ```fill(myPalette[myColorIndex][0], myPalette[myColorIndex][1], myPalette[myColorIndex][2]);``` dentro del bucle for pero después del switch para asegurarme de que cada forma se dibuje con el color actual de la paleta. ¡Esto es importante para que el cambio de color de \n se vea!
- Recordé que en p5.js para la tecla de borrar suele ser BACKSPACE, no DELETE (aunque algunas veces DELETE también funciona, es más seguro usar BACKSPACE). Lo corregí en keyPressed.
- Mi ```rect(0, -10, 15, 25);``` al inicio del draw está bien, pero los translate y rotate dentro del switch necesitan estar bien calibrados para que el "camino" se vea continuo. El ```y``` de ```-10``` es mi intento de centrarlo verticalmente.
<img width="1919" height="945" alt="image" src="https://github.com/user-attachments/assets/7ad05bfa-a1d7-4c31-b013-47b00b29a0a9" />

  
#### **FASE 6: TINKER**
Ahora que tengo una versión medianamente funcional, es el momento de jugar y ver qué pasa si cambio algunas cosas. 
**Experimento 1: Cambiar la paleta de colores.**
``` js
var myPalette = [
  [128, 0, 128],  // Morado
  [0, 128, 0],    // Verde
  [255, 255, 0]   // Amarillo
];
```
- Qué hice: Cambié ```myPalette``` a colores que me gustan más.
- Los cambios de línea ahora son mucho más vibrantes y el contraste es distinto. Esto confirma que la palette y myColorIndex funcionan como esperaba.
  
**Experimento 2: Ajustar las rotaciones y traslaciones.**
- Qué hice: Modifiqué los valores en el switch para ver cómo afectaba la forma del camino.
    - En el case ' ': cambié rotate(random(-PI / 12, PI / 12)) a rotate(random(-PI / 6, PI / 6)) para rotaciones más drásticas.
    - En el case ',': cambié rotate(PI / 4) a rotate(PI / 2) para un giro de 90 grados exacto.
    - En el default: Cambié translate(charWidth + 5, 0) a translate(charWidth + 10, 0) para que los rectángulos de las letras se separen más.
- Resultado: El camino se vuelve mucho más irregular y "quebrado". Los círculos de las comas ahora giran las líneas de forma muy notoria. Las letras se ven más separadas. Esto me ayuda a entender la relación entre los valores de translate y rotate y la continuidad visual del camino. Pequeños cambios aquí hacen una gran diferencia.
  
**Experimento 3: Cambiar la forma de las "letras".**
- Qué hice: En el default case, en lugar de un rect, intenté dibujar una triangle.
``` js
default: // Todas las demás letras
  // Intenté dibujar un triángulo en lugar de un rectángulo
  triangle(0, -10, charWidth + 5, -10, (charWidth + 5) / 2, 0);
  translate(charWidth + 5, 0);
  break;
```
- Resultado: ¡Se ve súper raro al principio! Los triángulos están girando y superponiéndose de una manera que no esperaba. Me di cuenta de que la forma del triangle no se dibuja desde el "punto de origen" de la misma manera que el rect. El rect(x, y, w, h) es relativo a (x, y) en la esquina superior izquierda. Un triangle(x1, y1, x2, y2, x3, y3) necesita tres puntos.
- Reflexión: Esto me enseña que la elección de la forma y cómo se dibujan (rect vs triangle vs ellipse) es crucial en relación con translate y rotate. Tengo que pensar en el "punto de anclaje" de cada forma. Para un triángulo que se vea bien, tendría que calcular sus vértices para que el translate siguiente los ponga en el lugar correcto.
- Volver atrás: Por ahora, voy a volver a los rect porque son más fáciles de controlar con translate. ¡Pero es un aprendizaje valioso!
  
**Experimento 4: Quitar el randomSeed temporalmente.**
- Qué hice: Comenté la línea randomSeed(currentRandomSeed); en draw().
- Resultado: ¡Ahora el patrón cambia cada vez que se redibuja (cada frame)! No es un patrón consistente. Esto me ayuda a entender la importancia de randomSeed si quiero patrones reproducibles o si quiero que se genere un nuevo patrón solo cuando presiono Alt (si lo hubiera implementado). Me confirma que la aleatoriedad en las rotaciones o en las posiciones de salto de línea se aplica en cada frame si no hay una semilla fija.
  
C{odigo final de el ejercicio:
``` js
// Mi intento de P_3_1_2_02 simplificado final

var myText = "hola mundo esto es una prueba\ncon varias lineas, a ver que tal sale.\n";
var myFont;

var centerX;
var centerY;
var offsetX;
var offsetY;
var currentZoom;
var currentRandomSeed;

// ¡Nueva paleta de colores: morado, verde y amarillo!
var myPalette = [
  [128, 0, 128],  // Morado
  [0, 128, 0],    // Verde
  [255, 255, 0]   // Amarillo
];
var myColorIndex = 0;

function preload() {

  try {
    myFont = loadFont('data/miso-bold.ttf');
  } catch (e) {
    console.warn("No se pudo cargar la fuente 'miso-bold.ttf'. Se usará la fuente predeterminada.", e);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  offsetX = 0;
  offsetY = 0;
  currentZoom = 0.8;
  currentRandomSeed = 10;

  cursor(HAND);
  // Asegurarse de que la fuente esté cargada antes de intentar usarla
  if (myFont) {
    textFont(myFont, 20);
  } else {
    // Si no se cargó la fuente, usa una genérica o el tamaño por defecto
    textSize(20);
  }
  textAlign(LEFT, BASELINE);
  noStroke();
  fill(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  if (mouseIsPressed && mouseButton === LEFT) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  randomSeed(currentRandomSeed); // Mantengo la semilla para patrones reproducibles

  translate(centerX, centerY);
  scale(currentZoom);

  push();

  // Marcador inicial
  myColorIndex = 0;
  fill(myPalette[myColorIndex][0], myPalette[myColorIndex][1], myPalette[myColorIndex][2]);
  rect(0, -10, 15, 25);

  for (var i = 0; i < myText.length; i++) {
    var char = myText.charAt(i);
    var charWidth = textWidth(char); // Obtener el ancho del carácter para el avance

    switch (char) {
      case ' ':
        // Después de probar, un avance fijo y una rotación más pronunciada para el espacio
        translate(30, 0);
        rotate(random(-PI / 6, PI / 6)); // Mayor rotación
        break;

      case ',':
        ellipse(0, 0, 15, 15);
        translate(20, 0);
        rotate(PI / 2); // Rotación de 90 grados
        break;

      case '.':
        rect(0, -5, 40, 10);
        translate(40, 0);
        rotate(-PI / 2);
        break;

      case '\n':
        pop();
        push();
        translate(random(-200, 200), random(-200, 200));
        rotate(floor(random(4)) * HALF_PI);
        myColorIndex = (myColorIndex + 1) % myPalette.length;
        fill(myPalette[myColorIndex][0], myPalette[myColorIndex][1], myPalette[myColorIndex][2]);
        rect(0, -10, 15, 25);
        break;

      default:
        // Volví a los rectángulos, con un avance que considera el ancho del texto y un poco más
        rect(0, -10, charWidth + 5, 20);
        translate(charWidth + 5, 0);
        break;
    }
    // Aplicar el color actual después de cada forma para que los cambios de color se vean
    fill(myPalette[myColorIndex][0], myPalette[myColorIndex][1], myPalette[myColorIndex][2]);
  }

  // Cursor que parpadea
  fill(200, 30, 40);
  if (frameCount / 6 % 2 === 0) rect(0, 0, 10, 2);

  pop();
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  // No implementé estas funcionalidades para simplificar
  // if (keyCode == CONTROL) saveCanvas('mi_dibujo_' + gd.timestamp(), 'png');
  // if (keyCode == ALT) currentRandomSeed++;
}

function keyPressed() {
  switch (keyCode) {
    case BACKSPACE:
      myText = myText.substring(0, myText.length - 1);
      print(myText);
      break;
    case ENTER:
      myText += '\n';
      print(myText);
      break;
    case UP_ARROW:
      currentZoom += 0.02;
      break;
    case DOWN_ARROW:
      currentZoom -= 0.02;
      break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    myText += key;
    print(myText);
  }
}
```
<img width="1910" height="944" alt="image" src="https://github.com/user-attachments/assets/883d10be-d216-4124-bb0c-0a1dd06ac0b2" />
  
#### **FASE 7: DOCUMENT**
- ¿Qué hice y por qué?
    - Mi objetivo fue reconstruir una versión simplificada del ejemplo P_3_1_2_02 de Generative Design. Me centré en el concepto de que el texto puede ser un "plano" para generar un dibujo dinámico.
    - Simplificación: No usé todos los SVGs ni todas las reglas de los íconos del original. Me enfoqué en:
    - Cargar los asests.
    - Utilizar formas básicas de p5.js (rectángulos, elipses).
    - Implementar reglas para espacios, comas, puntos, saltos de línea y letras genéricas.
    - Mantener la interactividad clave: arrastrar el lienzo, zoom, escribir y borrar texto.
- Elecciones y Razones:
    - preload() y setup(): Entendí que son fundamentales para preparar el ambiente. Asegurar que la fuente se cargue es vital para el textWidth y textFont.
    - draw() y el bucle for: Este es el corazón. Iterar sobre cada carácter y usar un switch para aplicar reglas específicas me parece una forma muy eficiente de organizar la lógica.
    - translate() y rotate(): Estos son los superhéroes de las transformaciones. Me di cuenta de que si no calculo bien cuánto avanzar después de cada forma (charWidth + X), el dibujo se superpone o deja huecos raros.
    - rotate() es lo que le da esa organicidad o desorden al camino.
    - push() y pop(): Sin ellos, las rotaciones y traslaciones se acumularían sin control, y cada nueva "línea" comenzaría desde el final y la rotación de la anterior, resultando en un caos total. push() y pop() me permiten aislar las transformaciones de una sección.
    - randomSeed(): Me mostró cómo la aleatoriedad puede ser controlada para generar patrones consistentes o nuevos patrones. Es clave para el aspecto "generativo".
    - Interacción del usuario: Implementar keyTyped(), keyPressed() y mousePressed() es lo que hace que la composición sea dinámica y reactiva, no solo un dibujo estático.

Reflexión sobre el proceso de aprendizaje:
Este método de Deconstrucción/Reconstrucción es realmente poderoso y me dejó las siguientes reflexiones:
- **OBSERVAR:** Me ayudó a tener una idea general de lo que quería lograr y a identificar las características visuales clave.
EXPLORAR (código original): Fue un poco denso al principio, pero leer cada línea y los comentarios me dio una base sólida. Entender las variables, las funciones de p5.js y el flujo del programa fue crucial. Ver cómo usaban los SVGs y translate/rotate fue una revelación.
- **ANALYZE:** Desglosar el código en funciones lógicas me ayudó a digerir la complejidad y a ver las interconexiones. Es como hacer un mapa del programa.
- **CONVERT:** Planificar mi propia versión, simplificando y pensando en mis propias reglas, me obligó a procesar la información y no solo copiar. También me hizo anticipar posibles problemas, como la carga de la fuente.
- **EXPLORE (reconstruction) y TINKER:** Aquí es donde la teoría se convierte en práctica. Cometer errores y tener que depurarlos (como el fill() o la importancia de la fuente) fue la parte más valiosa. Jugar con los valores de rotate y translate realmente cimentó mi comprensión de las transformaciones. Ver cómo pequeños ajustes cambian el resultado final es súper satisfactorio y educativo. Me di cuenta de que la experimentación es clave en el diseño generativo.
- **DOCUMENT:** Organizar mis pensamientos y reflexionar sobre lo que aprendí me ayuda a consolidar el conocimiento y a verbalizarlo, lo cual es importante para entenderlo de verdad.

  
Actividad 4
---
[Generative Design P_2_1_3_04](https://editor.p5js.org/generative-design/sketches/P_2_1_3_04)  
[Mi versión del ejercicio](https://editor.p5js.org/stellarkind/full/aAtw8ss5V)  
Partí de la consigna de generar formas geométricas con posición, tamaño y color aleatorios usando p5.js. En lugar de dispersar las formas al azar por toda la pantalla, decidí organizarlas dentro de una cuadrícula, como en la Actividad 03, para darle más estructura visual al patrón, donde cada celda de la cuadrícula contiene una forma aleatoria (círculo, cuadrado o triángulo), rotada al azar y con tamaño y opacidad variables.  
Además, programé que:  
- Al presionar cualquier tecla, se agregue una nueva capa de formas sobre la cuadrícula, superponiéndose visualmente con las anteriores.  
- Al presionar Backspace o Delete, el lienzo se reinicie y se genere una nueva cuadrícula limpia.
La paleta de colores está restringida a tonos de morado, amarillo y verde (pq me gustan), jugando con la transparencia para que las superposiciones generen mezclas y texturas visuales interesantes.

Quería explorar la sensación de acumulación visual y cómo la repetición aleatoria sobre una estructura fija (la cuadrícula) puede generar resultados inesperados.
Elegí no borrar el canvas al generar nuevas formas para ver cómo la interacción del usuario construye la composición poco a poco. 
