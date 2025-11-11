import { UpdateTaskUseCase } from '@/domain/use-cases/task/UpdateTaskUseCase';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { Task, UpdateTaskDto } from '@/domain/entities/Task';

class MockTaskRepository implements ITaskRepository {
  async getTasks(): Promise<Task[]> {
    return [];
  }

  async getTasksByStatus(): Promise<Task[]> {
    return [];
  }

  async getTaskById(): Promise<Task | null> {
    return null;
  }

  async createTask(): Promise<Task> {
    throw new Error('Not implemented');
  }

  async updateTask(data: UpdateTaskDto): Promise<Task> {
    return {
      id: data.id,
      title: data.title || 'Original Title',
      description: data.description || 'Original Description',
      status: data.status || 'to_do',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async deleteTask(): Promise<void> {}
}

describe('UpdateTaskUseCase', () => {
  let useCase: UpdateTaskUseCase;
  let repository: ITaskRepository;

  beforeEach(() => {
    repository = new MockTaskRepository();
    useCase = new UpdateTaskUseCase(repository);
  });

  it('should update task with valid data', async () => {
    const updateData: UpdateTaskDto = {
      id: '1',
      title: 'Updated Title',
      description: 'Updated Description',
      status: 'in_progress',
    };

    const result = await useCase.execute(updateData);

    expect(result.title).toBe('Updated Title');
    expect(result.description).toBe('Updated Description');
    expect(result.status).toBe('in_progress');
  });

  it('should throw error for invalid title when updating', async () => {
    const updateData: UpdateTaskDto = {
      id: '1',
      title: 'ab',
    };

    await expect(useCase.execute(updateData)).rejects.toThrow(
      'Task title must be between 3 and 100 characters'
    );
  });

  it('should throw error for invalid description when updating', async () => {
    const updateData: UpdateTaskDto = {
      id: '1',
      description: 'a'.repeat(501),
    };

    await expect(useCase.execute(updateData)).rejects.toThrow(
      'Task description must not exceed 500 characters'
    );
  });

  it('should allow partial updates', async () => {
    const updateData: UpdateTaskDto = {
      id: '1',
      status: 'done',
    };

    const result = await useCase.execute(updateData);
    expect(result.status).toBe('done');
  });
});
