'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Task,
  TaskStatus,
  CreateTaskDto,
  UpdateTaskDto,
} from '@/domain/entities/Task';
import { useUseCases } from '../providers/DependencyProvider';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useCases = useUseCases();

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await useCases.getTasks.execute();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [useCases]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (data: CreateTaskDto): Promise<Task> => {
    const newTask = await useCases.createTask.execute(data);
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = async (data: UpdateTaskDto): Promise<Task> => {
    const updatedTask = await useCases.updateTask.execute(data);
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    return updatedTask;
  };

  const deleteTask = async (id: string): Promise<void> => {
    await useCases.deleteTask.execute(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filterByStatus = (status: TaskStatus | 'all'): Task[] => {
    if (status === 'all') return tasks;
    return tasks.filter((task) => task.status === status);
  };

  const getTaskCounts = () => {
    return {
      all: tasks.length,
      to_do: tasks.filter((t) => t.status === 'to_do').length,
      in_progress: tasks.filter((t) => t.status === 'in_progress').length,
      done: tasks.filter((t) => t.status === 'done').length,
    };
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    filterByStatus,
    getTaskCounts,
    refreshTasks: loadTasks,
  };
}
