import { useEffect, useRef } from "react";
import { Box, Button, CloseButton, Dialog, Fieldset, Portal, VStack } from "@chakra-ui/react";
import { colors } from "@/utils/const";
import InputField from "@/components/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/schema/schema";
import { ProjectFormValues } from "@/types";
import { useMyStore } from "@/store/store";
import { useShallow } from "zustand/shallow";

interface ProjectDialogoProps {
  open: boolean;
  onToggle: () => void;
  isCreating?: boolean;
  project?: ProjectFormValues;
}

const initialProject = {
  name: '',
  description: '',
  createdAt: new Date().toISOString(),
  id: '',
}

const ProjectDialog = ({open, onToggle, isCreating=true, project}:ProjectDialogoProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { addProject, updateProject } = useMyStore(
    useShallow( (state => ({
      addProject: state.addProject,
      updateProject: state.updateProject,
    })))
  );

  const methods = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema)
  });
  const { handleSubmit, reset, formState: { isSubmitting }, setValue  } = methods;

  useEffect(() => {
    if(!isCreating && project){
      setValue('name', project?.name);
      setValue('description', project?.description);
      setValue('id', project.id);
      setValue('createdAt', project.createdAt);
    }else{
      reset(initialProject);
    }
  }, [isCreating, project, project?.description, project?.name, reset, setValue]);
  const handlerSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSubmit(onSubmit)();
  };

  const onClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onToggle();
  };

  const onSubmit = async (data: ProjectFormValues) => {
    if(isCreating){
      addProject(data);
    }else{
      updateProject(data);
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
                <Box onClick={(e) => e.stopPropagation()}>
                  <VStack gap={4}>
                    <Fieldset.Root>
                      <InputField name="name" label="Project Name" placeholder="Enter project name" required={true} />
                      <InputField name="description" label="Description" placeholder="Describe your project..." />
                    </Fieldset.Root>
                  </VStack>
                </Box>
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

export default ProjectDialog;