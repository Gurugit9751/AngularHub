import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { DatePipe } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  BehaviorSubject,
  EMPTY,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  startWith,
  switchMap,
} from 'rxjs';

import { PageEvent } from '@angular/material/paginator';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { User, UserRole, UserStatistics } from '../../core/models/user.model';

import { AuthService } from '../../core/services/auth.service';

import { NotificationService } from '../../core/services/notification.service';

import { UserService } from '../../core/services/user.service';

import {
  DeleteUserDialog,
  DeleteUserDialogData,
} from '../../features/users/delete-user-dialog/delete-user-dialog';

import {
  UserDetailsDialog,
  UserDetailsDialogData,
} from '../../features/users/user-details-dialog/user-details-dialog';

interface UserPageState {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users implements OnInit {
  private readonly userService = inject(UserService);

  private readonly authService = inject(AuthService);

  private readonly notificationService = inject(NotificationService);

  private readonly dialog = inject(MatDialog);

  private readonly destroyRef = inject(DestroyRef);

  /*
   * One stream for pagination state.
   */
  private readonly pageState$ = new BehaviorSubject<UserPageState>({
    pageIndex: 0,
    pageSize: 10,
  });

  /*
   * Used only for explicit refresh and retry.
   */
  private readonly refreshUsers$ = new BehaviorSubject<void>(undefined);

  readonly currentUser = this.authService.currentUser;

  readonly users = signal<User[]>([]);

  readonly statistics = signal<UserStatistics | null>(null);

  readonly loading = signal(false);

  readonly statisticsLoading = signal(false);

  readonly statisticsError = signal(false);

  readonly errorMessage = signal<string | null>(null);

  readonly actionUserId = signal<string | null>(null);

  readonly pageIndex = signal(0);

  readonly pageSize = signal(10);

  readonly totalUsers = signal(0);

  readonly displayedColumns = ['user', 'email', 'role', 'createdAt', 'actions'];

  readonly pageSizeOptions = [5, 10, 25, 50];

  readonly searchControl = new FormControl('', {
    nonNullable: true,
  });

  readonly roleControl = new FormControl<UserRole | ''>('', {
    nonNullable: true,
  });

  ngOnInit(): void {
    this.configureUserLoading();
    this.loadStatistics();
  }

  /**
   * Retries or manually reloads the current user page.
   */
  loadUsers(): void {
    this.refreshUsers$.next();
  }

  /**
   * Refreshes both users and statistics.
   */
  refresh(): void {
    this.refreshUsers$.next();
    this.loadStatistics();
  }

  loadStatistics(): void {
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

  /**
   * Clears both filters and triggers only one API call.
   */
  clearFilters(): void {
    this.searchControl.setValue('', {
      emitEvent: false,
    });

    this.roleControl.setValue('', {
      emitEvent: false,
    });

    this.pageIndex.set(0);

    this.pageState$.next({
      pageIndex: 0,
      pageSize: this.pageSize(),
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);

    this.pageState$.next({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    });
  }

  viewUser(user: User): void {
    this.actionUserId.set(user._id);

    this.userService
      .getUserById(user._id)
      .pipe(
        finalize(() => {
          this.actionUserId.set(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (selectedUser) => {
          this.dialog.open<UserDetailsDialog, UserDetailsDialogData>(UserDetailsDialog, {
            width: '560px',
            maxWidth: '95vw',
            data: {
              user: selectedUser,
            },
          });
        },
        error: (error: unknown) => {
          this.notificationService.error(this.getErrorMessage(error));
        },
      });
  }

  updateUserRole(user: User, role: UserRole): void {
    if (user.role === role || this.isCurrentUser(user)) {
      return;
    }

    this.actionUserId.set(user._id);

    this.userService
      .updateUserRole(user._id, role)
      .pipe(
        finalize(() => {
          this.actionUserId.set(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (updatedUser) => {
          this.users.update((users) =>
            users.map((existingUser) =>
              existingUser._id === updatedUser._id ? updatedUser : existingUser,
            ),
          );

          this.notificationService.success(
            `${updatedUser.firstName}'s role was updated successfully.`,
          );

          this.loadStatistics();
        },
        error: (error: unknown) => {
          this.notificationService.error(this.getErrorMessage(error));

          /*
           * Restore the server-side value.
           */
          this.refreshUsers$.next();
        },
      });
  }

  confirmDelete(user: User): void {
    if (this.isCurrentUser(user)) {
      this.notificationService.warning('You cannot delete your own account.');

      return;
    }

    const dialogReference = this.dialog.open<DeleteUserDialog, DeleteUserDialogData, boolean>(
      DeleteUserDialog,
      {
        width: '480px',
        maxWidth: '95vw',
        disableClose: true,
        data: {
          user,
        },
      },
    );

    dialogReference
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.deleteUser(user);
        }
      });
  }

  isCurrentUser(user: User): boolean {
    return this.currentUser()?._id === user._id;
  }

  isActionInProgress(user: User): boolean {
    return this.actionUserId() === user._id;
  }

  getInitials(user: User): string {
    const firstName = user.firstName.charAt(0);

    const lastName = user.lastName.charAt(0);

    return `${firstName}${lastName}`.toUpperCase();
  }

  /**
   * Single user-list pipeline.
   *
   * Search, role, pagination and refresh all flow through
   * one switchMap, preventing duplicate subscriptions.
   */
  private configureUserLoading(): void {
    const search$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),

      map((value) => value.trim()),

      /*
       * Wait until the user stops typing.
       */
      debounceTime(400),

      /*
       * Prevent repeated calls for the same text.
       * The comparison is case-insensitive.
       */
      distinctUntilChanged((previous, current) => previous.toLowerCase() === current.toLowerCase()),
    );

    const role$ = this.roleControl.valueChanges.pipe(
      startWith(this.roleControl.value),
      distinctUntilChanged(),
    );

    combineLatest([search$, role$, this.pageState$, this.refreshUsers$])
      .pipe(
        switchMap(([search, role, pageState]) => {
          this.loading.set(true);
          this.errorMessage.set(null);

          return this.userService
            .getUsersPage({
              page: pageState.pageIndex + 1,

              limit: pageState.pageSize,

              search: search || undefined,

              role: role || undefined,
            })
            .pipe(
              finalize(() => {
                this.loading.set(false);
              }),
            );
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (result) => {
          this.users.set(result.users);

          this.totalUsers.set(result.pagination.total);
        },

        error: (error: unknown) => {
          this.users.set([]);
          this.totalUsers.set(0);

          this.errorMessage.set(this.getErrorMessage(error));
        },
      });
  }

  private deleteUser(user: User): void {
    this.actionUserId.set(user._id);

    this.userService
      .deleteUser(user._id)
      .pipe(
        finalize(() => {
          this.actionUserId.set(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.notificationService.success(
            `${user.firstName} ${user.lastName} was deleted successfully.`,
          );

          const remainingTotal = Math.max(this.totalUsers() - 1, 0);

          const firstRecordOnCurrentPage = this.pageIndex() * this.pageSize();

          if (this.pageIndex() > 0 && firstRecordOnCurrentPage >= remainingTotal) {
            const previousPage = this.pageIndex() - 1;

            this.pageIndex.set(previousPage);

            this.pageState$.next({
              pageIndex: previousPage,
              pageSize: this.pageSize(),
            });
          } else {
            this.refreshUsers$.next();
          }

          this.loadStatistics();
        },
        error: (error: unknown) => {
          this.notificationService.error(this.getErrorMessage(error));
        },
      });
  }

  private getErrorMessage(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'An unexpected error occurred.';
    }

    const serverMessage = error.error?.message;

    if (typeof serverMessage === 'string' && serverMessage.trim()) {
      return serverMessage;
    }

    const validationMessage = error.error?.errors?.[0]?.msg;

    if (typeof validationMessage === 'string') {
      return validationMessage;
    }

    if (error.status === 0) {
      return 'Unable to connect to the server.';
    }

    if (error.status === 401) {
      return 'Your session has expired. Please log in again.';
    }

    if (error.status === 403) {
      return 'You do not have permission to manage users.';
    }

    if (error.status === 404) {
      return 'The requested user was not found.';
    }

    return 'Unable to complete the request.';
  }
}
