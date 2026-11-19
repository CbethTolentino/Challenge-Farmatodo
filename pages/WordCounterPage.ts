import { Page } from '@playwright/test';
import {EditorComponent} from './components/EditorComponent'
import { StatsComponent } from './components/StatsComponent';
import { KeywordDensityComponent } from './components/KeywordDensity';


export class WordCounterPage {
  readonly page: Page;
  readonly editor: EditorComponent;
  readonly stats: StatsComponent;
  readonly keywordDensity: KeywordDensityComponent;

  constructor(page: Page) {
    this.page = page;
  
    this.editor = new EditorComponent(page);
    this.stats = new StatsComponent(page);
    this.keywordDensity = new KeywordDensityComponent(page);
  }

  async navegar() {
    await this.page.goto('https://wordcounter.net/');
    await this.page.waitForLoadState('domcontentloaded');
  }
}