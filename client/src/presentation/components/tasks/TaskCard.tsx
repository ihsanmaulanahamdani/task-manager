'use client';

import { Task } from '@/domain/entities/Task';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const statusLabel = () => {
    switch (task.status) {
      case 'to_do':
        return 'To Do';
      case 'in_progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return '';
    }
  };

  const statusColors = {
    to_do: 'bg-gray-200 text-gray-800',
    in_progress: 'bg-yellow-200 text-yellow-800',
    done: 'bg-green-200 text-green-800',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[task.status]
          }`}
        >
          {statusLabel()}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="text-xs text-gray-500 mb-4">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
