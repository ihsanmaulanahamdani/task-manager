export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  name?: string;
}
