import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';

import { filter, map, startWith } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
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

  readonly isDocumentationPage = computed(() => this.currentUrl().startsWith('/docs/'));

  readonly showSidebar = computed(() => {
    if (this.isAdmin()) {
      return true;
    }

    return this.isDocumentationPage();
  });

  readonly layoutClass = computed(() => ({
    'with-sidebar': this.showSidebar(),
    'admin-layout': this.isAdmin(),
    'documentation-layout': !this.isAdmin() && this.isDocumentationPage(),
    'home-layout': !this.isAdmin() && !this.isDocumentationPage(),
  }));
}
