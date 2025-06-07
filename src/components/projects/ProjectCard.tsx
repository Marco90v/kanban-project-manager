import { useNavigate } from 'react-router';
import { Box, Heading, Text, Flex, Icon, Menu,Button,Portal } from '@chakra-ui/react';
import { FolderKanban, MoreVertical, Edit, Trash } from 'lucide-react';
import { formatDate } from '@/utils/helpers';
import { Project } from '@/types';
import { useModalStore } from '@/store/modalStore';
import { useShallow } from 'zustand/shallow';
import ProjectBodyModal from '../ProjectBodyModal';
import { colors } from '@/utils/const';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {

  const navigate = useNavigate();

  const { setModal, setOpen:sOpen, setId, setType } = useModalStore(
    useShallow( (state => ({
      setModal: state.setModal,
      setOpen: state.setOpen,
      setId: state.setId,
      setIsCreating: state.setIsCreating,
      setType: state.setType,
    })))
  );

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModal({
      title: 'Edit Project',
      body: <ProjectBodyModal project={project} />,
    })
    sOpen(true);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if(project.id){
      setModal({
        title: 'Delete Project',
        body: <ProjectBodyModal  />,
      });
      setType('project');
      setId(project.id);
      sOpen(true);
    }
  };

  return (
    <>
      <Box 
        bg={{base:"white", _dark:colors.bgCard}}
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
          <Icon as={FolderKanban} color={colors.brand500} boxSize={6} mr={2} />
          <Heading size="md">{project.name}</Heading>
        </Flex>

        <Text color={{base:"gray.600", _dark:"gray.400"}} fontSize="sm" mb={4} >
          {project.description}
        </Text>

        <Text color="gray.500" fontSize="xs">
          Created: {project?.createdAt && formatDate(project?.createdAt) }
        </Text>
      </Box>

    </>
  );
};

export default ProjectCard;