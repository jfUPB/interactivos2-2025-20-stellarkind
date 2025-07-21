# Unidad 1  
  
## 🛠 Fase: Apply  
  
### Actividad #5  
Ejemplo que seleccioné: [Generative Design P_3_1_2_02](https://editor.p5js.org/generative-design/full/BJxQl5qqayE)  
[Mi versión modificada de P_3_1_2_02](https://editor.p5js.org/stellarkind/full/2jMKHCrJA)  
  
**FASE 1: SELECT**  
Elegí el sketch P_3_1_2_02 porque me llamó la atención la forma en que convierte texto en estructuras visuales usando íconos, formas y líneas de conexión. Me interesó el concepto de “escritura visual” y cómo las reglas tipográficas se reinterpretan para crear composiciones gráficas dinámicas. 
  
**FASE 2: DESCRIBE**  
Analizando el código y canvas, identifiqué que:
- El texto o caracteres pues ingresado por el usuario genera visualmente una “línea” o “recorrido” compuesto de bloques, íconos y curvas.
- Cada carácter se traduce en una forma o acción (curva, estación, ícono) según reglas predefinidas en un switch-case.
- La posición se va acumulando mediante ```translate()```, y las rotaciones son el resultado de decisiones aleatorias o asociadas al carácter, los íconos se rotan según esto también.
- Usa una paleta limitada de colores combinada con rotación de tonos.
- Se puede rotar el canvas.
- Tiene interacción básica con el mouse para mover la vista y teclas para agregar o eliminar texto, hacer zoom o guardar la imagen.
- Además de que va guardando los ultimos 7 caracteres enviados en caso de que se presione "o" los escribe como si fuese el nombre de la figura que para mi lo que representa es una estación.
  
**FASE 3: ANALYZE**
Identifiqué que la estructura principal se basa en:
- Transformaciones acumuladas usando ```translate()``` y ```rotate()``` en un flujo continuo que depende de la secuencia de caracteres.
- Usa imágenes SVG y formas básicas que representan estaciones, curvas o conexiones que parecen corresponder a las propias de un mapa de sistemas de transporte.
- Implementa una paleta rotativa que lo que hace es que cambia al encontrar ciertos caracteres o saltos de línea, gracias a eso el programa controla la coherencia visual dentro de una misma ejecución.
A nivel lógico, el sistema funciona como una “máquina de interpretación” de texto, donde cada letra es una instrucción gráfica, el sistema traduce los inputs del teclado en la forma asignada dentro del código.
  
**FASE 4: CONVERT**

  
**FASE 5: EXPLORE**

  
**FASE 6: TINKER**
