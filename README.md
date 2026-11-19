**Candidato:** Cecilia Elizabeth Tolentino  

**Stack Tecnológico:** TypeScript, Playwright, Node.js (`tsx`), Page Object Model (POM) & Principios SOLID.

Este repositorio contiene la resolución integral de las cuatro etapas del desafío técnico de Ingeniería de Calidad para **Farmatodo**:

1. **Automatización E2E (`wordcounter.net`):** Suite desarrollada en Playwright + TypeScript aplicando POM con composición de componentes (SOLID).
2. **Reporte de Fallas (`wordcounter.net`):** Documentación técnica de defectos funcionales y de normalización detectados.
3. **Auditoría de Experiencia de Usuario (`farmatodo.com.ar`):** Análisis de usabilidad, localización, diseño responsive y cumplimiento regulatorio.
4. **Algoritmo de Frecuencia de Palabras:** Script en TypeScript para lectura de archivos, métricas de texto, generación de histograma ordenado y análisis de complejidad computacional.

---

##  Estructura del Proyecto y Ubicación de Documentos

```text
Challenge-Farmatodo/
├── entregables/                        # 📄 ENTREGABLES DOCUMENTALES (Puntos 2 y 3)
│   ├── Reporte_QA_UX_Farmatodo.docx    # Documento formal con evidencias y auditoría UX
│   └── ReporteDeFallas.md              # Reporte técnico de bugs en Markdown
├── pages/
│   ├── components/                     # Componentes desacoplados (SOLID)
│   │   ├── EditorComponent.ts          # Interacción con el área de texto
│   │   ├── KeywordDensity.ts           # Extracción de métricas de densidad
│   │   └── StatsComponent.ts           # Lectura de contadores (palabras/caracteres)
│   └── WordCounterPage.ts              # Page Object principal (Composición)
├── tests/
│   └── wordcounter.spec.ts             # Suite de escenarios automatizados (Punto 1)
├── utils/
│   └── analizadorTexto.ts              # Algoritmo contador de frecuencia (Punto 4)
├── playwright.config.ts                # Configuración de ejecución y reportes HTML
└── README.md                           # Documentación principal del proyecto


 Ubicación de los reportes: Se encuentran ubicados en la carpeta entregables
El documento detallado con el Reporte de Fallas de WordCounter se encuentra con el nombre de "ReporteDeFallas" y la Auditoría UX/UI de Farmatodo Argentina (incluyendo pasos de reproducción, severidades, sugerencias de mejora y capturas de pantalla) bajo el nombre "Reporte_QA_UX_Farmatodo"

 Requisitos Previos e Instalación 
Tener instalado Node.js (v18 o superior) y npm.
Clonar el repositorio:Bashgit clone <URL_DE_TU_REPOSITORIO>
cd Challenge-Farmatodo
Instalar las dependencias del proyecto:Bash npm install
Instalar los navegadores de Playwright (si es la primera ejecución):Bash npx playwright install
 Guía de Ejecución
1. Ejecutar Pruebas Automatizadas (Punto 1 — Playwright)
La suite incluye escenarios funcionales y casos de borde (edge cases) diseñados para validar tanto el conteo estándar como fallos reales de normalización en wordcounter.net.Ejecutar todos los tests en modo headless (segundo plano):Bash npx playwright test
Ejecutar los tests visualizando el navegador en vivo:Bash npx playwright test --headed
Generar el reporte resumen en allure:Bash npm run reporte    
(Este reporte detalla cuántos escenarios se ejecutaron, cuántos pasaron, cuántos fallaron y la traza/captura exacta del error).
2. Ejecutar el Algoritmo Contador de Frecuencia (Punto 4 — TypeScript)
El script lee el archivo utils/texto.txt, contabiliza palabras y caracteres (incluyendo espacios y excluyendo saltos de línea), y genera un histograma ordenado.
Comando de ejecución:Bash npx tsx utils/analizadorTexto.ts
Ejemplo de salida esperada en consola:Plaintext 14 words
99 characters
farmatodo: 6
cuida: 3
salud: 2
tu: 2
toda: 1

 Lógica y Complejidad Computacional (Punto 4)
 El algoritmo en utils/analizadorTexto.ts funciona en 4 pasos sencillos:

Lectura y conteo de caracteres: Abre el archivo texto.txt y le saca los saltos de línea (los Enter) manteniendo los espacios en blanco para contar exactamente cuántos caracteres tiene.

Limpieza de texto: Pasa todas las letras a minúsculas, borra los signos de puntuación (pero conserva tildes y la ñ) y separa las palabras usando los espacios para armar una lista limpia.

Conteo de repeticiones: Recorre la lista de palabras y va anotando en un diccionario cuántas veces aparece cada una. Usar un diccionario hace que buscar y sumar cada palabra sea prácticamente instantáneo.

Ordenamiento del ranking: Toma los resultados y los ordena de mayor a menor según la cantidad de repeticiones. Si dos palabras empatan en cantidad, las ordena alfabéticamente (de la A a la Z).

Complejidad computacional
Tiempo de ejecución — $O(N \log N)$: Leer, limpiar y contar las palabras toma un tiempo proporcional al largo del texto ($O(N)$), porque se recorre una sola vez. Sin embargo, el paso que más trabajo lleva es ordenar el ranking final ($O(U \log U)$). Por eso, en el peor de los casos (si ninguna palabra se repite), ese ordenamiento marca el ritmo total del programa.Uso de memoria — $O(N)$: El programa guarda en la memoria RAM el texto leído, la lista de palabras separadas y el diccionario de conteos. Mientras más largo sea el archivo de entrada, más memoria usará de forma proporcional.