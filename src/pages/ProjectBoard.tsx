import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Box, Heading, Flex, Text, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { ArrowLeft, Plus, Settings } from 'lucide-react';
import { useShallow } from 'zustand/shallow';
import { Tooltip } from '@/components/ui/tooltip';
import Board from '@/components/kanban/Board';
import { useMyStore } from '@/store/store';
import { ProjectFormValues } from '@/types';
import { colors } from '@/utils/const';
import TaskDialog from '@/components/tasks/TaskDialog';
import SettingsDialog from '@/components/projects/SettingsDialog';
import ProjectDialog from '@/components/projects/ProjectDialog';
import ProjectDelete from '@/components/projects/ProjectDelete';

const ProjectBoard = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const { projects } = useMyStore(
    useShallow( (state => ({
      projects: state.Projects
    })))
  );

  const {open, onToggle} = useDisclosure();
  const {open:openSettings, onToggle:onToggleSettings} = useDisclosure();
  const {open:openEdit, onToggle:onToggleEdit} = useDisclosure();
  const {open:openDelete, onToggle:onToggleDelete} = useDisclosure();
  
  const [project, setProject] = useState<ProjectFormValues | undefined>(undefined);

  useEffect(() => {
    const p = projects.find(p => p.id === projectId);
    setProject(p);
   
  }, [projectId, projects]);

  const addTaks = () => {
    onToggle();
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
          <Button
            onClick={addTaks}
            bg={colors.brand500}
            color="white"
            fontWeight="bold"
          >
            <Plus size={18} />
            Add Task
          </Button>
          <Tooltip content="Project settings">
            <IconButton
              aria-label="Project settings"
              variant="ghost"
              size="sm"
              onClick={onToggleSettings}
            >
              <Settings size={18} />
            </IconButton>
          </Tooltip>
          
        </Flex>
      </Flex>
      
      <Text color="gray.600" mb={6}>{project?.description}</Text>
      
      <Board projectId={project?.id} />

      <SettingsDialog open={openSettings} onToggle={onToggleSettings} project={project} onToggleDelete={onToggleDelete} onToggleEdit={onToggleEdit} />
      <TaskDialog open={open} onToggle={onToggle} isCreating={true} projectId={projectId || ""} />
      <ProjectDialog open={openEdit} onToggle={onToggleEdit} isCreating={false} project={project} />
      {project && <ProjectDelete open={openDelete} onToggle={onToggleDelete} project={project} redirect='/dashboard' />}
    </Box>
  );
};

export default ProjectBoard;