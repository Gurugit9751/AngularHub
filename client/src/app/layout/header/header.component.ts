import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../core/services/auth.service';

import { USER_HEADER_MENU } from '../../core/data/header-menu';

import { ADMIN_HEADER_MENU } from '../../core/data/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly userHeaderMenu = USER_HEADER_MENU;
  readonly adminHeaderMenu = ADMIN_HEADER_MENU;

  readonly currentUser = this.authService.currentUser;

  readonly isAdmin = computed(() => this.authService.isAdmin());

  logout(): void {
    this.authService.logout();

    void this.router.navigate(['/auth/login']);
  }
}
