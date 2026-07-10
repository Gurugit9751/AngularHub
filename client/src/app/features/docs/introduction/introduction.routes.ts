import { Routes } from '@angular/router';

export const INTRODUCTION_ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },

  {
    path: 'overview',
    loadComponent: () =>
      import('./overview/overview.component')
        .then(c => c.OverviewComponent)
  },

  {
    path: 'installation',
    loadComponent: () =>
      import('./installation/installation.component')
        .then(c => c.InstallationComponent)
  },

  {
    path: 'architecture',
    loadComponent: () =>
      import('./architecture/architecture.component')
        .then(c => c.ArchitectureComponent)
  }

];
