import { ProjectFormValues, projectSchema } from "@/schema/schema";
import { useModalStore } from "@/store/modalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router";
import { useMyStore } from "@/store/store";

const ModalProject = () => {
  const navigate = useNavigate();

  const methods = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema)
  });
  const { handleSubmit, reset, formState: { isSubmitting }  } = methods;

  const { title, body, isOpen, id,isCreating, setOpen, resetStore, redirect } = useModalStore(
    useShallow( (state => ({
      title: state.title,
      body: state.body,
      isOpen: state.isOpen,
      id: state.id,
      isCreating: state.isCreating,
      setOpen: state.setOpen,
      resetStore: state.resetStore,
      redirect: state.redirect,
    })))
  );

  const { addProject, updateProject, deleteProject } = useMyStore(
    useShallow( (state => ({
      addProject: state.addProject,
      updateProject: state.updateProject,
      deleteProject: state.deleteProject,
    })))
  );

  const onOpenChange = () => {
    reset();
    resetStore()
    setOpen(false);
    if(redirect){
      navigate(redirect);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    if(id){
      deleteProject(id);
    }
    if(isCreating){
      addProject(data);
    }else{
      updateProject(data)
    }
    if(redirect){
      navigate(redirect);
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