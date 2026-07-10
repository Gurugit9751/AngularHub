import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  private readonly api = 'http://localhost:5000/api/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.api}/profile`);
  }

}
