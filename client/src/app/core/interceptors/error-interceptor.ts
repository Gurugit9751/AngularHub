import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import {
  catchError,
  throwError
} from 'rxjs';

import { environment } from '../../../environment/environment';

import { AuthService } from '../services/auth.service';

/**
 * Prevents several simultaneous 401 responses from triggering
 * repeated logout, snackbar and navigation operations.
 */
let isHandlingUnauthorized = false;

interface ApiValidationError {
  message?: string;
  msg?: string;
}

interface ApiErrorBody {
  message?: string;
  error?: string;

  errors?:
    | ApiValidationError[]
    | Record<string, string[]>;
}

export const errorInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return next(request).pipe(
    catchError((error: unknown) => {
      /*
       * Do not process non-HTTP errors here.
       */
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }

      /*
       * Handle only requests sent to our backend.
       * External APIs can manage their own error behaviour.
       */
      if (!request.url.startsWith(environment.apiUrl)) {
        return throwError(() => error);
      }

      /*
       * Login, registration and password pages should display
       * their own validation errors inside their forms.
       */
      if (isPublicAuthenticationRequest(request.url)) {
        return throwError(() => error);
      }

      handleHttpError(
        error,
        authService,
        router,
        snackBar
      );

      /*
       * Re-throw the original error so the calling component
       * can still perform page-specific error handling.
       */
      return throwError(() => error);
    })
  );
};

function handleHttpError(
  error: HttpErrorResponse,
  authService: AuthService,
  router: Router,
  snackBar: MatSnackBar
): void {
  switch (error.status) {
    case 0:
      showMessage(
        snackBar,
        'Unable to connect to the server. Please make sure the backend is running.'
      );
      break;

    case 401:
      handleUnauthorized(
        authService,
        router,
        snackBar
      );
      break;

    case 403:
      showMessage(
        snackBar,
        getErrorMessage(
          error,
          'You do not have permission to perform this action.'
        )
      );
      break;

    case 408:
      showMessage(
        snackBar,
        'The request timed out. Please try again.'
      );
      break;

    case 429:
      showMessage(
        snackBar,
        getErrorMessage(
          error,
          'Too many requests. Please wait and try again.'
        )
      );
      break;

    case 500:
      showMessage(
        snackBar,
        getErrorMessage(
          error,
          'An internal server error occurred. Please try again later.'
        )
      );
      break;

    case 502:
    case 503:
    case 504:
      showMessage(
        snackBar,
        'The server is temporarily unavailable. Please try again later.'
      );
      break;

    default:
      /*
       * Statuses such as 400, 404, 409 and 422 are left
       * for the requesting component to display.
       */
      break;
  }
}

function handleUnauthorized(
  authService: AuthService,
  router: Router,
  snackBar: MatSnackBar
): void {
  if (isHandlingUnauthorized) {
    return;
  }

  isHandlingUnauthorized = true;

  /*
   * Save the current page so the user can return after login.
   */
  const currentUrl = router.url;

  const returnUrl =
    currentUrl &&
    !currentUrl.startsWith('/auth')
      ? currentUrl
      : null;

  authService.logout();

  showMessage(
    snackBar,
    'Your session has expired. Please sign in again.'
  );

  const navigation = returnUrl
    ? router.navigate(
        ['/auth/login'],
        {
          queryParams: {
            returnUrl
          },
          replaceUrl: true
        }
      )
    : router.navigateByUrl(
        '/auth/login',
        {
          replaceUrl: true
        }
      );

  void navigation.finally(() => {
    /*
     * A short delay protects against late 401 responses
     * from other requests that were already running.
     */
    window.setTimeout(() => {
      isHandlingUnauthorized = false;
    }, 500);
  });
}

function isPublicAuthenticationRequest(
  requestUrl: string
): boolean {
  const publicEndpoints = [
    `${environment.apiUrl}/auth/login`,
    `${environment.apiUrl}/auth/register`,
    `${environment.apiUrl}/auth/forgot-password`,
    `${environment.apiUrl}/auth/reset-password`
  ];

  return publicEndpoints.some((endpoint) =>
    requestUrl.startsWith(endpoint)
  );
}

function getErrorMessage(
  error: HttpErrorResponse,
  fallbackMessage: string
): string {
  const body = error.error as
    | ApiErrorBody
    | string
    | null;

  if (typeof body === 'string' && body.trim()) {
    return body;
  }

  if (
    body &&
    typeof body === 'object'
  ) {
    if (
      typeof body.message === 'string' &&
      body.message.trim()
    ) {
      return body.message;
    }

    if (
      typeof body.error === 'string' &&
      body.error.trim()
    ) {
      return body.error;
    }

    if (Array.isArray(body.errors)) {
      const firstError = body.errors[0];

      const validationMessage =
        firstError?.message ??
        firstError?.msg;

      if (validationMessage) {
        return validationMessage;
      }
    }
  }

  return fallbackMessage;
}

function showMessage(
  snackBar: MatSnackBar,
  message: string
): void {
  snackBar.open(
    message,
    'Close',
    {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    }
  );
}
