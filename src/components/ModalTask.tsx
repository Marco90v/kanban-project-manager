import { FormProvider, useForm } from "react-hook-form";
import Modal from "./Modal"
import { TaskFormValues, taskSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/store/modalStore";
import { useShallow } from "zustand/shallow";
import { useProjectStore } from "@/store/projectStore";

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
    const { addTask, updateTask, deleteTask } = useProjectStore(
      useShallow( (state => ({
        addTask: state.addTask,
        updateTask: state.updateTask,
        deleteTask: state.deleteTask
      })))
    );
  
    const onOpenChange = () => {
      reset();
      resetStore()
      setOpen(false);
    };
  
    const onSubmit = async (data: TaskFormValues) => {
      // console.log('submit', data);
      if(id){
        console.log('delete project', id);
        // await deleteTask(id);
      }
      if(isCreating){
        console.log('submit', data);
        // await addTask(data);
      }else{
        // console.log('submit', data);
        // await updateTask(data)
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