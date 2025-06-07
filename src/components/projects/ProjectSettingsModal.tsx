import { Button, Tabs, Text, Box, Dialog, CloseButton } from '@chakra-ui/react';
import { Project } from '@/types';
import { useModalStore } from '@/store/modalStore';
import { useShallow } from 'zustand/shallow';
import ProjectBodyModal from '../ProjectBodyModal';

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const ProjectSettingsModal = ({ isOpen, onClose, project }: ProjectSettingsModalProps) => {

  const { setModal, setOpen:sOpen, setId, setType, setRedirect } = useModalStore(
    useShallow( (state => ({
      setModal: state.setModal,
      setOpen: state.setOpen,
      setId: state.setId,
      setType: state.setType,
      setRedirect: state.setRedirect,
    })))
  );

  const handleDelete = async () => {
    if(project.id){
      setModal({
        title: 'Delete Project',
        body: <ProjectBodyModal />,
      });
      setRedirect('/dashboard');
      setType('project');
      setId(project.id);
      sOpen(true);
      onClose();
    }
  };

  const handleEditClick = () => {
    if(project.id){
      setModal({
        title: 'Edit Project',
        body: <ProjectBodyModal project={project} />,
      });
      setType('project');
      sOpen(true);
      onClose();
    }
  };

  return (
    <>
      <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose}>
        {/* <Dialog.Trigger asChild>
          <Button variant="outline" size="sm">
            {isOpen ? "Close" : "Open"} Dialog
          </Button>
        </Dialog.Trigger> */}
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Project Settings
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Tabs.Root defaultValue="general" >
                <Tabs.List mb="1em">
                  <Tabs.Trigger value='general'>General</Tabs.Trigger>
                  <Tabs.Trigger value='danger'>Danger Zone</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value='general'>
                  <Box mb={4}>
                    <Text fontWeight="semibold">Project Name:</Text>
                    <Text>{project.name}</Text>
                  </Box>
                  <Box mb={4}>
                    <Text fontWeight="semibold">Description:</Text>
                    <Text>{project.description || "No description"}</Text>
                  </Box>
                  <Button 
                    bg="#30BFCD"
                    fontWeight="bold"
                    mt={2} 
                    onClick={handleEditClick}
                  >
                    Edit Project
                  </Button>
                </Tabs.Content>
                <Tabs.Content value='danger'>
                  <Text mb={4} color="gray.600">
                    Danger Zone: Actions here cannot be undone.
                  </Text>
                  <Button 
                    bg="red" 
                    fontWeight="bold"
                    onClick={handleDelete}
                  >
                    Delete Project
                  </Button>
                </Tabs.Content>
              </Tabs.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost" mr={3} fontWeight="bold" >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              {/* <Button
                colorScheme="brand" 
                type="submit"
                loading={false}
                // onClick={handleSubmit(onSubmit)}
              >
                Save Changes
              </Button> */}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};

export default ProjectSettingsModal;