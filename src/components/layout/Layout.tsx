import { Outlet } from 'react-router';
import { Box, Flex } from '@chakra-ui/react';
import Header from '@/components/layout/Header';
// import Header from './Header';
import Sidebar from '@/components/layout/Sidebar';

const Layout = () => {
  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Flex flex="1">
        <Sidebar />
        <Box as="main" flex="1" overflow="auto">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;