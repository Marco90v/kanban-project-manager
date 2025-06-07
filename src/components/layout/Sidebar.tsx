import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Box, VStack, Text, Flex, Heading, Icon, useBreakpointValue, Drawer, Portal, CloseButton } from '@chakra-ui/react';
import { LayoutDashboard, FolderKanban, Users, Calendar, Settings, ChevronRight, LucideIcon } from 'lucide-react';
import { useMyStore } from '@/store/store';
import { useShallow } from 'zustand/shallow';
import { colors } from '@/utils/const';

const Sidebar = () => {
  const { projects } = useMyStore(
    useShallow( (state => ({
      projects: state.Projects
    })))
  );

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [isOpen, setOpen] = useState(false);

  // Close drawer when navigating on mobile
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, isMobile, setOpen]);

  const sidebarContent = (
    <VStack align="stretch" gap={6} py={6}>
      <VStack align="stretch" px={4}>
        <Heading size="sm" color={{_dark:"gray.200", base:"gray.500"}} mb={2} pl={2}>MENU</Heading>
        
        <VStack align="stretch" gap={1}>
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            isActive={location.pathname === '/dashboard'}
            onClick={() => navigate('/dashboard')}
          />
          <SidebarItem 
            icon={Calendar} 
            label="Calendar" 
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem 
            icon={Users} 
            label="Team" 
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            isActive={false}
            onClick={() => {}}
          />
        </VStack>
      </VStack>
      
      {projects.length > 0 && (
        <VStack align="stretch" px={4}>
          <Heading size="sm" color={{_dark:"gray.200", base:"gray.500"}} mb={2} pl={2}>PROJECTS</Heading>
          
          <VStack align="stretch" gap={1}>
            {projects.map(project => (
              <SidebarItem 
                key={project.id}
                icon={FolderKanban} 
                label={project.name} 
                isActive={location.pathname === `/projects/${project.id}`}
                onClick={() => navigate(`/projects/${project.id}`)}
              />
            ))}
          </VStack>
        </VStack>
      )}
    </VStack>
  );

  // Display based on screen size
  if (isMobile) {
    return (
      <>
        <Box 
          position="fixed" 
          left={4} 
          bottom={4} 
          zIndex={20}
          bg={colors.brand500} 
          // _dark={{bg:colors.brand900}}
          // bg="red.500" 
          // _dark={{bg:"red.900"}}
          color="white"
          w={12}
          h={12}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="lg"
          cursor="pointer"
          onClick={() => setOpen(true)}
        >
          <ChevronRight size={24} />
        </Box>

        <Drawer.Root placement='start' open={isOpen} onOpenChange={(e) => setOpen(e.open)} >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header borderBottomWidth="1px" bg={{_dark:colors.bgDark, base:"white"}}>
                  {/* <Drawer.Title>Drawer Title</Drawer.Title> */}
                   <Flex align="center">
                    <FolderKanban size={20} color={colors.brand500} />
                    <Drawer.Title ml={2} fontWeight="bold" color={colors.brand500}>
                      KanbanFlow
                    </Drawer.Title>
                  </Flex>
                </Drawer.Header>
                <Drawer.Body p={0} bg={{_dark:colors.bgDark, base:"white"}}>
                  {sidebarContent}
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </>
    );
  }

  return (
    <Box 
      as="aside" 
      w="240px" 
      bg="white" 
      _dark={{bg:colors.bgDark, borderRightColor:"gray.700"}}
      // bg="#30BFCD"
      // _dark={{bg:"red.900"}}
      borderRightWidth="1px"
      borderRightColor="gray.200"
      height="calc(100vh - 56px)"
      position="sticky"
      top="56px"
      overflowY="auto"
    >
      {sidebarContent}
    </Box>
  );
};

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon, label, isActive, onClick }: SidebarItemProps) => {
  return (
    <Flex
      align="center"
      py={2}
      px={3}
      borderRadius="md"
      cursor="pointer"
      bg={isActive ? '#E6F8FA' : 'transparent'}
      _dark={{color:isActive ? '#1D737B' : 'gray.500'}}
      color={isActive ? '#1D737B' : 'gray.700'}
      fontWeight={isActive ? 'semibold' : 'normal'}
      _hover={{ bg: isActive ? '#E6F8FA' : 'gray.100' }}
      transition="all 0.2s"
      onClick={onClick}
    >
      <Icon as={icon} mr={3} boxSize={5} />
      <Text>{label}</Text>
    </Flex>
  );
};

export default Sidebar;