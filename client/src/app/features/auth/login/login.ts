import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { finalize } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/login-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly hidePassword = signal(true);
  readonly isSubmitting = signal(false);
  readonly loginError = signal<string | null>(null);

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]],

    rememberMe: [false],
  });

  togglePassword(): void {
    this.hidePassword.update((value) => !value);
  }

  login(): void {
    this.loginError.set(null);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting()) {
      return;
    }

    const formValue = this.loginForm.getRawValue();

    const request: LoginRequest = {
      email: formValue.email.trim().toLowerCase(),
      password: formValue.password,
    };

    this.isSubmitting.set(true);

    this.authService
      .login(request)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        }),
      )
      .subscribe({
        next: () => {
          const returnUrl =
            this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard';

          void this.router.navigateByUrl(returnUrl);
        },

        error: (error: HttpErrorResponse) => {
          console.error('Login failed:', error);

          this.loginError.set(error.error?.message ?? 'Invalid email or password.');
        },
      });
  }
}
