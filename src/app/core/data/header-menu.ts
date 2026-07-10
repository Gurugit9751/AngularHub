export interface HeaderMenu {

  title: string;

  route: string;

}

export const HEADER_MENU: HeaderMenu[] = [

  {
    title: 'Home',
    route: '/'
  },

  {
    title: 'HTML',
    route: '/html'
  },

  {
    title: 'CSS',
    route: '/css'
  },

  {
    title: 'JavaScript',
    route: '/javascript'
  },

  {
    title: 'TypeScript',
    route: '/typescript'
  },

  {
    title: 'Angular',
    route: '/docs/angular/components'
  },

  {
    title: 'RxJS',
    route: '/docs/rxjs/observable'
  },

  {
    title: 'Material',
    route: '/docs/material/table'
  },

  {
    title: 'API',
    route: '/docs/api/users'
  }

];
