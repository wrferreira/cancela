import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { BaseRequestResult } from 'src/app/core/models/base-request.model';
import { CancelaRegistroManual } from '../models/cancela-registro-manual';
import { CancelaData } from '../models/cancela-data.model';
import { CancelaLastRegister } from '../models/cancela-last-register';

@Injectable({
  providedIn: 'root',
})
export class CancelaService {
  private baseUrlMottu = environment.baseUrlMottu;

  constructor(private http: HttpClient) {}

  setManualRegister(registro: CancelaRegistroManual) {
    return this.http.post<BaseRequestResult<any>>(
      this.baseUrlMottu + `api/v2/Cancela/RegistroManual`,
      registro
    );
  }

  getLastRegister(cancela: CancelaData, id = 0) {
    return this.http.get<BaseRequestResult<CancelaLastRegister>>(
      this.baseUrlMottu +
        `api/v2/Cancela/Front/${cancela?.cancelaId}/${cancela?.tipo}/${id}`
    );
  }
}
