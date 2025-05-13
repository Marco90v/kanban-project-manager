import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Task } from '../../types';
import DraggableTaskCard from './DraggableTaskCard';

interface SortableTaskListProps {
  id: string;
  items: Task[];
}

const SortableTaskList = ({ id, items }: SortableTaskListProps) => {
  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}>
        {items.map((task) => (
          <DraggableTaskCard key={task.id} task={task} />
        ))}
      </div>
    </SortableContext>
  );
};

export default SortableTaskList;