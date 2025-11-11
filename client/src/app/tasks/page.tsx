'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/providers/AuthProvider';
import { useTasks } from '@/presentation/hooks/useTasks';
import { Task, TaskStatus } from '@/domain/entities/Task';
import { LoadingSpinner } from '@/presentation/components/common/LoadingSpinner';
import { Button } from '@/presentation/components/common/Button';
import { TaskList } from '@/presentation/components/tasks/TaskList';
import { TaskForm } from '@/presentation/components/tasks/TaskForm';
import { TaskFilter } from '@/presentation/components/tasks/TaskFilter';

export default function TasksPage() {
  const router = useRouter();
  const { user, logout, loading: authLoading } = useAuth();
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    getTaskCounts,
  } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  if (!authLoading && !user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSubmitTask = async (data: {
    title: string;
    description: string;
    status: TaskStatus;
  }) => {
    if (editingTask) {
      await updateTask({ id: editingTask.id, ...data });
    } else {
      await createTask(data);
    }
    setShowForm(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {user?.name || user?.email}
              </p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TaskFilter
            currentFilter={filterStatus}
            onFilterChange={setFilterStatus}
            taskCounts={getTaskCounts()}
          />
          <Button onClick={handleCreateTask}>+ New Task</Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          filterStatus={filterStatus}
        />
      </main>
    </div>
  );
}
