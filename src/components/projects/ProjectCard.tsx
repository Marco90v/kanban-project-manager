import { useNavigate } from 'react-router';
import { Box, Heading, Text, Flex, Icon, Menu,Button,Portal, useDisclosure } from '@chakra-ui/react';
import { FolderKanban, MoreVertical, Edit, Trash } from 'lucide-react';
import { formatDate } from '@/utils/helpers';
import { colors } from '@/utils/const';
import { ProjectFormValues } from '@/types';
import ProjectDialog from '@/components/projects/ProjectDialog';
import ProjectDelete from '@/components/projects/ProjectDelete';

interface ProjectCardProps {
  project: ProjectFormValues;
}

const ProjectCard = ({ project }: ProjectCardProps) => {

  const navigate = useNavigate();

  const {open:openEdit, onToggle:onToggleEdit} = useDisclosure();
  const {open:openDelete, onToggle:onToggleDelete} = useDisclosure();

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleEdit();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleDelete();
  };

  return (
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

      <ProjectDialog open={openEdit} onToggle={onToggleEdit} isCreating={false} project={project} />
      <ProjectDelete open={openDelete} onToggle={onToggleDelete} project={project} />
    </Box>
  );
};

export default ProjectCard;