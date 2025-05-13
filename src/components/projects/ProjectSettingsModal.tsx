import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  Button,
  Tabs,
  // TabList,
  // TabPanels,
  // Tab,
  // TabPanel,
  useDisclosure,
  Text,
  Box,
  Dialog,
  CloseButton
} from '@chakra-ui/react';
import { Project } from '@/types';
import { useProjectStore } from '@/store/projectStore';
import ProjectFormModal from '@/components/projects/ProjectFormModal';
// import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const ProjectSettingsModal = ({ 
  isOpen, 
  onClose, 
  project 
}: ProjectSettingsModalProps) => {
  const navigate = useNavigate();
  const { deleteProject } = useProjectStore();
  const [tabIndex, setTabIndex] = useState(0);
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const handleDelete = async () => {
    await deleteProject(project.id);
    deleteModal.onClose();
    onClose();
    navigate('/dashboard');
  };

  const handleEditClick = () => {
    onClose();
    editModal.onOpen();
  };

  return (
    <>
      {/* <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Settings</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <Tabs isFitted variant="enclosed" index={tabIndex} onChange={handleTabsChange}>
              <TabList mb="1em">
                <Tab>General</Tab>
                <Tab>Danger Zone</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box mb={4}>
                    <Text fontWeight="semibold">Project Name:</Text>
                    <Text>{project.name}</Text>
                  </Box>
                  <Box mb={4}>
                    <Text fontWeight="semibold">Description:</Text>
                    <Text>{project.description || "No description"}</Text>
                  </Box>
                  <Button 
                    colorScheme="brand" 
                    mt={2} 
                    onClick={handleEditClick}
                  >
                    Edit Project
                  </Button>
                </TabPanel>
                <TabPanel>
                  <Text mb={4} color="gray.600">
                    Danger Zone: Actions here cannot be undone.
                  </Text>
                  <Button 
                    colorScheme="red" 
                    onClick={deleteModal.onOpen}
                  >
                    Delete Project
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose}>
        <Dialog.Trigger asChild>
          <Button variant="outline" size="sm">
            {isOpen ? "Close" : "Open"} Dialog
          </Button>
        </Dialog.Trigger>
        <Dialog.Positioner>
          {/* <Dialog.Overlay /> */}
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Project Settings
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {/* isFitted variant="enclosed" index={tabIndex} onChange={handleTabsChange} */}
              <Tabs.Root >
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
                    colorScheme="brand" 
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
                    colorScheme="red" 
                    onClick={deleteModal.onOpen}
                  >
                    Delete Project
                  </Button>
                </Tabs.Content>
              </Tabs.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost" mr={3} >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorScheme="brand" 
                type="submit"
                loading={false}
                // onClick={handleSubmit(onSubmit)}
              >
                Save Changes
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      {/* <ProjectFormModal 
        isOpen={editModal.isOpen} 
        onClose={editModal.onClose} 
        isCreating={false}
        project={project}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onConfirm={handleDelete}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone, and all associated tasks will be permanently removed."
      /> */}
    </>
  );
};

export default ProjectSettingsModal;