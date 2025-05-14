import { useModalStore } from "@/store/modalStore";
import { Task } from "@/types";
import { getPriorityOptions, getStatusOptions } from "@/utils/helpers";
import { createListCollection, Field, Fieldset, Input, Portal, Select, Textarea, VStack } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form";
import { useShallow } from "zustand/shallow";

const TaskBodyModal = () => {
  const { id } = useModalStore(
    useShallow( (state => ({
      id: state.id,
    })))
  );
  
  const { register, setValue, formState: { errors } } = useFormContext<Task>();

  const priorityOptions = getPriorityOptions();
  const statusOptions = getStatusOptions();

  const statusOptions2 = createListCollection({
    items: statusOptions
  });
  const priorityOptions2 = createListCollection({
    items: priorityOptions
  });

  return(
    <VStack gap={4}>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root invalid={!!errors.title} required>
            <Field.Label>Task Title<Field.RequiredIndicator /></Field.Label>
            <Input
              {...register('title')}
              autoFocus
              placeholder="Enter task title"
            />
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.Content>
          <Field.Root invalid={!!errors.description} required={false}>
            <Field.Label>Description<Field.RequiredIndicator /></Field.Label>
            <Textarea
              {...register('description')}
              placeholder="Describe your task..."
            />
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.Content>
          <Field.Root invalid={!!errors.status} required>
            <Field.Label>Status<Field.RequiredIndicator /></Field.Label>
            {/* <Select
              {...register('status')}
              placeholder="Select task status"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select> */}
            <Select.Root collection={statusOptions2} size="sm" width="320px">
              <Select.HiddenSelect />
              <Select.Label>Select framework</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select framework" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {statusOptions2.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.Content>
          <Field.Root invalid={!!errors.priority} required>
            <Field.Label>Priority<Field.RequiredIndicator /></Field.Label>
            {/* <Select
              {...register('priority')}
              placeholder="Select task priority"
            >
              {priorityOptions.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </Select> */}


            <Select.Root collection={priorityOptions2} size="sm" width="320px">
              <Select.HiddenSelect />
              <Select.Label>Select framework</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select framework" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {priorityOptions2.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>



            <Field.ErrorText>{errors.priority?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.Content>
          <Field.Root invalid={!!errors.dueDate} required={false}>
            <Field.Label>Due Date<Field.RequiredIndicator /></Field.Label>
            <Input
              {...register('dueDate')}
              type="date"
              placeholder="Enter due date"
            />
            <Field.ErrorText>{errors.dueDate?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.Content>
          <Field.Root invalid={!!errors.assignee} required={false}>
            <Field.Label>Assignee<Field.RequiredIndicator /></Field.Label>
            <Input
              {...register('assignee')}
              placeholder="Enter assignee name"
            />
            <Field.ErrorText>{errors.assignee?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>
    </VStack>
  )
}
export default TaskBodyModal