import { Page, Locator } from '@playwright/test';

export class StatsComponent {
  readonly wordCountElement: Locator;
  readonly charCountElement: Locator;

  constructor(page: Page) {
    this.wordCountElement = page.locator('#word_count');
    this.charCountElement = page.locator('#character_count');
  }
}