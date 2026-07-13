import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from '../../core/services/auth.service';

import { USER_HEADER_MENU } from '../../core/data/menu';

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
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentUser = this.authService.currentUser;
  readonly userHeaderMenu = USER_HEADER_MENU;

  readonly isAdmin = computed(() => this.authService.isAdmin());

  readonly displayName = computed(() => {
    return this.currentUser()?.firstName?.trim() || 'User';
  });

  readonly fullName = computed(() => {
    const user = this.currentUser();

    if (!user) {
      return 'AngularHub User';
    }

    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'AngularHub User';
  });

  // readonly fullName = computed(() => {
  //   const user = this.currentUser();

  //   if (!user) {
  //     return 'AngularHub User';
  //   }

  //   const firstName = user.firstName?.trim() ?? '';

  //   const lastName = user.lastName?.trim() ?? '';

  //   const combinedName = `${firstName} ${lastName}`.trim();

  //   return combinedName || user.name?.trim() || 'AngularHub User';
  // });

  readonly initials = computed(() => {
    const name = this.fullName();

    const parts = name.split(' ').filter(Boolean).slice(0, 2);

    return parts.map((part) => part.charAt(0).toUpperCase()).join('');
  });

  logout(): void {
    this.authService.logout();

    void this.router.navigateByUrl('/auth/login', {
      replaceUrl: true,
    });
  }
}
