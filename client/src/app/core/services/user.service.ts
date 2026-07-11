import { Injectable, inject } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '../../../environment/environment';

import { ApiResponse } from '../models/api-response.model';

import {
  DeletedUserData,
  User,
  UserApiListData,
  UserApiModel,
  UserApiRole,
  UserListData,
  UserListQuery,
  UserRole,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly usersApiUrl = `${environment.apiUrl}/users`;

  private readonly authApiUrl = `${environment.apiUrl}/auth`;

  /**
   * Backward-compatible user-list method.
   *
   * Returns the first page containing 10 users.
   * The paginated admin screen will use getUsersPage().
   */
  getUsers(): Observable<User[]> {
    return this.getUsersPage().pipe(map((result) => result.users));
  }

  /**
   * Returns users with pagination information.
   */
  getUsersPage(query: UserListQuery = {}): Observable<UserListData> {
    let params = new HttpParams()
      .set('page', String(query.page ?? 1))
      .set('limit', String(query.limit ?? 10));

    const search = query.search?.trim();

    if (search) {
      params = params.set('search', search);
    }

    if (query.role) {
      params = params.set('role', this.toApiRole(query.role));
    }

    return this.http.get<ApiResponse<UserApiListData>>(this.usersApiUrl, { params }).pipe(
      map((response) => ({
        users: response.data.users.map((user) => this.normalizeUser(user)),
        pagination: response.data.pagination,
      })),
    );
  }

  /**
   * Returns one user by MongoDB ID.
   */
  getUserById(userId: string): Observable<User> {
    return this.http
      .get<ApiResponse<UserApiModel>>(`${this.usersApiUrl}/${userId}`)
      .pipe(map((response) => this.normalizeUser(response.data)));
  }

  /**
   * Updates a user's role.
   *
   * Angular uses admin/user.
   * Backend uses Admin/User.
   */
  updateUserRole(userId: string, role: UserRole): Observable<User> {
    return this.http
      .patch<ApiResponse<UserApiModel>>(`${this.usersApiUrl}/${userId}/role`, {
        role: this.toApiRole(role),
      })
      .pipe(map((response) => this.normalizeUser(response.data)));
  }

  /**
   * Deletes a user.
   */
  deleteUser(userId: string): Observable<DeletedUserData> {
    return this.http
      .delete<ApiResponse<DeletedUserData>>(`${this.usersApiUrl}/${userId}`)
      .pipe(map((response) => response.data));
  }

  /**
   * Preserved for backward compatibility.
   *
   * Profile continues using the existing /api/auth/profile
   * endpoint rather than /api/users/profile.
   */
  getProfile(): Observable<User> {
    return this.http
      .get<ApiResponse<UserApiModel>>(`${this.authApiUrl}/profile`)
      .pipe(map((response) => this.normalizeUser(response.data)));
  }

  private normalizeUser(user: UserApiModel): User {
    return {
      ...user,
      role: this.normalizeRole(user.role),
    };
  }

  private normalizeRole(role: UserApiRole | string): UserRole {
    return role.trim().toLowerCase() === 'admin' ? 'admin' : 'user';
  }

  private toApiRole(role: UserRole): UserApiRole {
    return role === 'admin' ? 'Admin' : 'User';
  }
}
