import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor(private toastr: ToastrService) {}

	showSuccess(message: string, title?: string, html?: boolean): void {
		this.toastr.success(message, title, {
			enableHtml: html ?? false,
		});
	}

	showWarning(message: string, title?: string, html?: boolean): void {
		this.toastr.warning(message, title, {
			enableHtml: html ?? false,
		});
	}

	showError(message: string, title?: string, html?: boolean): void {
		this.toastr.error(message, title, {
			enableHtml: html ?? false,
		});
	}

	showInfo(message: string, title?: string, html?: boolean): void {
		this.toastr.info(message, title, {
			enableHtml: html ?? false,
		});
	}

	show(type: string, message: string, title?: string): void {
		this.toastr.show(message, title, undefined, type);
	}

	clearNotifications(): void {
		this.toastr.clear();
	}
}
