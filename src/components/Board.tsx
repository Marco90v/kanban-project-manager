import { useMyStore } from "@/store/store";
import { Box,SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import KanbanColumn from "./kanban/KanbanColumn";
import { closestCenter, DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { TaskFormValues } from "@/schema/schema";
// import { restrictToHorizontalAxis, snapCenterToCursor } from "@dnd-kit/modifiers";

interface BoardProps {
  projectId: string | undefined;
}

function Board({projectId}:BoardProps) {

  const columnSpacing = useBreakpointValue({ base: 3, md: 5 });

  // Configure sensors for drag detection
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // 5px movement before drag starts
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // 250ms delay on touch devices
      tolerance: 5, // 5px movement allowed during delay
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const { boards, setBoards, updateStatusTask } = useMyStore(
    useShallow( (state => ({
      boards: state.Boards,
      setBoards: state.setBoards,
      updateTask: state.updateTask,
      updateStatusTask: state.updateStatusTask,
    })))
  );

  useEffect(() => {
    if (projectId) setBoards(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      updateStatusTask(event);
    },[updateStatusTask]
  );

  return (
    <Box h="full" overflowX={{ base: 'auto', lg: 'visible' }}>
      <SimpleGrid 
        columns={{ base: 1, md: boards?.columns.length || 3 }} 
        gap={columnSpacing}
        minW={{ base: '100%', md: 'auto' }}
        h="full"
        pb={4}
      >

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        // modifiers={[snapCenterToCursor, restrictToHorizontalAxis]}
       >
        {/* {parent === null ? draggableMarkup : null} */}

        {
          boards?.columns.map((column) => (
            <KanbanColumn 
              key={column.id} 
              column={column} 
            />
          ))
        }
      </DndContext>

      </SimpleGrid>
    </Box>
  )
}

export default Board;