# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: wordcounter.spec.ts >> Suite de pruebas para WordCounter - Farmatodo Challenge >> Escenario 2: Validar texto con tildes, eñes y caracteres especiales
- Location: tests\wordcounter.spec.ts:34:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#word_count')
Expected: "6"
Received: "5"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('#word_count') with timeout 5000ms
  - waiting for locator('#word_count')
    - locator resolved to <span class="badge" id="word_count">0</span>
    - unexpected value "0"
    12 × locator resolved to <span class="badge" id="word_count">5</span>
       - unexpected value "5"

```

```yaml
- text: "5"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { WordCounterPage } from '../pages/WordCounterPage';
  3  | 
  4  | test.describe('Suite de pruebas para WordCounter - Farmatodo Challenge', () => {
  5  | 
  6  |   test('Escenario 1: Validar palabras, caracteres y top de palabras repetidas', async ({ page }) => {
  7  |     const wordCounter = new WordCounterPage(page);
  8  |     await wordCounter.navegar();
  9  | 
  10 |     // Texto de prueba
  11 |     const texto = '¿Qué es poesía?, dices mientras clavas en mi pupila tu pupila azul. ¿Qué es poesía?  ¿Y tú me lo preguntas? Poesía...  eres tú.';
  12 |     await wordCounter.editor.ingresarTexto(texto);
  13 | 
  14 |    await page.waitForTimeout(1000);
  15 |    
  16 |     await expect(wordCounter.stats.wordCountElement).toHaveText('23');
  17 | 
  18 |   
  19 |     await expect(wordCounter.stats.charCountElement).toHaveText('127');
  20 | 
  21 |     
  22 |     const top1 = await wordCounter.keywordDensity.obtenerTopPalabra(0);
  23 |     expect(top1.palabra).toBe('poesía');
  24 |     expect(top1.conteo).toContain('3');
  25 | 
  26 |     const top2 = await wordCounter.keywordDensity.obtenerTopPalabra(1);
  27 |     expect(top2.palabra).toBe('¿qué');
  28 |     expect(top2.conteo).toContain('2');
  29 | 
  30 |      const top3 = await wordCounter.keywordDensity.obtenerTopPalabra(2);
  31 |     expect(top3.palabra).toBe('es');
  32 |     expect(top3.conteo).toContain('2');
  33 |   });
  34 | test('Escenario 2: Validar texto con tildes, eñes y caracteres especiales', async ({ page }) => {
  35 |     const wordCounter = new WordCounterPage(page);
  36 |     await wordCounter.navegar();
  37 | 
  38 |     // Texto con acentos y eñes
  39 |     const textoEspañol = 'canción.del niñito en la montaña';
  40 |     await wordCounter.editor.ingresarTexto(textoEspañol);
  41 | 
  42 |     // 6 palabras exactas
> 43 |     await expect(wordCounter.stats.wordCountElement).toHaveText('6');
     |                                                      ^ Error: expect(locator).toHaveText(expected) failed
  44 |    
  45 |   });
  46 | 
  47 |   test('Escenario 3: Validar que al vaciar el cuadro los contadores vuelvan a cero', async ({ page }) => {
  48 |     const wordCounter = new WordCounterPage(page);
  49 |     await wordCounter.navegar();
  50 | 
  51 |     // Escribimos algo y luego limpiamos por completo
  52 |     await wordCounter.editor.ingresarTexto('texto temporal');
  53 |     await wordCounter.editor.editorBox.press('Control+A');
  54 |     await wordCounter.editor.editorBox.press('Backspace');
  55 |     await wordCounter.page.waitForTimeout(1000);
  56 | 
  57 |     // Los contadores deberían estar en 0
  58 |     await expect(wordCounter.stats.wordCountElement).toHaveText('0');
  59 |     await expect(wordCounter.stats.charCountElement).toHaveText('0');
  60 |   });
  61 | 
  62 |   test('Escenario 4: Validar manejo de múltiples espacios y saltos de línea', async ({ page }) => {
  63 |     const wordCounter = new WordCounterPage(page);
  64 |     await wordCounter.navegar();
  65 | 
  66 |     // Texto con espacios múltiples y saltos de línea artificiales
  67 |     const textoEspacios = 'palabra1    palabra2\n\npalabra3';
  68 |     await wordCounter.editor.ingresarTexto(textoEspacios);
  69 | 
  70 |     // El contador inteligente de palabras debe omitir los espacios de más y contar 3 palabras
  71 |     await expect(wordCounter.stats.wordCountElement).toHaveText('3');
  72 |   });
  73 |   test('Escenario 5: Validar el comportamiento del contador ante signos de puntuación y variaciones de mayúsculas en una misma palabra', async ({ page }) => {
  74 |     const wordCounter = new WordCounterPage(page);
  75 |     await wordCounter.navegar();
  76 | 
  77 |     // Texto con acentos y eñes
  78 |     const textoEspañol = '"Amor" «amor» ¿Amor? ¡AMOR!';
  79 |     await wordCounter.editor.ingresarTexto(textoEspañol);
  80 | 
  81 |     await expect(wordCounter.stats.wordCountElement).toHaveText('4');
  82 |     const top1 = await wordCounter.keywordDensity.obtenerTopPalabra(0);
  83 |     expect(top1.palabra.toLowerCase()).toBe('amor');
  84 |     expect(top1.conteo).toContain('4');
  85 |     
  86 |     
  87 |     
  88 |   });
  89 | });
```