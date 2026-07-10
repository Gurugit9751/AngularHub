import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    authService.logout();

    return router.createUrlTree(['/auth/login'], {
      queryParams: {
        returnUrl: state.url,
      },
    });
  }

  const allowedRoles = route.data['roles'] as UserRole[] | undefined;

  if (!allowedRoles?.length || authService.hasAnyRole(allowedRoles)) {
    return true;
  }

  return router.createUrlTree(['/dashboard'], {
    queryParams: {
      accessDenied: true,
    },
  });
};
