# Unidad 1

## 🔎 Fase: Set + Seek

### Actividad #1:
_**¿Qué es el diseño generativo?**_  
El diseño generativo es un enfoque de creación visual o funcional donde el diseñador no trabaja directamente sobre un resultado final, sino que establece un sistema de reglas, algoritmos o programas capaces de generar múltiples variaciones de un diseño a partir de parámetros definidos. Este método permite la creación de obras adaptativas, cambiantes o con variabilidad controlada, algo muy dificil de lograr manualmente. El diseñador actúa como arquitecto del sistema, definiendo las variables, condiciones y métodos que el sistema seguirá para producir las obras de diseño.   
  
_**¿Qué es el arte generativo?**_  
El arte generativo se refiere a obras visuales, sonoras o multimedia creadas mediante sistemas autónomos que siguen un conjunto de instrucciones definidas por el artista/diseñadore. El arte generativo integra la lógica, el azar y la estética, y puede producir resultados prácticamente infinitos a partir de un mismo sistema.

_**¿Cuál es la diferencia entre el diseño/arte generativo y el diseño/arte tradicional?**_  
El diseño generativo es una forma de crear que parte de establecer un sistema de reglas o un programa que luego puede generar muchas variantes de un mismo diseño. En lugar de diseñar una sola cosa manualmente, se diseña un proceso que produce resultados diferentes según ciertos parámetros. El arte generativo funciona de manera similar, pero con un enfoque más expresivo o estético, donde el artista crea un algoritmo o conjunto de instrucciones, y es la máquina quien genera la obra visual a partir de eso, muchas veces con elementos de azar. A diferencia del diseño o arte tradicional, donde todo depende del control directo de la mano del creador, en lo generativo se delega parte del proceso creativo a la computadora, lo que abre la puerta a explorar nuevas estéticas, automatizar tareas y trabajar con mucha más variabilidad en menos tiempo.  

_**¿Qué posibilidades crees que esto puede ofrecer a tu perfil profesional?**_  
Como futura directora de arte y creadora en el campo del 3D, las soluciones interactivas y los VFX, el diseño y arte generativo me ofrecen: Automatizar procesos creativos y generar múltiples variantes de un concepto visual, puedo diseñar sistemas de identidad visual vivos y adaptativos, así como innovar en la estética visual de proyectos, explorando territorios donde el azar y la programación se mezclen, desarrollando una mentalidad interdisciplinaria al combinar arte, diseño, programación y tecnología.

### Actividad #2:  
**Antes de lo que hemos discutido, _¿Qué pensabas que hacía un Ingeniero en diseño de entretenimiento digital con énfasis en experiencias interactivas?_**  
Antes de todo lo que hemos discutido, pensaba que un Ingeniero en Diseño de Entretenimiento Digital con énfasis en experiencias interactivas se enfocaba sobre todo en crear simuladores o aplicaciones con interacción directa (cosas tipo como interfaces o recorridos virtuales de museos y así). Ahora, y luego de ver SFI I confirmo que va mucho más allá, que también implica ser parte de la creación de experiencias inmersivas, narrativas vivas, instalaciones y proyectos donde la tecnología no solo responde al usuario, sino que incluso se convierte en un actor dentro de la experiencia sin devaluar sino por el contrario enalteciendo las obras o colaboraciones con otros artistas o medios tradicionales.
  
_**¿Qué potencial le ves al diseño e implementación de experiencias inmersivas colectivas?**_  
Creo que tiene un potencial muy grande, pues si bien siempre me ha gustado el arte colaborativo, este tioo de diseñoi y experiencias se convierte en una herramienta para generar conexiones humanas, cuestionar la percepción y abrir espacios de experimentación artística, narrativa o incluso social. Además, plantea posibilidades para integrar arte, tecnología y participación comunitaria en entornos tanto físicos como digitales aportando a la democratización de los espacios artistico-culturales.

**Nosotros estamos definiendo en TIEMPO REAL una nueva forma de expresión, una nueva forma de interactuar de manera colectiva. Estamos diseñando nuevas maneras de contar historias e interactuar con ellas. _¿Cómo te ves profesionalmente en este escenario?**_  
En este escenario profesional, me imagino siendo parte de equipos creativos que exploren la interactividad más allá de las pantallas, combinando arte digital, sonido, diseño generativo y VFX para crear experiencias donde el espectador sea también parte del relato. Me gustaría trabajar en proyectos que mezclen buenas historias, visuales inmersivos y participación colectiva, tanto en el mundo del entretenimiento como en espacios culturales o educativos, siento que me permite pensar diferente y dejar de ver las herramientas digitales como simples medios y verlas como un lenguaje propio con el que se pueden contar historias de formas que antes no eran posibles y apenas estamos empezando a explorar.
  
### Actividad #3:  
El ejemplo que decidí analizar: [Generative Design P_2_1_3_04](https://editor.p5js.org/generative-design/sketches/P_2_1_3_04)
Mi 

- [Mi versión de Generative Design P_2_1_3_04](https://editor.p5js.org/stellarkind/full/prT-lJrs7)

_**Cómo funciona el ejemplo original?**_  
El referente original genera una retícula de módulos visuales donde las formas geométricas (rectángulos o elipses) se transforman con rotaciones, escalas y apilamientos sucesivos. Las teclas 1, 2 o 3 permiten cambiar el modo de visualización, y las flechas ajustan el número de filas y columnas del grid.
El código utiliza la posición del mouse para definir dos parámetros interactivos: 1, La cantidad de repeticiones de las figuras (count), que controla cuántas veces se apila o multiplica la forma. Y 2, El factor de rotación (para), que varía en función de la posición vertical del cursor. Estos parámetros permiten generar visuales dinámicos en tiempo real, ajustados a la interacción del usuario, y por tanto según la actividad son los que decidí modificar.

  
_**Identifica un parámetro. Usando el mouse modifica de manera interactiva ese parámetro.**_  
Modifiqué el cálculo de ```count``` para usar la función ```map()``` combinada con ```int()```, de modo que el número de elementos sea más controlable y se ajuste en un rango definido entre 3 y 60. Buscaba que la interactividad fuese más evidente al usuario sin romper el funcionamiento original del código, entonces, Al limitar el rango de count, el sistema se vuelve más manejable y la transformación es más controlada, lo que permite que el cambio de formas se perciba de manera fluida.  
Además, en el modo 3, mantuve la estructura original de las elipses pero integré un ajuste dinámico del color basado en la posición del mouse en X y Y. Esto hace que las elipses cambien de tonalidad según la interacción, haciendo mucho más visible y perceptible el efecto del movimiento (esto lo hice por meros fines estéticos porque me gusta el fuccia y ya).


_**¿Cómo podría aplicarse esto al proyecto del curso?**_  
Esta experimentación me ayudó a comprender cómo se pueden usar parámetros simples (como la posición del público o la interacción con sensores) para generar cambios visibles en visuales proyectados en tiempo real.
Para el proyecto del concierto, esta lógica podría adaptarse para crear patrones visuales que respondan a la energía del público, al ritmo de la música o a la presencia en el espacio.
Por ejemplo, las visuales podrían cambiar su densidad, color o ritmo de transformación en función del movimiento detectado o del sonido ambiente, reforzando la idea de una experiencia inmersiva y colectiva.
Esta exploración también me mostró la importancia de equilibrar la claridad de la interacción con la estética visual para lograr un impacto efectivo en una instalación en vivo.


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

