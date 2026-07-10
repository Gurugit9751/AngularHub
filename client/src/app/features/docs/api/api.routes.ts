import { Routes } from '@angular/router';

export const API_ROUTES: Routes = [

  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component')
        .then(c => c.UsersComponent)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component')
        .then(c => c.ProductsComponent)
  },

  {
    path: 'carts',
    loadComponent: () =>
      import('./carts/carts.component')
        .then(c => c.CartsComponent)
  },

  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/posts.component')
        .then(c => c.PostsComponent)
  },

  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component')
        .then(c => c.AuthComponent)
  }

];
