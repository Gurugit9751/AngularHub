import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { finalize } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../core/services/auth.service';

import { RegisterRequest } from '../../../core/models/register-request.model';

import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly hidePassword = signal(true);
  readonly hideConfirmPassword = signal(true);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  readonly registerForm = this.formBuilder.nonNullable.group(
    {
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z][a-zA-Z\s'-]*$/),
        ],
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z][a-zA-Z\s'-]*$/),
        ],
      ],

      email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/),
        ],
      ],

      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: passwordMatchValidator('password', 'confirmPassword'),
    },
  );

  readonly canSubmit = computed(() => !this.isSubmitting());

  get firstNameControl() {
    return this.registerForm.controls.firstName;
  }

  get lastNameControl() {
    return this.registerForm.controls.lastName;
  }

  get emailControl() {
    return this.registerForm.controls.email;
  }

  get passwordControl() {
    return this.registerForm.controls.password;
  }

  get confirmPasswordControl() {
    return this.registerForm.controls.confirmPassword;
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update((currentValue) => !currentValue);
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword.update((currentValue) => !currentValue);
  }

  onSubmit(): void {
    console.log('Create account clicked');
    console.log('Form value:', this.registerForm.getRawValue());
    console.log('Form valid:', this.registerForm.valid);
    console.log('Form errors:', this.registerForm.errors);

    this.errorMessage.set('');
    this.successMessage.set('');

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();

      console.log('First name errors:', this.firstNameControl.errors);
      console.log('Last name errors:', this.lastNameControl.errors);
      console.log('Email errors:', this.emailControl.errors);
      console.log('Password errors:', this.passwordControl.errors);
      console.log('Confirm password errors:', this.confirmPasswordControl.errors);

      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.getRawValue();

    const payload: RegisterRequest = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    console.log('Register payload:', payload);

    this.isSubmitting.set(true);

    this.authService
      .register(payload)
      .pipe(
        finalize(() => {
          this.isSubmitting.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('Register success:', response);

          this.successMessage.set(response.message || 'Registration successful.');

          this.registerForm.reset();

          setTimeout(() => {
            void this.router.navigate(['/login']);
          }, 1200);
        },

        error: (error: HttpErrorResponse) => {
          console.error('Register API error:', error);

          this.errorMessage.set(
            error.error?.message || error.error?.error || 'Registration failed.',
          );
        },
      });
  }

  private getRegistrationErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Unable to connect to the server. Verify that the backend is running.';
    }

    if (error.status === 409) {
      return 'An account already exists with this email address.';
    }

    if (error.status === 400) {
      return (
        error.error?.message ||
        error.error?.error ||
        'Please check the entered registration details.'
      );
    }

    if (error.status >= 500) {
      return 'The server could not complete the registration. Please try again.';
    }

    return error.error?.message || error.error?.error || 'Registration failed. Please try again.';
  }
}
