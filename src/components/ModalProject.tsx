import { ProjectFormValues, projectSchema } from "@/schema/schema";
import { useModalStore } from "@/store/modalStore";
import { useProjectStore } from "@/store/projectStore";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";

const Modal = () => {

  const methods = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema)
  });
  const { handleSubmit, reset, formState: { isSubmitting }  } = methods;

  const { title, body, isOpen, id,isCreating, setOpen, resetStore } = useModalStore(
    useShallow( (state => ({
      title: state.title,
      body: state.body,
      isOpen: state.isOpen,
      id: state.id,
      isCreating: state.isCreating,
      setOpen: state.setOpen,
      resetStore: state.resetStore,
    })))
  );
  const { addProject, updateProject, deleteProject } = useProjectStore(
    useShallow( (state => ({
      addProject: state.addProject,
      updateProject: state.updateProject,
      deleteProject: state.deleteProject
    })))
  );

  const onOpenChange = () => {
    reset();
    resetStore()
    setOpen(false);
  };

  const onSubmit = async (data: ProjectFormValues) => {
    // console.log('submit', data);
    if(id){
      // console.log('delete project', id);
      await deleteProject(id);
    }
    if(isCreating){
      // console.log('submit', data);
      await addProject(data);
    }else{
      // // console.log('submit', data);
      await updateProject(data)
    }
    onOpenChange();
  };

  return (
    <FormProvider {...methods}>    
      <Dialog.Root lazyMount open={isOpen} onOpenChange={onOpenChange} >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {body}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="ghost" mr={3}>Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  colorScheme="brand" 
                  type="submit"
                  loading={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
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
    </FormProvider>
  )
}

export default Modal