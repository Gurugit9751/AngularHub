import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'docs',
        loadChildren: () =>
          import('./features/docs/docs.routes').then(m => m.DOCS_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
