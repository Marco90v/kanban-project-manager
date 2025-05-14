import { useModalStore } from "@/store/modalStore";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

interface ModalProps{
  title: string | null;
  body: React.ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
  onClick: () => void;
  isSubmitting: boolean;
}

function Modal({title, body, isOpen, onOpenChange, onClick, isSubmitting}:ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const { id, setContentRef } = useModalStore(
    useShallow( (state => ({
      id: state.id,
      setContentRef: state.setContentRef,
    })))
  );
  useEffect(() => {
    setContentRef(contentRef);
  
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  
  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onOpenChange} >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={contentRef}>
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
                onClick={onClick}
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
export default Modal