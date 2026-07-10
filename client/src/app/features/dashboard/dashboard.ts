import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);

  readonly currentUser =
    this.authService.currentUser;

  logout(): void {
    this.authService.logout();

    void this.router.navigateByUrl(
      '/auth/login'
    );
  }
}
