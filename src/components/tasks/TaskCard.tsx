import { Box, Heading, Text, Flex, Badge, Menu, IconButton, Button, Portal, useDisclosure } from '@chakra-ui/react';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { memo } from 'react';
import { colors } from '@/utils/const';
import TaskDialog from '@/components/tasks/TaskDialog';
import TaskDelete from '@/components/tasks/TaskDelete';
import { TaskFormValues } from '@/types';

interface TaskCardProps {
  task: TaskFormValues;
}

const TaskCard = memo(({ task }: TaskCardProps) => {

  const {open:openEdit, onToggle:onToggleEdit} = useDisclosure();
  const {open:openDelete, onToggle:onToggleDelete} = useDisclosure();

  const handleEditClick = () => {
    onToggleEdit();
  };
  
  const handleDelete = async () => {
    onToggleDelete();
  };

  return (
    <>
      <Box
        bg={{base:"white", _dark:colors.bgDark}}
        borderRadius="md"
        p={4}
        mb={3}
        transition="all 0.2s"
        cursor="grab"
        position="relative"
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
          <Text fontSize="sm" color="gray.600" mb={3} >
            {task.description}
          </Text>
        )}

        <Flex justify="space-between" alignItems="center">
          <Badge 
            colorPalette={
              task.priority[0] === 'high' ? 'red' : 
              task.priority[0] === 'medium' ? 'orange' : 
              'green'
            }
            variant="subtle"
            px={2}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
          >
            {task.priority[0].charAt(0).toUpperCase() + task.priority[0].slice(1)}
          </Badge>

          {task.assignee && (
            <Text fontSize="xs" color="gray.500">
              {task.assignee}
            </Text>
          )}
        </Flex>

        {/* Dialog */}
        <TaskDialog open={openEdit} onToggle={onToggleEdit} task={task} /> 
        <TaskDelete open={openDelete} onToggle={onToggleDelete} task={task} /> 
      </Box>
    </>
  );
});

export default TaskCard;