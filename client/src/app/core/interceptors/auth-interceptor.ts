import {
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';

import { inject } from '@angular/core';

import { environment } from '../../../environment/environment';

import { TokenService } from '../services/token.service';

/**
 * Adds the JWT access token to protected backend API requests.
 *
 * Header format:
 *
 * Authorization: Bearer <token>
 */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenService = inject(TokenService);

  const token = tokenService.getToken();

  /*
   * Do not modify requests when:
   *
   * 1. The request is not going to our backend API.
   * 2. The request is for a public authentication endpoint.
   * 3. No JWT token is available.
   */
  if (
    !isBackendApiRequest(request) ||
    isPublicAuthRequest(request) ||
    !token
  ) {
    return next(request);
  }

  const authenticatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authenticatedRequest);
};

/**
 * Checks whether the HTTP request belongs to our backend API.
 *
 * This prevents the JWT from being sent to external URLs,
 * images, CDN resources, or third-party services.
 */
function isBackendApiRequest(request: HttpRequest<unknown>): boolean {
  return request.url.startsWith(environment.apiUrl);
}

/**
 * Authentication endpoints that do not require an existing JWT.
 */
function isPublicAuthRequest(request: HttpRequest<unknown>): boolean {
  const publicEndpoints = [
    `${environment.apiUrl}/auth/login`,
    `${environment.apiUrl}/auth/register`,
    `${environment.apiUrl}/auth/forgot-password`,
    `${environment.apiUrl}/auth/reset-password`
  ];

  return publicEndpoints.some((endpoint) =>
    request.url.startsWith(endpoint)
  );
}
