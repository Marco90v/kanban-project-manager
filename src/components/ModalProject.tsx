import { ProjectFormValues, projectSchema } from "@/schema/schema";
import { useModalStore } from "@/store/modalStore";
import { useProjectStore } from "@/store/projectStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import Modal from "./Modal";

const ModalProject = () => {

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
      <Modal
        title={title}
        body={body}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClick={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </FormProvider>
    
  )
}

export default ModalProject