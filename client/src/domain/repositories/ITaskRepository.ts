import { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from '../entities/Task';

export interface ITaskRepository {
  getTasks(): Promise<Task[]>;
  getTasksByStatus(status: TaskStatus): Promise<Task[]>;
  getTaskById(id: string): Promise<Task | null>;
  createTask(task: CreateTaskDto): Promise<Task>;
  updateTask(task: UpdateTaskDto): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
