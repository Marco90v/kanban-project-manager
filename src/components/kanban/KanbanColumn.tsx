import {
  Box,
  Heading,
  Text,
  Badge,
} from '@chakra-ui/react';
import { 
  DndContext, 
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Column } from '../../types';
import { useProjectStore } from '../../store/projectStore';
import SortableTaskList from './SortableTaskList';

interface KanbanColumnProps {
  column: Column;
  projectId: string;
}

const getColumnColor = (columnId: string) => {
  switch (columnId) {
    case 'todo':
      return 'blue';
    case 'in-progress':
      return 'orange';
    case 'done':
      return 'green';
    default:
      return 'gray';
  }
};

const KanbanColumn = ({ column, projectId }: KanbanColumnProps) => {
  const { moveTask } = useProjectStore();
  const colorScheme = getColumnColor(column.id);

  // Configure sensors for drag detection
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // 5px movement before drag starts
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // 250ms delay on touch devices
      tolerance: 5, // 5px movement allowed during delay
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const sourceColumn = column.id;
      const destinationColumn = over.id as string;
      
      moveTask(taskId, sourceColumn, destinationColumn);
    }
  };

  return (
    <Box 
      bg="gray.50" 
      borderRadius="md"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Box 
        p={4} 
        borderTopRadius="md"
        bg="white"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <Flex alignItems="center">
          <Heading size="sm" color={`${colorScheme}.600`}>
            {column.title}
          </Heading>
          <Badge 
            ml={2} 
            colorScheme={colorScheme}
            borderRadius="full"
          >
            {column.tasks.length}
          </Badge>
        </Flex>
      </Box>

      <Box 
        p={3} 
        flex="1" 
        overflowY="auto"
        maxH={{ base: 'auto', md: 'calc(100vh - 240px)' }}
      >
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <SortableTaskList 
            id={column.id}
            items={column.tasks}
          />
        </DndContext>
        
        {column.tasks.length === 0 && (
          <Box 
            py={4} 
            px={2} 
            textAlign="center" 
            color="gray.400"
            border="2px dashed"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Text fontSize="sm">Drop tasks here</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

import { Flex } from '@chakra-ui/react';

export default KanbanColumn;