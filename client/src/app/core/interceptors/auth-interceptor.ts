import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { environment } from '../../../environment/environment';

import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenService = inject(TokenService);

  if (!request.url.startsWith(environment.apiUrl)) {
    return next(request);
  }

  if (isPublicAuthRequest(request.url)) {
    return next(request);
  }

  const token = tokenService.getValidToken();

  if (!token) {
    return next(request);
  }

  const authenticatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authenticatedRequest);
};

function isPublicAuthRequest(requestUrl: string): boolean {
  const publicEndpoints = [
    `${environment.apiUrl}/auth/login`,
    `${environment.apiUrl}/auth/register`,
    `${environment.apiUrl}/auth/forgot-password`,
    `${environment.apiUrl}/auth/reset-password`,
  ];

  return publicEndpoints.some((endpoint) => requestUrl.startsWith(endpoint));
}
