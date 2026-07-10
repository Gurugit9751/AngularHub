import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { environment } from '../../../environment/environment';

import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

let isHandlingUnauthorized = false;

interface ApiErrorBody {
  message?: string;
  error?: string;

  errors?: Array<{
    message?: string;
    msg?: string;
  }>;
}

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);

  const router = inject(Router);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }

      /*
       * Process errors only from our own backend API.
       */
      if (!request.url.startsWith(environment.apiUrl)) {
        return throwError(() => error);
      }

      /*
       * Form components handle login, register and
       * forgot-password errors themselves.
       */
      if (isPublicAuthRequest(request.url)) {
        return throwError(() => error);
      }

      switch (error.status) {
        case 0:
          notificationService.error(
            'Unable to connect to the server. Please ensure that the backend is running.',
          );
          break;

        case 401:
          handleUnauthorized(authService, router, notificationService);
          break;

        case 403:
          notificationService.error(
            getErrorMessage(error, 'You do not have permission to perform this action.'),
          );
          break;

        case 404:
          notificationService.warning(
            getErrorMessage(error, 'The requested resource was not found.'),
          );
          break;

        case 408:
          notificationService.warning('The request timed out. Please try again.');
          break;

        case 429:
          notificationService.warning(
            getErrorMessage(error, 'Too many requests. Please wait before trying again.'),
          );
          break;

        case 500:
          notificationService.error(getErrorMessage(error, 'An internal server error occurred.'));
          break;

        case 502:
        case 503:
        case 504:
          notificationService.error(
            'The server is temporarily unavailable. Please try again later.',
          );
          break;

        default:
          break;
      }

      return throwError(() => error);
    }),
  );
};

function handleUnauthorized(
  authService: AuthService,
  router: Router,
  notificationService: NotificationService,
): void {
  if (isHandlingUnauthorized) {
    return;
  }

  isHandlingUnauthorized = true;

  const currentUrl = router.url;

  const returnUrl = currentUrl && !currentUrl.startsWith('/auth') ? currentUrl : null;

  authService.logout();

  notificationService.warning('Your session has expired. Please sign in again.');

  const navigation = returnUrl
    ? router.navigate(['/auth/login'], {
        queryParams: {
          returnUrl,
        },
        replaceUrl: true,
      })
    : router.navigateByUrl('/auth/login', {
        replaceUrl: true,
      });

  void navigation.finally(() => {
    setTimeout(() => {
      isHandlingUnauthorized = false;
    }, 500);
  });
}

function isPublicAuthRequest(requestUrl: string): boolean {
  const publicEndpoints = [
    `${environment.apiUrl}/auth/login`,
    `${environment.apiUrl}/auth/register`,
    `${environment.apiUrl}/auth/forgot-password`,
    `${environment.apiUrl}/auth/reset-password`,
  ];

  return publicEndpoints.some((endpoint) => requestUrl.startsWith(endpoint));
}

function getErrorMessage(error: HttpErrorResponse, fallbackMessage: string): string {
  const responseBody = error.error as ApiErrorBody | string | null;

  if (typeof responseBody === 'string' && responseBody.trim()) {
    return responseBody;
  }

  if (responseBody && typeof responseBody === 'object') {
    if (typeof responseBody.message === 'string' && responseBody.message.trim()) {
      return responseBody.message;
    }

    if (typeof responseBody.error === 'string' && responseBody.error.trim()) {
      return responseBody.error;
    }

    const firstValidationError = responseBody.errors?.[0];

    if (firstValidationError) {
      return firstValidationError.message ?? firstValidationError.msg ?? fallbackMessage;
    }
  }

  return fallbackMessage;
}
