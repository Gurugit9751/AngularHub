import {
  Injectable,
  PLATFORM_ID,
  inject
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

interface JwtPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  id?: string;
  userId?: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
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

    localStorage.setItem(
      this.TOKEN_KEY,
      token
    );
  }

  removeToken(): void {
    if (!this.isBrowser()) {
      return;
    }

    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    if (this.isTokenExpired(token)) {
      this.removeToken();
      return false;
    }

    return true;
  }

  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);

    /*
     * If the token cannot be decoded, treat it as invalid.
     */
    if (!payload) {
      return true;
    }

    /*
     * Some development tokens may not contain exp.
     * In that case, existence of the token is accepted.
     */
    if (!payload.exp) {
      return false;
    }

    const currentTimeInSeconds =
      Math.floor(Date.now() / 1000);

    return payload.exp <= currentTimeInSeconds;
  }

  decodeToken(token?: string): JwtPayload | null {
    const currentToken = token ?? this.getToken();

    if (!currentToken) {
      return null;
    }

    try {
      const tokenParts = currentToken.split('.');

      if (tokenParts.length !== 3) {
        return null;
      }

      const base64Url = tokenParts[1];

      const base64 = base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const normalizedBase64 = base64.padEnd(
        Math.ceil(base64.length / 4) * 4,
        '='
      );

      const decodedPayload = decodeURIComponent(
        atob(normalizedBase64)
          .split('')
          .map((character) => {
            const hexValue = character
              .charCodeAt(0)
              .toString(16)
              .padStart(2, '0');

            return `%${hexValue}`;
          })
          .join('')
      );

      return JSON.parse(decodedPayload) as JwtPayload;
    } catch {
      return null;
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
