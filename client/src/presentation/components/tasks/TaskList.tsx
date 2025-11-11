'use client';

import { Task, TaskStatus } from '@/domain/entities/Task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  filterStatus?: TaskStatus | 'all';
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  filterStatus = 'all',
}: TaskListProps) {
  const filteredTasks =
    filterStatus === 'all'
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tasks found. Create your first task!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
