import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LANGUAGES = ['pt', 'es'];
const DEFAULT_LANGUAGE = 'pt';

@Injectable({
	providedIn: 'root',
})
export class LanguageService {
	protected translate: TranslateService;

	constructor(injector: Injector) {
		this.translate = injector.get(TranslateService);
	}

	public initTranslate(): void {
		let lang: string = localStorage.getItem('lang') || window.navigator.language;
		let langValid: string = this.getValidLanguage(lang);
		this.translate.use(langValid);
	}

	public defineLanguage(language: string): void {
		let lang: string = this.getValidLanguage(language);
		localStorage.setItem('lang', lang);
		window.location.reload();
	}

	protected getValidLanguage(language: string): string {
		LANGUAGES.map(lang => {
			if (language.startsWith(lang)) language = lang;
		});
		if (LANGUAGES.includes(language)) return language;
		else return DEFAULT_LANGUAGE;
	}

	get siteLanguage(): string {
		return localStorage.getItem('lang') || DEFAULT_LANGUAGE;
	}
}
