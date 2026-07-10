import { Routes } from '@angular/router';

export const ANGULAR_ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full'
  },

  {
    path: 'components',
    loadComponent: () =>
      import('./components/components.component')
        .then(c => c.ComponentsComponent)
  },

  {
    path: 'directives',
    loadComponent: () =>
      import('./directives/directives.component')
        .then(c => c.DirectivesComponent)
  },

  {
    path: 'services',
    loadComponent: () =>
      import('./services/services.component')
        .then(c => c.ServicesComponent)
  },

  {
    path: 'routing',
    loadComponent: () =>
      import('./routing/routing.component')
        .then(c => c.RoutingComponent)
  },

  {
    path: 'guards',
    loadComponent: () =>
      import('./guards/guards.component')
        .then(c => c.GuardsComponent)
  },

  {
    path: 'pipes',
    loadComponent: () =>
      import('./pipes/pipes.component')
        .then(c => c.PipesComponent)
  },

  {
    path: 'lifecycle',
    loadComponent: () =>
      import('./lifecycle/lifecycle.component')
        .then(c => c.LifecycleComponent)
  },

  {
    path: 'forms',
    loadComponent: () =>
      import('./forms/forms.component')
        .then(c => c.FormsComponent)
  },

  {
    path: 'signals',
    loadComponent: () =>
      import('./signals/signals.component')
        .then(c => c.SignalsComponent)
  }

];
