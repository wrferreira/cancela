import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseRequestResult } from '../models/base-request.model';
import { Credencial } from '../models/credential.model';

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario!: Credencial | null;

  constructor(private router: Router) {
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);

    if (savedCredentials) {
      this.usuario = JSON.parse(savedCredentials);
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): Credencial | null {
    return this.usuario;
  }

  set credentials(credentials: Credencial | null) {
    this.usuario = credentials || null;

    if (credentials) {
      credentialsKey in localStorage
        ? localStorage.setItem(credentialsKey, JSON.stringify(credentials))
        : sessionStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  async logout(): Promise<void> {
    this.credentials = null;
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
