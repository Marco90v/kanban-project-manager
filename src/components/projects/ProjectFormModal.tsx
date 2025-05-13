import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  // FormControl,
  // FormLabel,
  Input,
  Portal,
  // Textarea,
  // useDialog,
  // FormErrorMessage,
  VStack
} from '@chakra-ui/react';
import { useProjectStore } from '@/store/projectStore';
import { Project } from '@/types/index';
// import { useState } from 'react';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCreating: boolean;
  project?: Project;
}

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional()
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const ProjectFormModal = ({ 
  isOpen, 
  onClose, 
  isCreating, 
  project 
}: ProjectFormModalProps) => {
  const { addProject, updateProject } = useProjectStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || '',
      description: project?.description || ''
    }
  });

  const onSubmit = async (data: ProjectFormValues) => {
    // console.log(data);
    if (isCreating) {
      await addProject(data);
    } else if (project) {
      await updateProject({
        ...project,
        ...data
      });
    }
    reset();
    onClose();
  };

  // const {open, setOpen} = useDialog();
  // console.log(open, setOpen);

  // const [open, setOpen] = useState(false)

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose} >
      {/* <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {isOpen ? "Close" : "Open"} Dialog
        </Button>
      </Dialog.Trigger> */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {isCreating ? 'Create New Project' : 'Edit Project'}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>



              <Box onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={4}>
                  <Fieldset.Root>

                    <Fieldset.Content>
                      <Field.Root invalid={!!errors.name} required>
                        <Field.Label>Project Name<Field.RequiredIndicator /></Field.Label>
                        <Input
                          {...register('name')}
                          autoFocus
                          placeholder="Enter project name"
                        />
                        <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                      </Field.Root>
                    </Fieldset.Content>

                    <Fieldset.Content>
                      <Field.Root invalid={!!errors.description} required={false}>
                        <Field.Label>Description<Field.RequiredIndicator /></Field.Label>
                        <Input
                          {...register('description')}
                          autoFocus
                          placeholder="Describe your project..."
                        />
                        <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                      </Field.Root>
                    </Fieldset.Content>

                  </Fieldset.Root>

                </VStack>
              </Box>


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
                {isCreating ? 'Create Project' : 'Save Changes'}
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

export default ProjectFormModal;