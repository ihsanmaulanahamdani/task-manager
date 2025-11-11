import { User, UserCredentials } from '../../entities/User';
import { IAuthRepository } from '../../repositories/IAuthRepository';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(
    credentials: UserCredentials
  ): Promise<{ user: User; token: string }> {
    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Invalid email format');
    }

    if (!this.isValidPassword(credentials.password)) {
      throw new Error('Password must be at least 6 characters');
    }

    return await this.authRepository.login(credentials);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 6;
  }
}
