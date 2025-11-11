import { Task, TaskStatus, isValidTaskStatus } from '../../entities/Task';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class FilterTasksByStatusUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(status: TaskStatus): Promise<Task[]> {
    if (!isValidTaskStatus(status)) {
      throw new Error('Invalid task status');
    }

    return await this.taskRepository.getTasksByStatus(status);
  }
}
