import { Component, Injector } from '@angular/core';
import { LanguageService } from './core/services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends LanguageService {
  constructor(injector: Injector) {
    super(injector);
    this.initTranslate();
  }
}
