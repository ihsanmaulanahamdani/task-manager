'use client';

import { TaskStatus } from '@/domain/entities/Task';
import { Button } from '../common/Button';

interface TaskFilterProps {
  currentFilter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
  taskCounts: {
    all: number;
    to_do: number;
    in_progress: number;
    done: number;
  };
}

export function TaskFilter({
  currentFilter,
  onFilterChange,
  taskCounts,
}: TaskFilterProps) {
  const filters: Array<{ label: string; value: TaskStatus | 'all' }> = [
    { label: `All (${taskCounts.all})`, value: 'all' },
    { label: `To Do (${taskCounts.to_do})`, value: 'to_do' },
    { label: `In Progress (${taskCounts.in_progress})`, value: 'in_progress' },
    { label: `Done (${taskCounts.done})`, value: 'done' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
