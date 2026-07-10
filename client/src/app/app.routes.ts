import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

export const appRoutes: Routes = [
  {
    path: 'auth',

    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then((routes) => routes.AUTH_ROUTES)
  },

  {
    path: 'dashboard',
    title: 'Dashboard | AngularHub',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./features/dashboard/dashboard')
        .then(
          (component) => component.Dashboard
        )
  },

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
