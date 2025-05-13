import { 
  Box, 
  Flex, 
  Text, 
  IconButton, 
  // useBreakpointValue,
  // useColorMode
} from '@chakra-ui/react';
import { Layout, Sun, Moon } from 'lucide-react';
import { useColorMode } from '@/components/ui/color-mode';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  // const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box 
      as="header" 
      bg="white" 
      boxShadow="sm" 
      py={3} 
      px={6}
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Layout size={24} color="#30BFCD" />
          <Text 
            ml={2} 
            fontWeight="bold" 
            fontSize="xl" 
            color="brand.500"
            display={{ base: 'none', md: 'block' }}
          >
            KanbanFlow
          </Text>
        </Flex>
        
        <Flex align="center">
          <IconButton
            // icon={colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            aria-label="Toggle color mode"
            variant="ghost"
            onClick={toggleColorMode}
            size="sm"
          >
            {colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;