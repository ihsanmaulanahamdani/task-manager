import {
  Task,
  UpdateTaskDto,
  isValidTaskTitle,
  isValidTaskDescription,
} from '../../entities/Task';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: UpdateTaskDto): Promise<Task> {
    if (data.title !== undefined && !isValidTaskTitle(data.title)) {
      throw new Error('Task title must be between 3 and 100 characters');
    }

    if (
      data.description !== undefined &&
      !isValidTaskDescription(data.description)
    ) {
      throw new Error('Task description must not exceed 500 characters');
    }

    return await this.taskRepository.updateTask(data);
  }
}
