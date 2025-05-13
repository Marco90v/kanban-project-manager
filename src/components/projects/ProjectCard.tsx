import { useNavigate } from 'react-router';
import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  Icon, 
  // useDisclosure,
  Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  // IconButton,
  Button,
  Portal,
  Dialog,
  CloseButton
} from '@chakra-ui/react';
import { FolderKanban, MoreVertical, Edit, Trash } from 'lucide-react';
import { formatDate } from '@/utils/helpers';
import { Project } from '@/types';
import ProjectFormModal from '@/components/projects/ProjectFormModal';
// import DeleteConfirmationModal from '../ui/DeleteConfirmationModal';
import { useProjectStore } from '../../store/projectStore';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  const { deleteProject } = useProjectStore();
  // const editModal = useDisclosure();
  // const deleteModal = useDisclosure();
  const [isOpen, setOpen] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // editModal.onOpen();
    setOpen(true);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // await deleteProject(project.id);
    // deleteModal.onClose();
    // console.log("handleDelete");
    setOpenDelete(true);
  };

  return (
    <>
      <Box 
        bg="white" 
        borderRadius="lg" 
        boxShadow="md" 
        p={5}
        cursor="pointer"
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{ 
          transform: 'translateY(-4px)', 
          boxShadow: 'lg',
        }}
        onClick={handleClick}
        position="relative"
      >
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              aria-label="Options"
              variant="ghost"
              size="sm"
              position="absolute"
              top={3}
              right={3}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical size={18} />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content padding={0}>
                <Menu.Item
                  value="new-txt"
                  onClick={handleEdit}
                >
                  <Edit size={16} />Edit Project
                </Menu.Item>
                <Menu.Item
                  value="new-file"
                  color="red.500"
                  onClick={handleDelete}
                >
                  <Trash size={16} />
                  Delete Project
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Flex align="center" mb={3}>
          <Icon as={FolderKanban} color="brand.500" boxSize={6} mr={2} />
          <Heading size="md">{project.name}</Heading>
        </Flex>

        <Text color="gray.600" fontSize="sm" mb={4} >
          {project.description}
        </Text>

        <Text color="gray.500" fontSize="xs">
          Created: {formatDate(project.createdAt)}
        </Text>
      </Box>

      <ProjectFormModal 
        // isOpen={editModal.isOpen} 
        // onClose={editModal.onClose} 
        isOpen={isOpen} 
        onClose={()=>setOpen(false)}
        isCreating={false}
        project={project}
      />

      {/* <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onConfirm={handleDelete}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone, and all associated tasks will be permanently removed."
      /> */}

      <Dialog.Root lazyMount open={isOpenDelete} onOpenChange={()=>setOpenDelete(false)}>
        {/* <Dialog.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Dialog
          </Button>
        </Dialog.Trigger> */}
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete Project</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Are you sure you want to delete this project? This action cannot be undone, and all associated tasks will be permanently removed.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  onClick={async () => {
                    await deleteProject(project.id);
                    setOpenDelete(false);
                  }}
                >Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>



    </>
  );
};

export default ProjectCard;