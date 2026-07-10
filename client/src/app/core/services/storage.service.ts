import { Injectable, PLATFORM_ID, inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  set<T>(key: string, value: T): void {
    if (!this.isBrowser()) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser()) {
      return null;
    }

    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      this.remove(key);
      return null;
    }
  }

  remove(key: string): void {
    if (!this.isBrowser()) {
      return;
    }

    localStorage.removeItem(key);
  }

  has(key: string): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
