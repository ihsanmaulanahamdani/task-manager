import {
  Task,
  CreateTaskDto,
  isValidTaskTitle,
  isValidTaskDescription,
} from '../../entities/Task';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: CreateTaskDto): Promise<Task> {
    if (!isValidTaskTitle(data.title)) {
      throw new Error('Task title must be between 3 and 100 characters');
    }

    if (!isValidTaskDescription(data.description)) {
      throw new Error('Task description must not exceed 500 characters');
    }

    return await this.taskRepository.createTask(data);
  }
}
