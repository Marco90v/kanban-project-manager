import { ProjectFormValues } from "@/types";
import { Box, Button, CloseButton, Dialog, Tabs, Text } from "@chakra-ui/react"

interface SettingsDialogProps {
  open: boolean;
  onToggle: () => void;
  onToggleEdit: () => void;
  onToggleDelete: () => void;
  project: ProjectFormValues | undefined;
}

const SettingsDialog = ({open, onToggle, project, onToggleEdit, onToggleDelete}:SettingsDialogProps) => {

  const handleDelete = async () => {
    onToggleDelete();
    onToggle();
  };

  const handleEditClick = () => {
    onToggleEdit();
    onToggle();
  };

  const onOpenChange = () => {
    onToggle();
  };

  return (
    <>
      <Dialog.Root lazyMount open={open} onOpenChange={onOpenChange}>
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
                    <Text>{project?.name}</Text>
                  </Box>
                  <Box mb={4}>
                    <Text fontWeight="semibold">Description:</Text>
                    <Text>{project?.description || "No description"}</Text>
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
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export default SettingsDialog