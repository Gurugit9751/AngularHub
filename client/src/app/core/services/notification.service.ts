import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {
    this.open(message, 'Close', 3500);
  }

  error(message: string): void {
    this.open(message, 'Close', 5000);
  }

  warning(message: string): void {
    this.open(message, 'Close', 4500);
  }

  info(message: string): void {
    this.open(message, 'Close', 3500);
  }

  dismiss(): void {
    this.snackBar.dismiss();
  }

  private open(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
