import { Box } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router"
import Layout from "@/components/layout/Layout"
import Dashboard from "@/pages/Dashboard"
import { useEffect } from "react";
import ProjectBoard from "@/pages/ProjectBoard";
import { useMyStore } from "./store/store";
import { useShallow } from "zustand/shallow";
import { mockProjects, mockTasks } from "@/utils/const";

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
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects/:projectId" element={<ProjectBoard />} />
        </Route>
      </Routes>
    </Box>
  )
}

export default App
