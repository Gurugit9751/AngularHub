import {
  Injectable,
  computed,
  inject,
  signal
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';

import { environment } from '../../../environment/environment';

import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';

import { StorageService } from './storage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly tokenService = inject(TokenService);

  private readonly apiUrl =
    `${environment.apiUrl}/auth`;

  private readonly USER_STORAGE_KEY = 'user';

  private readonly currentUserSignal =
    signal<User | null>(this.restoreUser());

  readonly currentUser =
    this.currentUserSignal.asReadonly();

  readonly isAuthenticated = computed(() => {
    return (
      this.tokenService.isAuthenticated() &&
      this.currentUserSignal() !== null
    );
  });

  readonly isAdmin = computed(() => {
    return (
      this.currentUserSignal()?.role
        ?.toLowerCase() === 'admin'
    );
  });

  login(
    request: LoginRequest
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(
        tap((response) => {
          this.storeAuthentication(response);
        })
      );
  }

  register(
    request: RegisterRequest
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/register`,
      request
    );
  }

  logout(): void {
    this.tokenService.removeToken();

    this.storageService.remove(
      this.USER_STORAGE_KEY
    );

    this.currentUserSignal.set(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }

  isLoggedIn(): boolean {
    return this.tokenService.isAuthenticated();
  }

  hasRole(role: string): boolean {
    const currentRole =
      this.currentUserSignal()?.role;

    return (
      currentRole?.toLowerCase() ===
      role.toLowerCase()
    );
  }

private storeAuthentication(
  response: AuthResponse
): void {
  const token = response.data.token;
  const user = response.data.user;

  if (!token) {
    throw new Error(
      'Login succeeded, but the token is missing.'
    );
  }

  if (!user) {
    throw new Error(
      'Login succeeded, but the user information is missing.'
    );
  }

  this.tokenService.saveToken(token);

  this.storageService.set(
    this.USER_STORAGE_KEY,
    user
  );

  this.currentUserSignal.set(user);
}

  private restoreUser(): User | null {
    /*
     * Remove stored user information when the token
     * is missing, invalid or expired.
     */
    if (!this.tokenService.isAuthenticated()) {
      this.storageService.remove(
        this.USER_STORAGE_KEY
      );

      return null;
    }

    return this.storageService.get<User>(
      this.USER_STORAGE_KEY
    );
  }
}
