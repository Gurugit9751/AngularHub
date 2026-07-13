import { inject } from '@angular/core';

import { RedirectFunction, Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

import { AuthService } from './core/services/auth.service';

/*
 * Redirect authenticated users based on their role.
 *
 * Admin -> /dashboard
 * User  -> /home
 */
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
       * Role-based initial route.
       */
      {
        path: '',
        pathMatch: 'full',
        redirectTo: landingPageRedirect,
      },

      /*
       * Normal user landing page.
       *
       * Sidebar must be hidden on this page.
       */
      {
        path: 'home',
        title: 'Home | AngularHub',

        loadComponent: () =>
          import('./features/home/home.component').then((component) => component.HomeComponent),
      },

      /*
       * User documentation portal.
       *
       * /docs/html/...
       * /docs/javascript/...
       * /docs/angular/...
       * /docs/node/...
       * /docs/mongodb/...
       */
      {
        path: 'docs',
        title: 'Documentation | AngularHub',

        loadChildren: () =>
          import('./features/docs/docs.routes').then((routes) => routes.DOCS_ROUTES),
      },

      /*
       * Admin-only dashboard.
       */
      {
        path: 'dashboard',
        title: 'Dashboard | AngularHub',

        canActivate: [roleGuard],

        data: {
          roles: ['admin'],
        },

        loadComponent: () =>
          import('./features/dashboard/dashboard').then((component) => component.Dashboard),
      },

      /*
       * Available for both admin and normal users.
       */
      {
        path: 'profile',
        title: 'Profile | AngularHub',

        loadComponent: () =>
          import('./features/profile/profile').then((component) => component.Profile),
      },

      /*
       * Admin-only user management.
       */
      {
        path: 'users',
        title: 'Users | AngularHub',

        canActivate: [roleGuard],

        data: {
          roles: ['admin'],
        },

        loadComponent: () => import('./features/users/users').then((component) => component.Users),
      },

      /*
       * Admin-only settings.
       */
      {
        path: 'settings',
        title: 'Settings | AngularHub',

        canActivate: [roleGuard],

        data: {
          roles: ['admin'],
        },

        loadComponent: () =>
          import('./features/settings/settings').then((component) => component.Settings),
      },

      /*
       * Unknown protected routes redirect based on role.
       */
      {
        path: '**',
        redirectTo: landingPageRedirect,
      },
    ],
  },

  /*
   * Unknown public routes.
   */
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
