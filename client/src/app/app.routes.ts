import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const appRoutes: Routes = [
  {
    path: 'auth',

    loadChildren: () => import('./features/auth/auth.routes').then((routes) => routes.AUTH_ROUTES),
  },

  {
    path: '',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./layout/layout/layout.component').then((component) => component.Layout),

    children: [
      {
        path: 'dashboard',
        title: 'Dashboard | AngularHub',

        loadComponent: () =>
          import('./features/dashboard/dashboard').then((component) => component.Dashboard),
      },

      {
        path: 'profile',
        title: 'Profile | AngularHub',

        loadComponent: () =>
          import('./features/profile/profile').then((component) => component.Profile),
      },

      {
        path: 'users',
        title: 'Users | AngularHub',
        canActivate: [roleGuard],

        data: {
          roles: ['admin'],
        },

        loadComponent: () => import('./features/users/users').then((component) => component.Users),
      },

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

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
