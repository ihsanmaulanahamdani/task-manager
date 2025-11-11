export type TaskStatus = 'to_do' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskDto {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export function isValidTaskTitle(title: string): boolean {
  return title.trim().length >= 3 && title.trim().length <= 100;
}

export function isValidTaskDescription(description: string): boolean {
  return description.trim().length <= 500;
}

export function isValidTaskStatus(status: string): status is TaskStatus {
  return ['to_do', 'in_progress', 'done'].includes(status);
}
