import { Box, Heading, Text, SimpleGrid, Button, Flex } from '@chakra-ui/react';
import { PlusCircle } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import { useModalStore } from '@/store/modalStore';
import { useShallow } from 'zustand/shallow';
import ProjectBodyModal from '@/components/ProjectBodyModal';
import ModalProject from '@/components/ModalProject';
import { useMyStore } from '@/store/store';

const Dashboard = () => {

  const { setModal, setOpen:sOpen, setIsCreating, setType } = useModalStore(
    useShallow( (state => ({
      setModal: state.setModal,
      setOpen: state.setOpen,
      setIsCreating: state.setIsCreating,
      setType: state.setType,
    })))
  );

  const { projects } = useMyStore(
    useShallow( (state => ({
      projects: state.Projects
    })))
  );


  const handleAddProject = () => {
    setModal({
      title: 'Create New Project',
      body: <ProjectBodyModal />,
    });
    setType('project');
    setIsCreating(true);
    sOpen(true);
  };

  // if (isLoading && projects.length === 0) {
  //   // return <LoadingSpinner size="xl" />;
  //   return(
  //     <Container maxW="100vw" h="100vh" p={0} centerContent>
  //       <VStack 
  //         wordSpacing={8}
  //         w={{ base: "90%", md: "450px" }}
  //         justify="center"
  //         h="100%"
  //       >
  //         <Spinner size='xl' />
  //       </VStack>
  //     </Container>
  //   )
  // }

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
          <Heading size="lg" mb={1}>Projects</Heading>
          <Text color="gray.600">Manage your projects and tasks</Text>
        </Box>

        <Button 
          colorScheme="brand" 
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
          bg="white" 
          borderRadius="lg" 
          boxShadow="md"
        >
          <Text mb={4} fontSize="lg">No projects yet. Create your first project to get started!</Text>
          <Button 
            colorScheme="brand" 
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

      <ModalProject />
      
    </Box>
  );
};

export default Dashboard;