import { Box, Fieldset, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Project } from '@/types';
import { useEffect } from "react";
import { useModalStore } from "@/store/modalStore";
import { useShallow } from "zustand/shallow";
import InputField from "@/components/InputField";

interface ProjectBodyModalProps {
  project?: Project;
}

const ProjectBodyModal = ({project}:ProjectBodyModalProps) => {

  const { id } = useModalStore(
    useShallow( (state => ({
      id: state.id,
    })))
  );

  const { setValue } = useFormContext<Project>();
  
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
          <InputField name="name" label="Project Name" placeholder="Enter project name" required={true} />
          <InputField name="description" label="Description" placeholder="Describe your project..." />
        </Fieldset.Root>
      </VStack>
    </Box>
  );
};

export default ProjectBodyModal;