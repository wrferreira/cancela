import { BaseRequestResult } from './../../models/base-request.model';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../guards/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';
import { LoaderService } from '../../services/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.params.get('hideLoading')) this.loaderService.show();

    if (this.authService.credentials) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.credentials.token}`,
        },
      });
    }

    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide()),
      catchError((error) => this.errorHandler(error))
    );
  }

  private errorHandler(
    response: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    switch (response.status) {
      case 0:
        this.notify.showError('Problemas com conexão com o servidor.');
        break;
      case 400:
        //this.notify.showError(response.error.message.text);
        this.notify.showError(response.error.mensagemErro);
        break;
      case 401:
        this.notify.showError('Usuário sem acesso, por favor logue novamente!');

        setTimeout(() => {
          this.router.navigateByUrl('/login', { replaceUrl: true }).then();
        }, 3000);
        break;
      case 404:
        this.notify.showError('Houve algum erro, rota não encontrada.');
        break;
      case 406:
      case 409:
      case 500:
        this.notify.showError('Ocorreu um erro inesperado de servidor.');
        break;
    }

    return throwError(() => response);
  }
}
