import { User, UserRegistration } from '../../entities/User';
import { IAuthRepository } from '../../repositories/IAuthRepository';

export class RegisterUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(
    data: UserRegistration
  ): Promise<{ user: User; token: string }> {
    if (!this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    if (!this.isValidPassword(data.password)) {
      throw new Error('Password must be at least 6 characters');
    }

    if (data.name && !this.isValidName(data.name)) {
      throw new Error('Name must be between 2 and 50 characters');
    }

    return await this.authRepository.register(data);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  private isValidName(name: string): boolean {
    return name.trim().length >= 2 && name.trim().length <= 50;
  }
}
