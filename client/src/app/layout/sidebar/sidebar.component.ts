import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';

import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { filter, map, startWith } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

import {
  ADMIN_SIDEBAR_MENU,
  DOCUMENTATION_MENUS,
  DocumentationMenu,
  SidebarGroupItem,
} from '../../core/data/menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    {
      initialValue: this.router.url,
    },
  );

  readonly isAdmin = computed(() => this.authService.isAdmin());

  readonly adminMenu = ADMIN_SIDEBAR_MENU;

  readonly activeDocumentationSection = computed<DocumentationMenu | undefined>(() => {
    const url = this.currentUrl();

    return DOCUMENTATION_MENUS.find((menu: DocumentationMenu) =>
      url.startsWith(`/docs/${menu.section}`),
    );
  });

  readonly sidebarTitle = computed(() => {
    return this.activeDocumentationSection()?.title ?? 'Documentation';
  });

  readonly sidebarMenu = computed<readonly SidebarGroupItem[]>(() => {
    return this.activeDocumentationSection()?.items ?? [];
  });

  readonly expandedGroupId = signal<string | null>(null);

  constructor() {
    effect(() => {
      const url = this.currentUrl();

      const activeGroup = this.sidebarMenu().find((item: SidebarGroupItem) =>
        item.children?.some((child) => url.startsWith(child.route)),
      );

      if (activeGroup) {
        this.expandedGroupId.set(activeGroup.id);
      }
    });
  }

  toggleGroup(item: SidebarGroupItem): void {
    if (!item.children?.length) {
      return;
    }

    this.expandedGroupId.update((currentGroupId) => (currentGroupId === item.id ? null : item.id));
  }

  isExpanded(item: SidebarGroupItem): boolean {
    return this.expandedGroupId() === item.id;
  }

  isGroupActive(item: SidebarGroupItem): boolean {
    const url = this.currentUrl();

    if (item.route) {
      return url.startsWith(item.route);
    }

    return item.children?.some((child) => url.startsWith(child.route)) ?? false;
  }
}
