import { User, UserCredentials, UserRegistration } from '../entities/User';

export interface IAuthRepository {
  login(credentials: UserCredentials): Promise<{ user: User; token: string }>;
  register(data: UserRegistration): Promise<{ user: User; token: string }>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): Promise<boolean>;
}
