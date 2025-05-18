import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/Modal"
import { TaskFormValues, taskSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/store/modalStore";
import { useShallow } from "zustand/shallow";
import { useMyStore } from "@/store/store";

function ModalTask() {

  const methods = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema)
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

  const { addTask, updateTask, deleteTask, setBoards } = useMyStore(
    useShallow( (state => ({
      addTask: state.addTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask,
      setBoards: state.setBoards,
    })))
  );
  
  const onOpenChange = () => {
    reset();
    resetStore()
    setOpen(false);
  };
  
  const onSubmit = async (data: TaskFormValues) => {
    if(!isCreating && id && data.projectId){
      deleteTask(id);
      setBoards(data.projectId);
    }
    if(isCreating && id){
      const newData: TaskFormValues = {
        ...data,
        projectId: id,
        id: self.crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      addTask(newData);
      setBoards(id);
    }else{
      if(data.projectId){
        updateTask(data);
        setBoards(data.projectId);
      }
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

export default ModalTask