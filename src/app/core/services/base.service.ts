import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BaseRequestResult } from '../models/base-request.model';

export abstract class BaseService {
  protected extractData(response: BaseRequestResult<any>) {
    return response.dataResult;
  }

  protected serviceError(response: Response | any) {
    let responseError: string = '';

    if (response.error) responseError = response.error.mensagemErro;

    if (response instanceof HttpErrorResponse) {
      if (
        response.statusText === 'Unknown Error' ||
        response.status === 500 ||
        response.status === 404
      ) {
        responseError = 'Ocorreu um erro desconhecido';
      }
    }

    return throwError(() => responseError);
  }
}
