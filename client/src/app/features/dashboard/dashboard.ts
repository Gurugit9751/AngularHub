import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { finalize } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserStatistics } from '../../core/models/user.model';

import { AuthService } from '../../core/services/auth.service';

import { UserService } from '../../core/services/user.service';

import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HasPermissionDirective,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  private readonly authService = inject(AuthService);

  private readonly userService = inject(UserService);

  private readonly destroyRef = inject(DestroyRef);

  readonly currentUser = this.authService.currentUser;

  readonly isAdmin = this.authService.isAdmin;

  readonly statistics = signal<UserStatistics | null>(null);

  readonly statisticsLoading = signal(false);

  readonly statisticsError = signal(false);

  ngOnInit(): void {
    if (this.isAdmin()) {
      this.loadStatistics();
    }
  }

  loadStatistics(): void {
    if (!this.isAdmin()) {
      return;
    }

    this.statisticsLoading.set(true);
    this.statisticsError.set(false);

    this.userService
      .getStatistics()
      .pipe(
        finalize(() => {
          this.statisticsLoading.set(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (statistics) => {
          this.statistics.set(statistics);
        },
        error: () => {
          this.statistics.set(null);
          this.statisticsError.set(true);
        },
      });
  }
}
