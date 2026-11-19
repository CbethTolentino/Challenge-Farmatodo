import { Page, Locator } from '@playwright/test';

export class KeywordDensityComponent {
  readonly keywordDensityContainer: Locator;

  constructor(page: Page) {
    this.keywordDensityContainer = page.locator('#kwd-accordion-data');
  }

  async obtenerTopPalabra(index: number) {
    const fila = this.keywordDensityContainer.locator('a.list-group-item').nth(index);
    const palabra = await fila.locator('span.word').innerText();
    const conteoBadge = await fila.locator('span.badge').innerText(); 
    
    return {
      palabra: palabra.trim(),
      conteo: conteoBadge.trim()
    };
  }
}