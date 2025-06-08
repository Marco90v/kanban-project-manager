import { TaskFormValues } from "@/types";
import { useMyStore } from "@/store/store";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useShallow } from "zustand/shallow";

interface ProjectDeleteProps {
  open: boolean;
  onToggle: () => void;
  task: TaskFormValues;
}

const TaskDelete = ({open, onToggle, task}:ProjectDeleteProps) => {

  const { deleteTask } = useMyStore(
    useShallow( (state => ({
      deleteTask: state.deleteTask,
    })))
  );

  const onClose = () => {
    onToggle();
  };

  const handlerSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(task.id && task.projectId) deleteTask(task.id, task.projectId);
    onClose();
  };

  return (
    <Dialog.Root lazyMount open={open} >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create New Project</Dialog.Title>
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

export default TaskDelete;