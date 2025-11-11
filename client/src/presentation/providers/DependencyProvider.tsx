'use client';

import { createContext, useContext, ReactNode } from 'react';
import { HttpClient } from '@/data/api/HttpClient';
import { TaskRepository } from '@/data/repositories/TaskRepository';
import { AuthRepository } from '@/data/repositories/AuthRepository';

// Task Use Cases
import { CreateTaskUseCase } from '@/domain/use-cases/task/CreateTaskUseCase';
import { UpdateTaskUseCase } from '@/domain/use-cases/task/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '@/domain/use-cases/task/DeleteTaskUseCase';
import { GetTasksUseCase } from '@/domain/use-cases/task/GetTasksUseCase';
import { FilterTasksByStatusUseCase } from '@/domain/use-cases/task/FilterTasksByStatusUseCase';

// Auth Use Cases
import { LoginUseCase } from '@/domain/use-cases/auth/LoginUseCase';
import { RegisterUseCase } from '@/domain/use-cases/auth/RegisterUseCase';
import { LogoutUseCase } from '@/domain/use-cases/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '@/domain/use-cases/auth/GetCurrentUserUseCase';

interface UseCases {
  // Task use cases
  createTask: CreateTaskUseCase;
  updateTask: UpdateTaskUseCase;
  deleteTask: DeleteTaskUseCase;
  getTasks: GetTasksUseCase;
  filterTasksByStatus: FilterTasksByStatusUseCase;

  // Auth use cases
  login: LoginUseCase;
  register: RegisterUseCase;
  logout: LogoutUseCase;
  getCurrentUser: GetCurrentUserUseCase;
}

const DependencyContext = createContext<UseCases | null>(null);

export function DependencyProvider({ children }: { children: ReactNode }) {
  const httpClient = new HttpClient();
  
  const taskRepository = new TaskRepository(httpClient);
  const authRepository = new AuthRepository(httpClient);

  const useCases: UseCases = {
    // Task use cases
    createTask: new CreateTaskUseCase(taskRepository),
    updateTask: new UpdateTaskUseCase(taskRepository),
    deleteTask: new DeleteTaskUseCase(taskRepository),
    getTasks: new GetTasksUseCase(taskRepository),
    filterTasksByStatus: new FilterTasksByStatusUseCase(taskRepository),

    // Auth use cases
    login: new LoginUseCase(authRepository),
    register: new RegisterUseCase(authRepository),
    logout: new LogoutUseCase(authRepository),
    getCurrentUser: new GetCurrentUserUseCase(authRepository),
  };

  return (
    <DependencyContext.Provider value={useCases}>
      {children}
    </DependencyContext.Provider>
  );
}

export function useUseCases(): UseCases {
  const context = useContext(DependencyContext);
  if (!context) {
    throw new Error('useUseCases must be used within a DependencyProvider');
  }
  return context;
}
