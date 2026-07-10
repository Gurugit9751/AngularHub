import { Injectable, PLATFORM_ID, inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

interface JwtPayload {
  sub?: string;
  userId?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly TOKEN_KEY = 'token';

  getToken(): string | null {
    if (!this.isBrowser()) {
      return null;
    }

    return localStorage.getItem(this.TOKEN_KEY);
  }

  saveToken(token: string): void {
    if (!this.isBrowser()) {
      return;
    }

    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    if (!this.isBrowser()) {
      return;
    }

    localStorage.removeItem(this.TOKEN_KEY);
  }

  getValidToken(): string | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    if (this.isTokenExpired(token)) {
      this.removeToken();
      return null;
    }

    return token;
  }

  isAuthenticated(): boolean {
    return Boolean(this.getValidToken());
  }

  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);

    if (!payload) {
      return true;
    }

    /*
     * The backend should normally provide exp.
     * Tokens without exp remain supported for development.
     */
    if (typeof payload.exp !== 'number') {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp <= currentTime;
  }

  decodeToken(token?: string): JwtPayload | null {
    if (!this.isBrowser()) {
      return null;
    }

    const currentToken = token ?? this.getToken();

    if (!currentToken) {
      return null;
    }

    try {
      const tokenParts = currentToken.split('.');

      if (tokenParts.length !== 3) {
        return null;
      }

      const payloadPart = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');

      const normalizedPayload = payloadPart.padEnd(Math.ceil(payloadPart.length / 4) * 4, '=');

      return JSON.parse(atob(normalizedPayload)) as JwtPayload;
    } catch {
      return null;
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
