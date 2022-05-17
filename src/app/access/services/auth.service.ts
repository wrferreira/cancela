import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BaseRequestResult } from 'src/app/core/models/base-request.model';
import { Login, UserLogin } from '../models/login.model';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private baseUrlMottu = environment.baseUrlMottu;

  constructor(private router: Router, private http: HttpClient) {
    super();
  }

  get currentUser() {
    const currentUser = localStorage.getItem('credentials');
    if (currentUser) return JSON.parse(currentUser);
  }

  login(user: UserLogin) {
    return this.http
      .post<BaseRequestResult<Login>>(
        `${this.baseUrlMottu}api/v2/usuario/AutenticarPorEmail`,
        user
      )
      .pipe(
        map((response: BaseRequestResult<any>) => {
          if (response.dataResult) {
            let credencials = {
              usuario: response.dataResult.perfilId,
              token: response.dataResult.token,
            };
            localStorage.setItem('credentials', JSON.stringify(credencials));
            this.router.navigate(['/cancela']);
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('credentials');
    this.router.navigate(['/login']);
  }
}
