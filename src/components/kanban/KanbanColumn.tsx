import {
  Box,
  Heading,
  Text,
  Badge,
} from '@chakra-ui/react';
import { 
  // DndContext, 
  // DragEndEvent,
  // MouseSensor,
  // TouchSensor,
  useDroppable,
  // useSensor,
  // useSensors
} from '@dnd-kit/core';
import { Column } from '../../types';
// import { useProjectStore } from '../../store/projectStore';
// import SortableTaskList from './SortableTaskList';
import { Flex } from '@chakra-ui/react';
import DraggableTaskCard from './DraggableTaskCard';
import { memo } from 'react';
import { colors } from '@/utils/const';

interface KanbanColumnProps {
  column: Column;
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

const KanbanColumn = memo(({ column }: KanbanColumnProps) => {

  const {isOver, setNodeRef} = useDroppable({
    id: column.id,
    // data: column,
  });

  const colorScheme = getColumnColor(column.id);

  return (
    <Box 
      bg={isOver ? "green.50" : "white"} 
      _dark={{bg:isOver ? "green.950/30" : colors.bgCard}}
      borderRadius="md"
      // h="full"
      display="flex"
      flexDirection="column"
    >
      <Box 
        p={4} 
        borderTopRadius="md"
        bg={{base:"white", _dark:colors.bgCard}}
        borderBottomWidth="1px"
        borderBottomColor={{base:"gray.200", _dark:"gray.700"}}
      >
        <Flex alignItems="center">
          <Heading fontWeight={"bold"} size="sm" color={`${colorScheme}.600`}>
            {column.title}
          </Heading>
          <Badge 
            ml={2} 
            colorPalette={colorScheme}
            borderRadius="full"
          >
            {column.tasks.length}
          </Badge>
        </Flex>
      </Box>

      <Box 
        p={3} 
        flex="1" 
        // overflowY="auto"
        // maxH={{ base: 'auto', md: 'calc(100vh - 240px)' }}
      >
        <div ref={setNodeRef} style={{height:'100%'}}>
          {column.tasks.map(task => (
            <DraggableTaskCard key={task.id} task={task} />
          ))}
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
        </div>
      </Box>
    </Box>
  );
});

export default KanbanColumn;