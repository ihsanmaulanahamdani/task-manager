import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskStatus,
} from '../../domain/entities/Task';
import { HttpClient } from '../api/HttpClient';

export class TaskRepository implements ITaskRepository {
  constructor(private httpClient: HttpClient) {}

  async getTasks(): Promise<Task[]> {
    const response = await this.httpClient.get<{ tasks: Task[] }>('/tasks');
    return response.tasks.map(this.mapToTask);
  }

  async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
    const response = await this.httpClient.get<{ tasks: Task[] }>(
      `/tasks?status=${encodeURIComponent(status)}`
    );
    return response.tasks.map(this.mapToTask);
  }

  async getTaskById(id: string): Promise<Task | null> {
    try {
      const response = await this.httpClient.get<{ task: Task }>(
        `/tasks/${id}`
      );
      return this.mapToTask(response.task);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const response = await this.httpClient.post<{ task: Task }>('/tasks', task);
    return this.mapToTask(response.task);
  }

  async updateTask(task: UpdateTaskDto): Promise<Task> {
    const response = await this.httpClient.put<{ task: Task }>(
      `/tasks/${task.id}`,
      task
    );
    return this.mapToTask(response.task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.httpClient.delete(`/tasks/${id}`);
  }

  private mapToTask(task: Task): Task {
    return {
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    };
  }
}
