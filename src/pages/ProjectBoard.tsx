import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Box, Heading, Flex, Text, Button, IconButton,Container,VStack, Spinner } from '@chakra-ui/react';
import { ArrowLeft, Plus, Settings } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import ProjectSettingsModal from '@/components/projects/ProjectSettingsModal';
import { useModalStore } from '@/store/modalStore';
import { useShallow } from 'zustand/shallow';
import TaskBodyModal from '@/components/TaskBodyModal';
import ModalTask from '@/components/ModalTask';
import { Tooltip } from '@/components/ui/tooltip';
import ModalProject from '@/components/ModalProject';
import Board from '@/components/Board';
import { useMyStore } from '@/store/store';
import { ProjectFormValues } from '@/schema/schema';

const ProjectBoard = () => {

  const { setModal, setOpen:sOpen, setIsCreating, setId, setType, type } = useModalStore(
    useShallow( (state => ({
      setModal: state.setModal,
      setOpen: state.setOpen,
      setIsCreating: state.setIsCreating,
      setId: state.setId,
      setType: state.setType,
      type: state.type,
    })))
  );

  const { projects } = useMyStore(
    useShallow( (state => ({
      projects: state.Projects
    })))
  );

  const { currentProject, isLoading } = useProjectStore(
    useShallow( (state => ({
      currentProject: state.currentProject,
      isLoading: state.isLoading,
    })))
  );
  
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectFormValues | undefined>(undefined);

  useEffect(() => {
    const p = projects.find(p => p.id === projectId);
    setProject(p);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const [settingsModal, setSettingsModal] = useState(false);

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

  const addTaks = () => {
    if(project){
      setModal({
        title: 'Create New Project',
        body: <TaskBodyModal />,
      });
      setType('task');
      setId(project?.id);
      setIsCreating(true);
      sOpen(true);
    }
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
          <Heading size="lg">{project?.name}</Heading>
        </Flex>

        <Flex gap={3}>
          <Button colorScheme="brand" onClick={addTaks}>
            <Plus size={18} />
            Add Task
          </Button>
          <Tooltip content="Project settings">
            <IconButton
              aria-label="Project settings"
              variant="ghost"
              size="sm"
              onClick={() => setSettingsModal(true)}
            >
              <Settings size={18} />
            </IconButton>
          </Tooltip>
          
        </Flex>
      </Flex>
      
      <Text color="gray.600" mb={6}>{project?.description}</Text>
      
      {/* <KanbanBoard projectId={project?.id} /> */}
      <Board projectId={project?.id} />
            
      {project && <ProjectSettingsModal 
        isOpen={settingsModal}
        onClose={()=>setSettingsModal(false)}
        project={project}
      />}

      {type === 'project' && <ModalProject />}
      {type === 'task' && <ModalTask />}
    </Box>
  );
};

export default ProjectBoard;