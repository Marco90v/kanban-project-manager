import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { Layout, Sun, Moon } from 'lucide-react';
import { useColorMode } from '@/components/ui/color-mode';
import { colors } from '@/utils/const';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box 
      as="header" 
      bg="white" 
      _dark={{bg:colors.bgDark, boxShadow:"none"}}
      boxShadow="sm" 
      py={3} 
      px={6}
      borderBottomWidth="1px"
      borderBottomColor={{base:"gray.200", _dark:"gray.700"}}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Layout size={24} color={colors.brand500} />
          <Text 
            ml={2} 
            fontWeight="bold" 
            fontSize="xl" 
            color={{base:colors.brand500}}
            display={{ base: 'none', md: 'block' }}
          >
            KanbanFlow
          </Text>
        </Flex>
        
        <Flex align="center">
          <IconButton
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