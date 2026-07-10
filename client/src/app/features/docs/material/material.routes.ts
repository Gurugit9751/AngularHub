import { Routes } from '@angular/router';

export const MATERIAL_ROUTES: Routes = [

  {
    path: 'table',
    loadComponent: () =>
      import('./table/table.component')
        .then(c => c.TableComponent)
  },

  {
    path: 'dialog',
    loadComponent: () =>
      import('./dialog/dialog.component')
        .then(c => c.DialogComponent)
  },

  {
    path: 'form-field',
    loadComponent: () =>
      import('./form-field/form-field.component')
        .then(c => c.FormFieldComponent)
  },

  {
    path: 'toolbar',
    loadComponent: () =>
      import('./toolbar/toolbar.component')
        .then(c => c.ToolbarComponent)
  },

  {
    path: 'sidenav',
    loadComponent: () =>
      import('./sidenav/sidenav.component')
        .then(c => c.SidenavComponent)
  }

];
