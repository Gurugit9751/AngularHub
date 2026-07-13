import { Routes } from '@angular/router';

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'introduction',
  },

  {
    path: 'introduction',
    loadChildren: () =>
      import('./introduction/introduction.routes').then((routes) => routes.INTRODUCTION_ROUTES),
  },

  {
    path: 'angular',
    loadChildren: () => import('./angular/angular.routes').then((routes) => routes.ANGULAR_ROUTES),
  },

  {
    path: 'api',
    loadChildren: () => import('./api/api.routes').then((routes) => routes.API_ROUTES),
  },

  {
    path: 'rxjs',
    loadChildren: () => import('./rxjs/rxjs.routes').then((routes) => routes.RXJS_ROUTES),
  },

  {
    path: 'material',
    loadChildren: () =>
      import('./material/material.routes').then((routes) => routes.MATERIAL_ROUTES),
  },

  {
    path: '**',
    redirectTo: 'introduction',
  },
];
