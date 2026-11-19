import { Page, Locator } from '@playwright/test';

export class EditorComponent {
  readonly editorBox: Locator;

  constructor(page: Page) {
    this.editorBox = page.locator('#box');
  }

  async ingresarTexto(texto: string) {
    await this.editorBox.click();
    await this.editorBox.press('Control+A');
    await this.editorBox.press('Backspace');
    await this.editorBox.fill(texto);
  }
}