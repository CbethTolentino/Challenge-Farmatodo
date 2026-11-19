import { test, expect } from '@playwright/test';
import { WordCounterPage } from '../pages/WordCounterPage';

test.describe('Suite de pruebas para WordCounter - Farmatodo Challenge', () => {

  test('Escenario 1: Validar palabras, caracteres y top de palabras repetidas', async ({ page }) => {
    const wordCounter = new WordCounterPage(page);
    await wordCounter.navegar();

    // Texto de prueba
    const texto = '¿Qué es poesía?, dices mientras clavas en mi pupila tu pupila azul. ¿Qué es poesía?  ¿Y tú me lo preguntas? Poesía...  eres tú.';
    await wordCounter.editor.ingresarTexto(texto);

   await page.waitForTimeout(1000);
   
    await expect(wordCounter.stats.wordCountElement).toHaveText('23');

  
    await expect(wordCounter.stats.charCountElement).toHaveText('127');

    
    const top1 = await wordCounter.keywordDensity.obtenerTopPalabra(0);
    expect(top1.palabra).toBe('poesía');
    expect(top1.conteo).toContain('3');

    const top2 = await wordCounter.keywordDensity.obtenerTopPalabra(1);
    expect(top2.palabra).toBe('¿qué');
    expect(top2.conteo).toContain('2');

     const top3 = await wordCounter.keywordDensity.obtenerTopPalabra(2);
    expect(top3.palabra).toBe('es');
    expect(top3.conteo).toContain('2');
  });
test('Escenario 2: Validar texto con tildes, eñes y caracteres especiales', async ({ page }) => {
    const wordCounter = new WordCounterPage(page);
    await wordCounter.navegar();

    // Texto con acentos y eñes
    const textoEspañol = 'canción.del niñito en la montaña';
    await wordCounter.editor.ingresarTexto(textoEspañol);

    // 6 palabras exactas
    await expect(wordCounter.stats.wordCountElement).toHaveText('6');
   
  });

  test('Escenario 3: Validar que al vaciar el cuadro los contadores vuelvan a cero', async ({ page }) => {
    const wordCounter = new WordCounterPage(page);
    await wordCounter.navegar();

    // Escribimos algo y luego limpiamos por completo
    await wordCounter.editor.ingresarTexto('texto temporal');
    await wordCounter.editor.editorBox.press('Control+A');
    await wordCounter.editor.editorBox.press('Backspace');
    await wordCounter.page.waitForTimeout(1000);

    // Los contadores deberían estar en 0
    await expect(wordCounter.stats.wordCountElement).toHaveText('0');
    await expect(wordCounter.stats.charCountElement).toHaveText('0');
  });

  test('Escenario 4: Validar manejo de múltiples espacios y saltos de línea', async ({ page }) => {
    const wordCounter = new WordCounterPage(page);
    await wordCounter.navegar();

    // Texto con espacios múltiples y saltos de línea artificiales
    const textoEspacios = 'palabra1    palabra2\n\npalabra3';
    await wordCounter.editor.ingresarTexto(textoEspacios);

    // El contador inteligente de palabras debe omitir los espacios de más y contar 3 palabras
    await expect(wordCounter.stats.wordCountElement).toHaveText('3');
  });
  test('Escenario 5: Validar el comportamiento del contador ante signos de puntuación y variaciones de mayúsculas en una misma palabra', async ({ page }) => {
    const wordCounter = new WordCounterPage(page);
    await wordCounter.navegar();

    // Texto con acentos y eñes
    const textoEspañol = '"Amor" «amor» ¿Amor? ¡AMOR!';
    await wordCounter.editor.ingresarTexto(textoEspañol);

    await expect(wordCounter.stats.wordCountElement).toHaveText('4');
    const top1 = await wordCounter.keywordDensity.obtenerTopPalabra(0);
    expect(top1.palabra.toLowerCase()).toBe('amor');
    expect(top1.conteo).toContain('4');
    
    
    
  });
});