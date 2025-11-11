import { CreateTaskUseCase } from '@/domain/use-cases/task/CreateTaskUseCase';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import { Task, CreateTaskDto } from '@/domain/entities/Task';

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

  async createTask(task: CreateTaskDto): Promise<Task> {
    return {
      id: '1',
      ...task,
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async updateTask(): Promise<Task> {
    throw new Error('Not implemented');
  }

  async deleteTask(): Promise<void> {}
}

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let repository: ITaskRepository;

  beforeEach(() => {
    repository = new MockTaskRepository();
    useCase = new CreateTaskUseCase(repository);
  });

  it('should create a task with valid data', async () => {
    const taskData: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'to_do',
    };

    const result = await useCase.execute(taskData);

    expect(result).toBeDefined();
    expect(result.title).toBe('Test Task');
    expect(result.description).toBe('Test Description');
    expect(result.status).toBe('to_do');
  });

  it('should throw error for invalid title (too short)', async () => {
    const taskData: CreateTaskDto = {
      title: 'ab',
      description: 'Test Description',
      status: 'to_do',
    };

    await expect(useCase.execute(taskData)).rejects.toThrow(
      'Task title must be between 3 and 100 characters'
    );
  });

  it('should throw error for invalid title (too long)', async () => {
    const taskData: CreateTaskDto = {
      title: 'a'.repeat(101),
      description: 'Test Description',
      status: 'to_do',
    };

    await expect(useCase.execute(taskData)).rejects.toThrow(
      'Task title must be between 3 and 100 characters'
    );
  });

  it('should throw error for invalid description (too long)', async () => {
    const taskData: CreateTaskDto = {
      title: 'Test Task',
      description: 'a'.repeat(501),
      status: 'to_do',
    };

    await expect(useCase.execute(taskData)).rejects.toThrow(
      'Task description must not exceed 500 characters'
    );
  });

  it('should accept valid task with minimum title length', async () => {
    const taskData: CreateTaskDto = {
      title: 'abc',
      description: 'Test Description',
      status: 'to_do',
    };

    const result = await useCase.execute(taskData);
    expect(result.title).toBe('abc');
  });

  it('should accept all valid statuses', async () => {
    const statuses: Array<'to_do' | 'in_progress' | 'done'> = [
      'to_do',
      'in_progress',
      'done',
    ];

    for (const status of statuses) {
      const taskData: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status,
      };

      const result = await useCase.execute(taskData);
      expect(result.status).toBe(status);
    }
  });
});
