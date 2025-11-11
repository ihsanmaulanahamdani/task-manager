import { LoginUseCase } from '@/domain/use-cases/auth/LoginUseCase';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { User, UserCredentials } from '@/domain/entities/User';

class MockAuthRepository implements IAuthRepository {
  async login(
    credentials: UserCredentials
  ): Promise<{ user: User; token: string }> {
    return {
      user: {
        id: '1',
        email: credentials.email,
        name: 'Test User',
        createdAt: new Date(),
      },
      token: 'mock-token',
    };
  }

  async register(): Promise<{ user: User; token: string }> {
    throw new Error('Not implemented');
  }

  async logout(): Promise<void> {}

  async getCurrentUser(): Promise<User | null> {
    return null;
  }

  async isAuthenticated(): Promise<boolean> {
    return false;
  }
}

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let repository: IAuthRepository;

  beforeEach(() => {
    repository = new MockAuthRepository();
    useCase = new LoginUseCase(repository);
  });

  it('should login with valid credentials', async () => {
    const credentials: UserCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await useCase.execute(credentials);

    expect(result.user.email).toBe('test@example.com');
    expect(result.token).toBe('mock-token');
  });

  it('should throw error for invalid email format', async () => {
    const credentials: UserCredentials = {
      email: 'invalid-email',
      password: 'password123',
    };

    await expect(useCase.execute(credentials)).rejects.toThrow(
      'Invalid email format'
    );
  });

  it('should throw error for password too short', async () => {
    const credentials: UserCredentials = {
      email: 'test@example.com',
      password: '12345',
    };

    await expect(useCase.execute(credentials)).rejects.toThrow(
      'Password must be at least 6 characters'
    );
  });

  it('should accept valid email formats', async () => {
    const validEmails = [
      'test@example.com',
      'user.name@example.co.uk',
      'user+tag@example.com',
    ];

    for (const email of validEmails) {
      const credentials: UserCredentials = {
        email,
        password: 'password123',
      };

      const result = await useCase.execute(credentials);
      expect(result.user.email).toBe(email);
    }
  });
});
