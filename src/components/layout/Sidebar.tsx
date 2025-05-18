import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  Box, 
  VStack, 
  Text, 
  Flex, 
  Heading, 
  Icon, 
  useBreakpointValue,
  // useDisclosure,
  // Drawer,
  // DrawerOverlay,
  // DrawerContent,
  // DrawerCloseButton,
  // DrawerHeader,
  // DrawerBody,
} from '@chakra-ui/react';
import { 
  LayoutDashboard, 
  FolderKanban,
  Users,
  Calendar,
  Settings,
  ChevronRight
} from 'lucide-react';
// import { useProjectStore } from '../../store/projectStore';
import { useMyStore } from '@/store/store';
import { useShallow } from 'zustand/shallow';

const Sidebar = () => {
  const { projects } = useMyStore(
    useShallow( (state => ({
      projects: state.Projects
    })))
  );


  const navigate = useNavigate();
  const location = useLocation();
  // const { projects } = useProjectStore();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setOpen] = useState(false);

  // Close drawer when navigating on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      // onClose();
      setOpen(false);
    }
  }, [location.pathname, isMobile, isOpen, setOpen]);

  const sidebarContent = (
    <VStack align="stretch" gap={6} py={6}>
      <VStack align="stretch" px={4}>
        <Heading size="sm" color="gray.500" mb={2} pl={2}>MENU</Heading>
        
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
          <Heading size="sm" color="gray.500" mb={2} pl={2}>PROJECTS</Heading>
          
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
          bg="brand.500" 
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
        
        {/* <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              <Flex align="center">
                <FolderKanban size={20} color="#30BFCD" />
                <Text ml={2} fontWeight="bold" color="brand.500">
                  KanbanFlow
                </Text>
              </Flex>
            </DrawerHeader>
            <DrawerBody p={0}>{sidebarContent}</DrawerBody>
          </DrawerContent>
        </Drawer> */}
      </>
    );
  }

  return (
    <Box 
      as="aside" 
      w="240px" 
      bg="white" 
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
  icon: any;
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
      bg={isActive ? 'brand.50' : 'transparent'}
      color={isActive ? 'brand.700' : 'gray.700'}
      fontWeight={isActive ? 'semibold' : 'normal'}
      _hover={{ bg: isActive ? 'brand.50' : 'gray.100' }}
      transition="all 0.2s"
      onClick={onClick}
    >
      <Icon as={icon} mr={3} boxSize={5} />
      <Text>{label}</Text>
    </Flex>
  );
};

export default Sidebar;