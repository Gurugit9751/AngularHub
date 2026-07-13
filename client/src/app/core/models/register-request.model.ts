export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      createdAt?: string;
    };
  };
}
