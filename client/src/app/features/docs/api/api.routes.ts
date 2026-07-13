import { Routes } from '@angular/router';

export const API_ROUTES: Routes = [
  /*
   * /docs/api
   *
   * Default API topic
   */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },

  /*
   * /docs/api/auth
   */
  {
    path: 'auth',

    loadComponent: () =>
      import('./auth/auth.component').then((component) => component.AuthComponent),
  },

  /*
   * /docs/api/carts
   */
  {
    path: 'carts',

    loadComponent: () =>
      import('./carts/carts.component').then((component) => component.CartsComponent),
  },

  /*
   * /docs/api/posts
   */
  {
    path: 'posts',

    loadComponent: () =>
      import('./posts/posts.component').then((component) => component.PostsComponent),
  },

  /*
   * /docs/api/products
   */
  {
    path: 'products',

    loadComponent: () =>
      import('./products/products.component').then((component) => component.ProductsComponent),
  },

  /*
   * /docs/api/users
   */
  {
    path: 'users',

    loadComponent: () =>
      import('./users/users.component').then((component) => component.UsersComponent),
  },

  /*
   * Unknown API topic
   */
  {
    path: '**',
    redirectTo: 'auth',
  },
];
