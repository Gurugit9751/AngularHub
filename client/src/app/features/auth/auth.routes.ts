import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    title: 'Login | AngularHub',

    loadComponent: () =>
      import('./login/login')
        .then((component) => component.Login)
  },

  {
    path: 'register',
    title: 'Register | AngularHub',

    loadComponent: () =>
      import('./register/register')
        .then((component) => component.Register)
  },

  {
    path: 'forgot-password',
    title: 'Forgot Password | AngularHub',

    loadComponent: () =>
      import('./forgot-password/forgot-password')
        .then(
          (component) => component.ForgotPassword
        )
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
