import { Box, Field, Fieldset, Input, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
// import { ProjectFormValues } from "@/schema/schema";
import { Project } from '@/types';
import { useEffect } from "react";
import { useModalStore } from "@/store/modalStore";
import { useShallow } from "zustand/shallow";

const ProjectBodyModal = ({project}:{project?:Project}) => {

  const { id } = useModalStore(
      useShallow( (state => ({
        id: state.id,
      })))
    );

  const { register, setValue, formState: { errors } } = useFormContext<Project>();
  
  useEffect(() => {
    if (project) {
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('id', project.id);
      setValue('createdAt', project.createdAt);
    }
    if(id){
      setValue('name', "...");
      setValue('id', id);
    }
  }, [id, project, setValue]);

  if(id){
    return <p>Are you sure you want to delete this project? This action cannot be undone, and all associated tasks will be permanently removed.</p>
  }

  return (
    <Box>
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
  );
};

export default ProjectBodyModal;