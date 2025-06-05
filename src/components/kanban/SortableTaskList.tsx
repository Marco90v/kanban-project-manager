import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Task } from '../../types';
import DraggableTaskCard from './DraggableTaskCard';
import { Items } from 'node_modules/@chakra-ui/react/dist/types/components/pagination/namespace';

interface SortableTaskListProps {
  id: string;
  items: Task[];
}

const SortableTaskList = ({ id, items }: SortableTaskListProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: Items
  });

  return (
    // <SortableContext
    //   id={id}
    //   items={items}
    //   strategy={verticalListSortingStrategy}
    // >
      <div ref={setNodeRef} {...listeners} {...attributes}>
        {items.map((task) => (
          <DraggableTaskCard key={task.id} task={task} />
        ))}
      </div>
    // </SortableContext>
  );
};

export default SortableTaskList;