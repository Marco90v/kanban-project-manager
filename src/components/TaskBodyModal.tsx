import { getPriorityOptions, getStatusOptions } from "@/utils/helpers";
import { createListCollection, Fieldset, VStack } from "@chakra-ui/react"
import ControllerSelect from "@/components/ControllerSelect";
import InputField from "@/components/InputField";

const TaskBodyModal = () => {
  const priorityOptions = getPriorityOptions();
  const statusOptions = getStatusOptions();

  const statusOptions2 = createListCollection({
    items: statusOptions
  });  
  const priorityOptions2 = createListCollection({
    items: priorityOptions.map(p => ({label: p.label, value: p.value}))
  });

  return(
    <VStack gap={4}>
      <Fieldset.Root>
        <InputField name="title" label="Task Title" required />
        <InputField name="description" label="Description" required={false} />
        <ControllerSelect name="status" selects={statusOptions2} />
        <ControllerSelect name="priority" selects={priorityOptions2} />   
        <InputField name="dueDate" label="Due Date" required={false} />
        <InputField name="assignee" label="Assignee" required={false} />
      </Fieldset.Root>
    </VStack>
  )
}

export default TaskBodyModal