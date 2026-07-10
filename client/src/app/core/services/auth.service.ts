import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { environment } from '../../../environment/environment';

import { AppPermission, ROLE_PERMISSIONS } from '../constants/role-permissions.constant';

import { AuthResponse } from '../models/auth-response.model';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';

import { User, UserRole } from '../models/user.model';

import { StorageService } from './storage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly tokenService = inject(TokenService);

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private readonly USER_STORAGE_KEY = 'user';

  private readonly currentUserSignal = signal<User | null>(this.restoreUser());

  readonly currentUser = this.currentUserSignal.asReadonly();

  readonly isAuthenticated = computed(
    () => this.currentUserSignal() !== null && this.tokenService.isAuthenticated(),
  );

  readonly isAdmin = computed(() => this.hasAnyRole(['admin']));

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response) => {
        this.storeAuthentication(response);
      }),
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
  }

  logout(): void {
    this.tokenService.removeToken();

    this.storageService.remove(this.USER_STORAGE_KEY);

    this.currentUserSignal.set(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  getToken(): string | null {
    return this.tokenService.getValidToken();
  }

  isLoggedIn(): boolean {
    return this.tokenService.isAuthenticated() && this.currentUserSignal() !== null;
  }

  hasAnyRole(allowedRoles: readonly UserRole[]): boolean {
    const currentRole = this.getCurrentRole();

    return currentRole !== null && allowedRoles.includes(currentRole);
  }

  hasPermission(permission: AppPermission): boolean {
    const currentRole = this.getCurrentRole();

    if (!currentRole) {
      return false;
    }

    return ROLE_PERMISSIONS[currentRole].includes(permission);
  }

  private storeAuthentication(response: AuthResponse): void {
    const token = response.data?.token;
    const apiUser = response.data?.user;

    if (!token) {
      throw new Error('Login succeeded, but the token is missing.');
    }

    if (!apiUser) {
      throw new Error('Login succeeded, but user information is missing.');
    }

    /*
     * Store only safe fields.
     * Extra backend fields such as password are not persisted.
     */
    const safeUser: User = {
      _id: apiUser._id,
      firstName: apiUser.firstName,
      lastName: apiUser.lastName,
      email: apiUser.email,
      role: this.normalizeRole(apiUser.role) ?? 'user',
      createdAt: apiUser.createdAt,
      updatedAt: apiUser.updatedAt,
    };

    this.tokenService.saveToken(token);

    this.storageService.set(this.USER_STORAGE_KEY, safeUser);

    this.currentUserSignal.set(safeUser);
  }

  private restoreUser(): User | null {
    if (!this.tokenService.isAuthenticated()) {
      this.storageService.remove(this.USER_STORAGE_KEY);

      return null;
    }

    return this.storageService.get<User>(this.USER_STORAGE_KEY);
  }

  private getCurrentRole(): UserRole | null {
    return this.normalizeRole(this.currentUserSignal()?.role);
  }

  private normalizeRole(role: string | undefined): UserRole | null {
    const normalizedRole = role?.trim().toLowerCase();

    if (normalizedRole === 'admin' || normalizedRole === 'user') {
      return normalizedRole;
    }

    return null;
  }
}
