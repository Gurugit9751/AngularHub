import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';

import { filter, map, startWith } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';

import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',

  imports: [RouterOutlet, MatSidenavModule, HeaderComponent, SidebarComponent],

  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
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

  readonly showSidebar = computed(() => {
    if (this.isAdmin()) {
      return true;
    }

    return this.currentUrl().startsWith('/docs/');
  });
}
