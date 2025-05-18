import { Box, Heading, Text, Flex, Badge, Menu, IconButton, Button, Portal } from '@chakra-ui/react';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { Task } from '../../types';
import { useModalStore } from '@/store/modalStore';
import { useShallow } from 'zustand/shallow';
import TaskBodyModal from '@/components/TaskBodyModal';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const TaskCard = ({ task, isDragging = false }: TaskCardProps) => {
  const { setModal, setOpen:sOpen, setId, setType } = useModalStore(
    useShallow( (state => ({
      setModal: state.setModal,
      setOpen: state.setOpen,
      setId: state.setId,
      setType: state.setType,
    })))
  );

  const handleEditClick = () => {
    setModal({
      title: 'Edit Task',
      body: <TaskBodyModal task={task} />,
    });
    setType('task');
    sOpen(true);
  };
  
  const handleDelete = async () => {
    setModal({
      title: 'Delete Task',
      body: <TaskBodyModal task={task} />,
    });
    setId(task.id);
    setType('task');
    sOpen(true);
  };

  // const priorityColor = getPriorityColor(task.priority);

  return (
    <>
      <Box
        bg="white"
        borderRadius="md"
        boxShadow={isDragging ? 'lg' : 'sm'}
        p={4}
        mb={3}
        opacity={isDragging ? 0.8 : 1}
        transform={isDragging ? 'scale(1.02)' : 'scale(1)'}
        transition="all 0.2s"
        cursor="grab"
        position="relative"
        _hover={{ boxShadow: 'md' }}
      >
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button 
              as={IconButton}
              aria-label="Options"
              variant="ghost"
              size="xs"
              position="absolute"
              top={2}
              right={2}
              zIndex={2}
            >
              <MoreVertical size={16} />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content >
                <Menu.Item
                  value="new-txt"
                  onClick={handleEditClick}
                >
                  <Edit size={14} />
                  Edit Task
                </Menu.Item>
                <Menu.Item
                  value="new-file"
                  color="red.500"
                  onClick={handleDelete}
                >
                  <Trash size={14} />
                  Delete Task
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Heading size="sm" mb={2} pr={6} >
          {task.title}
        </Heading>

        {task.description && (
          // noOfLines={2}
          <Text fontSize="sm" color="gray.600" mb={3} >
            {task.description}
          </Text>
        )}

        <Flex justify="space-between" alignItems="center">
          <Badge 
            colorScheme={
              task.priority[0] === 'high' ? 'red' : 
              task.priority[0] === 'medium' ? 'orange' : 
              'green'
            }
            variant="subtle"
            px={2}
            py={1}
            borderRadius="full"
            fontSize="xs"
          >
            {task.priority[0].charAt(0).toUpperCase() + task.priority[0].slice(1)}
          </Badge>

          {task.assignee && (
            <Text fontSize="xs" color="gray.500">
              {task.assignee}
            </Text>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default TaskCard;