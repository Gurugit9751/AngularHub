import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private api = 'https://dummyjson.com';

  getUsers() {
    return this.http.get(`${this.api}/users`);
  }

}
