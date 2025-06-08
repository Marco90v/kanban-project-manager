import { Box, Heading, Text, SimpleGrid, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { PlusCircle } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import { useShallow } from 'zustand/shallow';
import { useMyStore } from '@/store/store';
import { colors } from '@/utils/const';
import ProjectDialog from '@/components/projects/ProjectDialog';

const Dashboard = () => {

  const { projects } = useMyStore(
    useShallow( (state => ({
      projects: state.Projects
    })))
  );

  const {open, onToggle} = useDisclosure();

  const handleAddProject = () => onToggle();

  return (
    <Box p={{ base: 4, md: 6 }}>
      <Flex 
        justifyContent="space-between" 
        alignItems={{ base: 'start', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
        mb={6}
        gap={4}
      >
        <Box>
          <Heading size="4xl" fontWeight={600} mb={1}>Projects</Heading>
          <Text color="gray.600">Manage your projects and tasks</Text>
        </Box>

        <Button 
          bg={colors.brand500}
          color="white"
          fontWeight="bold"
          onClick={handleAddProject}
        >
          <PlusCircle size={18} />
          New Project
        </Button>
      </Flex>

      {projects.length === 0 ? (
        <Box 
          p={8} 
          textAlign="center" 
          bg={{base:"white", _dark:colors.bgDark}}
          borderRadius="lg" 
          boxShadow="md"
        >
          <Text mb={4} fontSize="lg">No projects yet. Create your first project to get started!</Text>
          <Button 
            bg={colors.brand500}
            fontWeight="bold"
            onClick={handleAddProject}
          >
            Create Project
          </Button>
        </Box>
      ) : (
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          gap={6}
        >
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      )}

      <ProjectDialog open={open} onToggle={onToggle} isCreating={true} />
      
    </Box>
  );
};

export default Dashboard;