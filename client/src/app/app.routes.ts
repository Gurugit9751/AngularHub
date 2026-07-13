import { inject } from '@angular/core';

import { RedirectFunction, Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { AuthService } from './core/services/auth.service';

const landingPageRedirect: RedirectFunction = () => {
  const authService = inject(AuthService);

  return authService.isAdmin() ? '/dashboard' : '/home';
};

export const appRoutes: Routes = [
  /*
   * Public authentication routes
   *
   * /auth/login
   * /auth/register
   */
  {
    path: 'auth',

    loadChildren: () => import('./features/auth/auth.routes').then((routes) => routes.AUTH_ROUTES),
  },

  /*
   * Protected application routes
   */
  {
    path: '',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./layout/layout/layout.component').then((component) => component.LayoutComponent),

    children: [
      /*
       * Role-based initial landing page
       *
       * Admin -> /dashboard
       * User  -> /home
       */
      {
        path: '',
        pathMatch: 'full',
        redirectTo: landingPageRedirect,
      },

      /*
       * Normal user home page
       */
      {
        path: 'home',

        loadComponent: () =>
          import('./features/home/home.component').then((component) => component.HomeComponent),
      },

      /*
       * Documentation routes
       *
       * /docs/angular/...
       * /docs/api/...
       */
      {
        path: 'docs',

        loadChildren: () =>
          import('./features/docs/docs.routes').then((routes) => routes.DOCS_ROUTES),
      },

      /*
       * Admin dashboard
       */
      {
        path: 'dashboard',

        canActivate: [roleGuard],

        data: {
          roles: ['admin'],
        },

        loadComponent: () =>
          import('./features/dashboard/dashboard').then((component) => component.Dashboard),
      },

      /*
       * Available for both admin and user
       */
      {
        path: 'profile',

        loadComponent: () =>
          import('./features/profile/profile').then((component) => component.Profile),
      },

      /*
       * Admin-only user management
       */
      {
        path: 'users',

        canActivate: [roleGuard],

        data: {
          roles: ['admin'],
        },

        loadComponent: () => import('./features/users/users').then((component) => component.Users),
      },

      /*
       * Admin-only settings
       */
      {
        path: 'settings',

        canActivate: [roleGuard],

        data: {
          roles: ['admin'],
        },

        loadComponent: () =>
          import('./features/settings/settings').then((component) => component.Settings),
      },

      /*
       * Protected unknown route
       */
      {
        path: '**',
        redirectTo: landingPageRedirect,
      },
    ],
  },

  /*
   * Public unknown route
   */
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
