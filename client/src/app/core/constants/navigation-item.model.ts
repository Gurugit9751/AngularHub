import { AppPermission } from '../constants/role-permissions.constant';

export interface NavigationItem {
  label: string;
  icon: string;
  route: string;
  permission: AppPermission;
}
