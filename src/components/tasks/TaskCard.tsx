import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Menu,
  // MenuButton,
  // MenuList,
  MenuItem,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import { Task } from '../../types';
import { getPriorityColor } from '../../utils/helpers';
import { useProjectStore } from '../../store/projectStore';
import TaskFormModal from './TaskFormModal';
import { useState } from 'react';
// import DeleteConfirmationModal from '../ui/DeleteConfirmationModal';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const TaskCard = ({ task, isDragging = false }: TaskCardProps) => {
  const { deleteTask } = useProjectStore();
  // const editModal = useDisclosure();
  // const deleteModal = useDisclosure();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleEditClick = () => {
    setEditModal(true);
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    // deleteModal.onClose();
    setDeleteModal(false);
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
        {/* <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MoreVertical size={16} />}
            variant="ghost"
            size="xs"
            position="absolute"
            top={2}
            right={2}
            zIndex={2}
          />
          <MenuList onClick={(e) => e.stopPropagation()}>
            <MenuItem 
              icon={<Edit size={14} />} 
              onClick={editModal.onOpen}
            >
              Edit Task
            </MenuItem>
            <MenuItem 
              icon={<Trash size={14} />} 
              color="red.500"
              onClick={deleteModal.onOpen}
            >
              Delete Task
            </MenuItem>
          </MenuList>
        </Menu> */}

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
              task.priority === 'high' ? 'red' : 
              task.priority === 'medium' ? 'orange' : 
              'green'
            }
            variant="subtle"
            px={2}
            py={1}
            borderRadius="full"
            fontSize="xs"
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>

          {task.assignee && (
            <Text fontSize="xs" color="gray.500">
              {task.assignee}
            </Text>
          )}
        </Flex>
      </Box>

      <TaskFormModal 
        isOpen={editModal} 
        onClose={()=>setEditModal(false)}
        projectId={task.projectId}
        task={task}
      />

      {/* <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onConfirm={handleDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
      /> */}
    </>
  );
};

export default TaskCard;