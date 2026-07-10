import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideRouter } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { appRoutes } from './app.routes';

import { loadingInterceptor } from './core/interceptors/loading-interceptor';

import { authInterceptor } from './core/interceptors/auth-interceptor';

import { errorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({
      eventCoalescing: true,
    }),

    provideRouter(appRoutes),

    importProvidersFrom(MatSnackBarModule),

    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor, errorInterceptor])),
  ],
};
