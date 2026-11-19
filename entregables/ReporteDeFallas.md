# Reporte de Fallas y Oportunidades de Mejora - WordCounter.net
**Evaluador / QA Engineer:** Cecilia Elizabeth Tolentino  
**Herramienta evaluada:** https://wordcounter.net/  
**Configuración utilizada:** Por defecto  

---

## Defecto 1: El módulo de *Keyword Density* no normaliza signos de puntuación ni mayúsculas

* **ID del Defecto:** BUG-001
* **Módulo:** Panel de Densidad de Palabras (*Keyword Density*).
* **Severidad:** Media.
* **Entorno:** Web Desktop.

### Descripción del Problema
Cuando un usuario ingresa una misma palabra repetidas veces pero acompañada de diferentes signos de puntuación de apertura/cierre (comillas `«»`, exclamación `¡!`, interrogación `¿?`) o variaciones de mayúsculas, la sección de *Keyword Density* falla en la normalización. En lugar de agruparlas y sumar su frecuencia total, las contabiliza y lista de forma independiente como si fueran términos totalmente diferentes.

### Pasos para Reproducir
1. Ingresar a `https://wordcounter.net/`.
2. Escribir en el cuadro de texto: `"Amor" «amor» ¿Amor? ¡AMOR!`
3. Observar el panel lateral de *Keyword Density*.

### Comportamiento Actual
El sistema lista la palabra fragmentada en cuatro entradas distintas (`amor`, `«amor»`, `¿amor`, `¡amor`), asignándole un 25% de densidad (1 ocurrencia) a cada una, cuando en realidad la palabra base se repite 4 veces en total.

### Comportamiento Esperado
El algoritmo de análisis de densidad debería aplicar una normalización de texto previa (removiendo puntuación y unificando a minúsculas), agrupando todas las variantes bajo un único registro con un total de 4 ocurrencias.

---

## Defecto 2: Conteo erróneo de palabras al omitir espacios tras un punto seguido

* **ID del Defecto:** BUG-002
* **Módulo:** Contador general de palabras (*Word Count*).
* **Severidad:** Baja / Media.
* **Entorno:** Web Desktop.

### Descripción del Problema
El algoritmo de separación de palabras del editor no detecta el límite de una palabra si un punto seguido carece de espacio posterior (por ejemplo, al unir una palabra con la siguiente mediante un punto, como `canción.del`). El sistema interpreta todo el bloque contiguo como un único token léxico, alterando el conteo real de palabras.

### Pasos para Reproducir
1. Ingresar a `https://wordcounter.net/`.
2. Escribir en el cuadro de texto la siguiente oración con un punto sin espacio:  
   `canción.del niñito en la montaña`
3. Revisar el contador general de palabras (*Word Count*).

### Comportamiento Actual
El sistema arroja un total de **5 palabras**, ya que fusiona erróneamente `canción.del` en un único término.

### Comportamiento Esperado
El sistema debería identificar los signos de puntuación internos (como los puntos) como separadores de palabras independientes, arrojando un total correcto de **6 palabras** para dicha oración, independientemente de si el usuario omitió el espacio por descuido.