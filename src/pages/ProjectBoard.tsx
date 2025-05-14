import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Box, 
  Heading, 
  Flex, 
  Text, 
  Button, 
  // useDisclosure,
  IconButton,
  // Tooltip,
  Container,
  VStack,
  Spinner
} from '@chakra-ui/react';
import { ArrowLeft, Plus, Settings } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import TaskFormModal from '@/components/tasks/TaskFormModal';
import ProjectSettingsModal from '@/components/projects/ProjectSettingsModal';
import { useModalStore } from '@/store/modalStore';
import { useShallow } from 'zustand/shallow';
import TaskBodyModal from '@/components/TaskBodyModal';
import ModalTask from '@/components/ModalTask';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ProjectBoard = () => {

  const { setModal, setOpen:sOpen, setIsCreating } = useModalStore(
    useShallow( (state => ({
      setModal: state.setModal,
      setOpen: state.setOpen,
      setIsCreating: state.setIsCreating,
    })))
  );


  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { 
    projects, 
    currentProject,
    setCurrentProject, 
    fetchTasks,
    fetchBoard,
    isLoading 
  } = useProjectStore();
  
  // const taskModal = useDisclosure();
  // const settingsModal = useDisclosure();

  const [taskModal, setTaskModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    
    // Set current project
    setCurrentProject(projectId);
    
    // Load tasks and board
    fetchTasks(projectId);
    fetchBoard(projectId);
  }, [projectId, setCurrentProject, fetchTasks, fetchBoard]);

  // Navigate back if project doesn't exist
  useEffect(() => {
    if (!isLoading && projects.length > 0 && !projects.find(p => p.id === projectId)) {
      navigate('/dashboard');
    }
  }, [projects, projectId, isLoading, navigate]);

  if (isLoading && !currentProject) {
    // return <LoadingSpinner size="xl" />;
    return(
      <Container maxW="100vw" h="100vh" p={0} centerContent>
        <VStack 
          wordSpacing={8}
          w={{ base: "90%", md: "450px" }}
          justify="center"
          h="100%"
        >
          <Spinner size='xl' />
        </VStack>
      </Container>
    )
  }

  if (!currentProject) {
    return null;
  }

  const addTaks = () => {
    // setTaskModal(true);
    setModal({
      title: 'Create New Project',
      body: <TaskBodyModal />,
      // saveButton: (data:ProjectFormValues) => {console.log('save button clicked', data)}
    });
    setIsCreating(true);
    sOpen(true);
  };

  return (
    <Box p={{ base: 4, md: 6 }} h="full">
      <Flex 
        justifyContent="space-between" 
        alignItems={{ base: 'start', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
        mb={6}
        gap={4}
      >
        <Flex alignItems="center" flexWrap="wrap" gap={2}>
          <IconButton
            // icon={<ArrowLeft size={18} />}
            aria-label="Back to projects"
            variant="ghost"
            mr={2}
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={18} />
          </IconButton>
          <Heading size="lg">{currentProject.name}</Heading>
        </Flex>

        <Flex gap={3}>
          <Button 
            colorScheme="brand" 
            // leftIcon={<Plus size={18} />}
            onClick={addTaks}
          >
            <Plus size={18} />
            Add Task
          </Button>
          
          {/* <Tooltip label="Project settings">
            <IconButton
              icon={<Settings size={18} />}
              aria-label="Project settings"
              variant="ghost"
              onClick={settingsModal.onOpen}
            />
          </Tooltip> */}
        </Flex>
      </Flex>
      
      <Text color="gray.600" mb={6}>{currentProject.description}</Text>
      
      <KanbanBoard projectId={currentProject.id} />
      
      {/* <TaskFormModal 
        isOpen={taskModal}
        onClose={()=>setTaskModal(false)}
        projectId={currentProject.id}
      /> */}
      
      <ProjectSettingsModal 
        isOpen={settingsModal}
        onClose={()=>setSettingsModal(false)}
        project={currentProject}
      />

      <ModalTask />
    </Box>
  );
};

export default ProjectBoard;