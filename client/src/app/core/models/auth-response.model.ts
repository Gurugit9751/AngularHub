import { User } from './user.model';

export interface AuthData {
  token: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}
