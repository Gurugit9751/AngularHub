export interface HeaderNavigationItem {
  readonly label: string;
  readonly route: string;
  readonly icon?: string;
  readonly technology?: string;
}

export interface SidebarNavigationItem {
  readonly label: string;
  readonly route: string;
  readonly icon?: string;
}

export interface TechnologyNavigation {
  readonly technology: string;
  readonly title: string;
  readonly sidebarItems: readonly SidebarNavigationItem[];
}
