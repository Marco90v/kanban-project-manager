import { Navigate, Route, Routes } from "react-router"
import { lazy, Suspense, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useMyStore } from "@/store/store";
import { Box } from "@chakra-ui/react"
import Layout from "@/components/layout/Layout"
import { colors, mockProjects, mockTasks } from "@/utils/const";;
import Loading from "@/components/Loading";
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const ProjectBoard = lazy(() => import('@/pages/ProjectBoard'));

function App() {

  const { projects, setProjects, tasks, setTasks } = useMyStore(
    useShallow( (state => ({
      projects: state.Projects,
      tasks: state.Tasks,
      setProjects: state.setProjects,
      setTasks: state.setTasks,
    })))
  );

  useEffect(() => {
    if(projects?.length === 0) setProjects(mockProjects);
    if(tasks?.length === 0) setTasks(mockTasks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box minH="100vh" bg={{base:"gray.50", _dark:colors.bgDark}} color={{base:"gray.800", _dark:"white"}}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects/:projectId" element={<ProjectBoard />} />
          </Route>
        </Routes>
      </Suspense>
    </Box>
  )
}

export default App
