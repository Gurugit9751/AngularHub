import { Routes } from '@angular/router';

export const DOCS_ROUTES: Routes = [
  {
    path: 'introduction',
    loadChildren: () =>
      import('./introduction/introduction.routes').then(m => m.INTRODUCTION_ROUTES)
  },
  {
    path: 'angular',
    loadChildren: () =>
      import('./angular/angular.routes').then(m => m.ANGULAR_ROUTES)
  },
  {
    path: 'rxjs',
    loadChildren: () =>
      import('./rxjs/rxjs.routes').then(m => m.RXJS_ROUTES)
  },
  {
    path: 'material',
    loadChildren: () =>
      import('./material/material.routes').then(m => m.MATERIAL_ROUTES)
  },
  {
    path: 'api',
    loadChildren: () =>
      import('./api/api.routes').then(m => m.API_ROUTES)
  }
];
