export type UserRole = 'admin' | 'user';

export type UserApiRole = 'Admin' | 'User';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export type UserApiModel = Omit<User, 'role'> & {
  role: UserApiRole;
};

export interface UserListQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}

export interface UserPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UserListData {
  users: User[];
  pagination: UserPagination;
}

export interface UserApiListData {
  users: UserApiModel[];
  pagination: UserPagination;
}

export interface DeletedUserData {
  id: string;
}
