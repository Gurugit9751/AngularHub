import { UserRole } from '../models/user.model';

export type AppPermission = 'dashboard.view' | 'profile.view' | 'users.view' | 'settings.view';

export const ROLE_PERMISSIONS: Readonly<Record<UserRole, readonly AppPermission[]>> = {
  admin: ['dashboard.view', 'profile.view', 'users.view', 'settings.view'],

  user: ['dashboard.view', 'profile.view'],
};
