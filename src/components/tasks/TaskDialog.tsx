import { useEffect, useRef } from "react";
import { Button, CloseButton, createListCollection, Dialog, Fieldset, Portal, VStack } from "@chakra-ui/react";
import { colors } from "@/utils/const";
import InputField from "@/components/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/schema/schema";
import { TaskFormValues } from "@/types";
import { useMyStore } from "@/store/store";
import { useShallow } from "zustand/shallow";
import ControllerSelect from "@/components/ControllerSelect";
import { getPriorityOptions, getStatusOptions } from "@/utils/helpers";

interface TaskDialogoProps {
  open: boolean;
  onToggle: () => void;
  projectId?: string;
  isCreating?: boolean;
  task?: TaskFormValues;
}

const initialTask = {
  title: '',
  description: '',
  status: [],
  priority: [],
  dueDate: '',
  assignee: '',
  id: '',
  projectId: '',
  createdAt: new Date().toISOString(),
}

const TaskDialog = ({open, onToggle, projectId, isCreating=false, task}:TaskDialogoProps) => {

  const { addTask, updateTask } = useMyStore(
    useShallow( (state => ({
      addTask: state.addTask,
      updateTask: state.updateTask,
    })))
  );

  const contentRef = useRef<HTMLDivElement>(null);

  const methods = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema)
  });
  const { handleSubmit, reset, formState: { isSubmitting }, setValue  } = methods;

  const priorityOptions = getPriorityOptions();
  const statusOptions = getStatusOptions();

  const statusOptions2 = createListCollection({
    items: statusOptions
  });  
  const priorityOptions2 = createListCollection({
    items: priorityOptions.map(p => ({label: p.label, value: p.value}))
  });

  useEffect(() => {
    if(!isCreating && task){
      setValue('title', task.title);
      setValue('description', task.description);
      setValue('status', task.status);
      setValue('priority', task.priority);
      setValue('dueDate', task.dueDate);
      setValue('assignee', task.assignee);
      setValue('id', task.id);
      setValue('projectId', task.projectId);
      setValue('createdAt', task.createdAt);
    }else{
      reset(initialTask);
    }
  }, [isCreating, reset, setValue, task]);

  const handlerSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSubmit(onSubmit)();
  };

  const onClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    // reset(initialTask);
    onToggle();
  };

  const onSubmit = async (data: TaskFormValues) => {
    if(isCreating && projectId){
      const newData: TaskFormValues = {
        ...data,
        projectId: projectId,
        id: self.crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      addTask(newData);
    }else{
      updateTask(data)
    }
    onClose();
  };

  const onOpenChange = () => {
    onToggle();
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={onOpenChange} >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
            {/* Header */ }
            <Dialog.Header>
              <Dialog.Title>Create New Project</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {/* Body */ }
              <FormProvider {...methods}>
                <VStack gap={4}>
                  <Fieldset.Root>
                    <InputField name="title" label="Task Title" placeholder="Enter task title" required={true} />
                    <InputField name="description" label="Description" placeholder="Enter task description" />
                    <ControllerSelect name="status" label="Status" selects={statusOptions2} placeholder="Select task status" ref={contentRef} />
                    <ControllerSelect name="priority" label="Priority" selects={priorityOptions2} placeholder="Select task priority" ref={contentRef} />
                    <InputField name="dueDate" label="Due Date" required={false} placeholder="Enter due date" type="date" />
                    <InputField name="assignee" label="Assignee" required={false} placeholder="Enter assignee" />
                  </Fieldset.Root>
                </VStack>
              </FormProvider>
            </Dialog.Body>
            {/* Footer */}
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
                bg={colors.brand500}
                color="white"
                fontWeight="bold"
                type="submit"
                loading={isSubmitting}
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
  )
}

export default TaskDialog;