import { Routes } from '@angular/router';

const loadOverviewComponent = () =>
  import('./introduction/overview/overview.component').then(
    (component) => component.OverviewComponent,
  );

const createDocumentationSectionRoutes = (topics: readonly string[]): Routes =>
  topics.map((topic) => ({
    path: topic,
    loadComponent: loadOverviewComponent,
  }));

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'angular/introduction',
  },

  /*
   * HTML documentation.
   */
  {
    path: 'html',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'introduction',
      },
      ...createDocumentationSectionRoutes([
        'introduction',
        'elements',
        'forms',
        'tables',
        'lists',
        'semantic-tags',
        'media',
        'canvas',
        'svg',
      ]),
      {
        path: '**',
        redirectTo: 'introduction',
      },
    ],
  },

  /*
   * JavaScript documentation.
   */
  {
    path: 'javascript',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'introduction',
      },
      ...createDocumentationSectionRoutes([
        'introduction',
        'variables',
        'functions',
        'arrays',
        'objects',
        'promises',
        'async-await',
        'closures',
        'prototype',
        'es6',
      ]),
      {
        path: '**',
        redirectTo: 'introduction',
      },
    ],
  },

  /*
   * Angular documentation.
   */
  {
    path: 'angular',
    loadChildren: () => import('./angular/angular.routes').then((routes) => routes.ANGULAR_ROUTES),
  },

  /*
   * Node documentation.
   */
  {
    path: 'node',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'introduction',
      },
      ...createDocumentationSectionRoutes([
        'introduction',
        'modules',
        'express',
        'middleware',
        'authentication',
        'rest-api',
        'streams',
        'events',
        'file-system',
      ]),
      {
        path: '**',
        redirectTo: 'introduction',
      },
    ],
  },

  /*
   * MongoDB documentation.
   */
  {
    path: 'mongodb',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'introduction',
      },
      ...createDocumentationSectionRoutes([
        'introduction',
        'collections',
        'crud',
        'aggregation',
        'indexes',
        'transactions',
        'mongoose',
      ]),
      {
        path: '**',
        redirectTo: 'introduction',
      },
    ],
  },

  /*
   * Keep existing routes working.
   */
  {
    path: 'introduction',
    loadChildren: () =>
      import('./introduction/introduction.routes').then((routes) => routes.INTRODUCTION_ROUTES),
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
    redirectTo: 'angular/introduction',
  },
];
