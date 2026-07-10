import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private userService = inject(UserService);

  users: any;

  loadUsers() {

    this.userService.getUsers().subscribe({

      next: (response) => {

        this.users = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}
