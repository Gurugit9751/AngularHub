import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  passwordControlName: string,
  confirmPasswordControlName: string,
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordControlName);
    const confirmPasswordControl = formGroup.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (!confirmPassword) {
      return null;
    }

    if (password !== confirmPassword) {
      const existingErrors = confirmPasswordControl.errors ?? {};

      confirmPasswordControl.setErrors({
        ...existingErrors,
        passwordMismatch: true,
      });

      return {
        passwordMismatch: true,
      };
    }

    if (confirmPasswordControl.hasError('passwordMismatch')) {
      const errors = {
        ...(confirmPasswordControl.errors ?? {}),
      };

      delete errors['passwordMismatch'];

      confirmPasswordControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }

    return null;
  };
}
