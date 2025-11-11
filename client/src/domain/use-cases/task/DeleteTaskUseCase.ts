import { ITaskRepository } from '../../repositories/ITaskRepository';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<void> {
    const task = await this.taskRepository.getTaskById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    
    await this.taskRepository.deleteTask(taskId);
  }
}
