import { useEffect } from 'react';
import { 
  Box, 
  Container, 
  SimpleGrid, 
  Spinner, 
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useProjectStore } from '@/store/projectStore';
import KanbanColumn from '@/components/kanban/KanbanColumn';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface KanbanBoardProps {
  projectId: string;
}

const KanbanBoard = ({ projectId }: KanbanBoardProps) => {
  const { boards, isLoading, fetchBoard } = useProjectStore();
  const board = boards.find(b => b.projectId === projectId);
  const columnSpacing = useBreakpointValue({ base: 3, md: 5 });
  
  useEffect(() => {
    if (!board) {
      fetchBoard(projectId);
    }
  }, [projectId, board, fetchBoard]);
  // console.log('board', board);

  if (isLoading && !board) {
    // return <LoadingSpinner />;
    return(
      <Container maxW="100vw" h="100vh" p={0} centerContent>
        <VStack 
          wordSpacing={8}
          w={{ base: "90%", md: "450px" }}
          justify="center"
          h="100%"
        >
          <Spinner size='xl' />
        </VStack>
      </Container>
    )
  }

  if (!board) {
    return <Text>No board found for this project</Text>;
  }

  return (
    <Box h="full" overflowX={{ base: 'auto', lg: 'visible' }}>
      <SimpleGrid 
        columns={{ base: 1, md: board.columns.length }} 
        gap={columnSpacing}
        minW={{ base: '100%', md: 'auto' }}
        h="full"
        pb={4}
      >
        {board.columns.map(column => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            projectId={projectId} 
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default KanbanBoard;