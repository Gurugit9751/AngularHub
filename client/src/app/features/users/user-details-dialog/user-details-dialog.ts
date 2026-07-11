import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DatePipe } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../../../core/models/user.model';

export interface UserDetailsDialogData {
  user: User;
}

@Component({
  selector: 'app-user-details-dialog',
  standalone: true,
  imports: [DatePipe, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './user-details-dialog.html',
  styleUrl: './user-details-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsDialog {
  readonly data = inject<UserDetailsDialogData>(MAT_DIALOG_DATA);

  get initials(): string {
    const firstName = this.data.user.firstName.charAt(0);

    const lastName = this.data.user.lastName.charAt(0);

    return `${firstName}${lastName}`.toUpperCase();
  }
}
