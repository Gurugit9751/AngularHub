import { Routes } from '@angular/router';

export const RXJS_ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'observable',
    pathMatch: 'full'
  },

  {
    path: 'observable',
    loadComponent: () =>
      import('./observable/observable.component')
        .then(c => c.ObservableComponent)
  },

  {
    path: 'subject',
    loadComponent: () =>
      import('./subject/subject.component')
        .then(c => c.SubjectComponent)
  },

  {
    path: 'behaviorsubject',
    loadComponent: () =>
      import('./behaviorsubject/behaviorsubject.component')
        .then(c => c.BehaviorsubjectComponent)
  },

  {
    path: 'replaysubject',
    loadComponent: () =>
      import('./replaysubject/replaysubject.component')
        .then(c => c.ReplaysubjectComponent)
  },

  {
    path: 'operators',
    loadComponent: () =>
      import('./operators/operators.component')
        .then(c => c.OperatorsComponent)
  }

];
