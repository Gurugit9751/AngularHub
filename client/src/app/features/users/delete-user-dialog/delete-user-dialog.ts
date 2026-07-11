import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../../../core/models/user.model';

export interface DeleteUserDialogData {
  user: User;
}

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './delete-user-dialog.html',
  styleUrl: './delete-user-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteUserDialog {
  readonly data = inject<DeleteUserDialogData>(MAT_DIALOG_DATA);
}
