import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import {
  User,
  UserCredentials,
  UserRegistration,
} from '../../domain/entities/User';
import { HttpClient } from '../api/HttpClient';

export class AuthRepository implements IAuthRepository {
  constructor(private httpClient: HttpClient) {}

  async login(
    credentials: UserCredentials
  ): Promise<{ user: User; token: string }> {
    const response = await this.httpClient.post<{ user: User; token: string }>(
      '/auth/login',
      credentials,
      false
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
    }

    return {
      user: this.mapToUser(response.user),
      token: response.token,
    };
  }

  async register(
    data: UserRegistration
  ): Promise<{ user: User; token: string }> {
    const response = await this.httpClient.post<{ user: User; token: string }>(
      '/auth/register',
      data,
      false
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
    }

    return {
      user: this.mapToUser(response.user),
      token: response.token,
    };
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post('/auth/logout');
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.httpClient.get<{ user: User }>('/auth/me');
      return this.mapToUser(response.user);
    } catch (error) {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  private mapToUser(user: User): User {
    return {
      ...user,
      createdAt: new Date(user.createdAt),
    };
  }
}
