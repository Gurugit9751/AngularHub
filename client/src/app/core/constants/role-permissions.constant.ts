import { UserRole } from '../models/user.model';

export type AppPermission =
  | 'dashboard.view'
  | 'home.view'
  | 'docs.view'
  | 'profile.view'
  | 'users.view'
  | 'settings.view';

export const ROLE_PERMISSIONS: Readonly<Record<UserRole, readonly AppPermission[]>> = {
  admin: ['dashboard.view', 'profile.view', 'users.view', 'settings.view'],

  user: ['home.view', 'docs.view', 'profile.view'],
};
