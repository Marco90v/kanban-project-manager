import { ProjectFormValues } from "@/types";
import { useMyStore } from "@/store/store";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";

interface ProjectDeleteProps {
  open: boolean;
  onToggle: () => void;
  project: ProjectFormValues;
  redirect?: string;
}

const ProjectDelete = ({open, onToggle, project, redirect}:ProjectDeleteProps) => {

  const navigate = useNavigate();

  const { deleteProject } = useMyStore(
    useShallow( (state => ({
      deleteProject: state.deleteProject,
    })))
  );

  const onClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onToggle();
  };

  const handlerSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(project.id) deleteProject(project.id);
    onClose();
    if(redirect) navigate(redirect);
  };

  const onOpenChange = () => {
    onToggle();
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={onOpenChange} >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete Project</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>Are you sure you want to delete this project? This action cannot be undone, and all associated tasks will be permanently removed.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  mr={3}
                  variant="ghost"
                  fontWeight="bold"
                  color={{base:"gray.600", _dark:"white"}}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg="red.500"
                color="white"
                fontWeight="bold"
                type="submit"
                onClick={handlerSave}
              >
                Save
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ProjectDelete;