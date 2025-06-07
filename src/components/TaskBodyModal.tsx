import { getPriorityOptions, getStatusOptions } from "@/utils/helpers";
import { createListCollection, Fieldset, VStack } from "@chakra-ui/react"
import ControllerSelect from "@/components/ControllerSelect";
import InputField from "@/components/InputField";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Task } from "@/types";
import { TaskFormValues } from "@/schema/schema";
import { useModalStore } from "@/store/modalStore";
import { useShallow } from "zustand/shallow";

interface ModalTaskProps {
  task?: Task;
}

const TaskBodyModal = ({ task }: ModalTaskProps) => {

  const { id, isCreating } = useModalStore(
    useShallow( (state => ({
      id: state.id,
      isCreating: state.isCreating,
    })))
  );

  const { setValue } = useFormContext<TaskFormValues>();

  const priorityOptions = getPriorityOptions();
  const statusOptions = getStatusOptions();

  const statusOptions2 = createListCollection({
    items: statusOptions
  });  
  const priorityOptions2 = createListCollection({
    items: priorityOptions.map(p => ({label: p.label, value: p.value}))
  });

  useEffect(() => {
    // console.log('useEffect', id, task);
    if(task){
      setValue('title', task.title);
      setValue('description', task.description);
      setValue('status', task.status);
      setValue('priority', task.priority);
      setValue('dueDate', task.dueDate);
      setValue('assignee', task.assignee);
      setValue('id', task.id);
      setValue('projectId', task.projectId);
      setValue('createdAt', task.createdAt);
    }
    if(id && task){
      setValue('title', task.title);
      setValue('status', task.status);
      setValue('priority', task.priority);
      setValue('id', id);
    }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, task]);

   if(id && !isCreating){
    return <p>Are you sure you want to delete this task? This action cannot be undone.</p>
  }

  return(
    <VStack gap={4}>
      <Fieldset.Root>
        <InputField name="title" label="Task Title" placeholder="Enter task title" required={true} />
        <InputField name="description" label="Description" placeholder="Enter task description" required={true} />
        <ControllerSelect name="status" label="Status" selects={statusOptions2} placeholder="Select task status" />
        <ControllerSelect name="priority" label="Priority" selects={priorityOptions2} placeholder="Select task priority" />
        <InputField name="dueDate" label="Due Date" required={false} placeholder="Enter due date" type="date" />
        <InputField name="assignee" label="Assignee" required={false} placeholder="Enter assignee" />
      </Fieldset.Root>
    </VStack>
  )
}

export default TaskBodyModal