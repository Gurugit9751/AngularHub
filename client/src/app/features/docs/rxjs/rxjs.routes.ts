import { Routes } from '@angular/router';

const loadOperatorsComponent = () =>
  import('./operators/operators.component').then((component) => component.OperatorsComponent);

export const RXJS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'observable',
    pathMatch: 'full',
  },

  {
    path: 'observable',
    loadComponent: () =>
      import('./observable/observable.component').then(
        (component) => component.ObservableComponent,
      ),
  },

  {
    path: 'subject',
    loadComponent: () =>
      import('./subject/subject.component').then((component) => component.SubjectComponent),
  },

  {
    path: 'behaviorsubject',
    loadComponent: () =>
      import('./behaviorsubject/behaviorsubject.component').then(
        (component) => component.BehaviorsubjectComponent,
      ),
  },

  {
    path: 'replaysubject',
    loadComponent: () =>
      import('./replaysubject/replaysubject.component').then(
        (component) => component.ReplaysubjectComponent,
      ),
  },

  {
    path: 'operators',
    loadComponent: loadOperatorsComponent,
  },

  {
    path: 'switch-map',
    loadComponent: loadOperatorsComponent,
  },

  {
    path: 'merge-map',
    loadComponent: loadOperatorsComponent,
  },

  {
    path: 'concat-map',
    loadComponent: loadOperatorsComponent,
  },

  {
    path: 'error-handling',
    loadComponent: loadOperatorsComponent,
  },

  {
    path: '**',
    redirectTo: 'observable',
  },
];
