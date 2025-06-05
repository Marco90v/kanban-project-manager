import React, { memo, useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from '@/components/tasks/TaskCard';
import { Task } from '@/types';
import { useDraggable } from '@dnd-kit/core';

interface DraggableTaskCardProps {
  task: Task;
}

const DraggableTaskCard = memo (({ task }: DraggableTaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id:task.id || self.crypto.randomUUID(),
    data: task
  });

  const style:React.CSSProperties = useMemo(() => {
    return {
      transform: CSS.Transform.toString(!transform ? null : {x:transform?.x || 0, y:transform?.y || 0, scaleX:1.02, scaleY:1}),
      opacity: isDragging ? 0.8 : 1,
      cursor: 'grab',
      boxShadow: isDragging ? '0px 8px 16px rgba(24, 24, 27, 0.01), 0px 0px 1px rgba(24, 24, 27, 0.3)' : '0px 2px 4px rgba(24, 24, 27, 0.1), 0px 0px 1px rgba(24, 24, 27, 0.3)', 
      borderRadius: '0.375rem',
      zIndex: isDragging ? 500 : 0,
      transition: isDragging ? "none" : "transform 200ms ease",
    };
  }, [transform, isDragging]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task}  />
    </div>
  );
});

export default DraggableTaskCard;