import { useMyStore } from "@/store/store";
import { Box, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import KanbanColumn from "./kanban/KanbanColumn";

interface BoardProps {
  projectId: string | undefined;
}

function Board({projectId}:BoardProps) {
  const columnSpacing = useBreakpointValue({ base: 3, md: 5 });

  const { boards, setBoards } = useMyStore(
    useShallow( (state => ({
      boards: state.Boards,
      setBoards: state.setBoards,
    })))
  );

  useEffect(() => {
    if(projectId){
      setBoards(projectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);
  
  return (
    <Box h="full" overflowX={{ base: 'auto', lg: 'visible' }}>
      <SimpleGrid 
        columns={{ base: 1, md: 3 }} 
        gap={columnSpacing}
        minW={{ base: '100%', md: 'auto' }}
        h="full"
        pb={4}
      >
        {boards?.columns.map(column => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Board;