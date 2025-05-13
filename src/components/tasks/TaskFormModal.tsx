import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  Button,
  // FormControl,
  // FormLabel,
  Input,
  Textarea,
  // FormErrorMessage,
  VStack,
  Select,
  Dialog,
  Portal,
  Fieldset,
  Field,
  CloseButton,
  createListCollection
} from '@chakra-ui/react';
import { useProjectStore } from '@/store/projectStore';
import { Task } from '@/types';
import { getPriorityOptions, getStatusOptions } from '@/utils/helpers';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  task?: Task;
}

const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(100, 'Task title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  status: z.enum(['todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
  assignee: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

const TaskFormModal = ({ 
  isOpen, 
  onClose, 
  projectId,
  task 
}: TaskFormModalProps) => {
  const { addTask, updateTask } = useProjectStore();
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'todo',
      priority: task?.priority || 'medium',
      dueDate: task?.dueDate || '',
      assignee: task?.assignee || '',
    }
  });

  const priorityOptions = getPriorityOptions();
  const statusOptions = getStatusOptions();

  const statusOptions2 = createListCollection({
    items: statusOptions
  });
  const priorityOptions2 = createListCollection({
    items: priorityOptions
  });

  const onSubmit = async (data: TaskFormValues) => {
    if (isEditing && task) {
      await updateTask({
        ...task,
        ...data,
      });
    } else {
      await addTask({
        ...data,
        projectId,
      });
    }
    reset();
    onClose();
  };

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {isOpen ? "Close" : "Open"} Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {isEditing ? 'Edit Task' : 'Create New Task'}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
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
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                {isEditing ? 'Save Changes' : 'Create Task'}
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

export default TaskFormModal;