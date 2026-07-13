import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';

import { filter, map, startWith } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth.service';

import { ANGULAR_SIDEBAR_MENU, SidebarGroupItem } from '../../core/data/header-menu';

@Component({
  selector: 'app-sidebar',

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

  readonly isAngularSection = computed(() => this.currentUrl().startsWith('/docs/angular'));

  readonly angularMenu = ANGULAR_SIDEBAR_MENU;

  readonly expandedGroupId = signal<string | null>(
    this.currentUrl().startsWith('/docs/angular/rxjs') ? 'rxjs' : null,
  );

  toggleGroup(item: SidebarGroupItem): void {
    if (!item.children?.length) {
      return;
    }

    this.expandedGroupId.update((currentId) => (currentId === item.id ? null : item.id));
  }

  isExpanded(item: SidebarGroupItem): boolean {
    if (!item.children?.length) {
      return false;
    }

    return (
      this.expandedGroupId() === item.id || this.currentUrl().startsWith(`/docs/angular/${item.id}`)
    );
  }

  isGroupActive(item: SidebarGroupItem): boolean {
    if (item.route) {
      return this.currentUrl().startsWith(item.route);
    }

    return this.currentUrl().startsWith(`/docs/angular/${item.id}`);
  }
}
