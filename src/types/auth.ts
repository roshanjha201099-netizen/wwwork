export interface User {
  id: string;
  name: string;
  email: string;
  accountType: string;
  joinedDate?: string;
  role?: string;
  avatarInitials: string;
}

// Alias for backward-compatibility with mock data definitions
export type MockUser = User;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}
