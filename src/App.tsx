import { Box } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router"
import Layout from "@/components/layout/Layout"
import Dashboard from "@/pages/Dashboard"
import { useEffect } from "react";
// import { useProjectStore } from "./store/projectStore";
import ProjectBoard from "@/pages/ProjectBoard";
import { useMyStore } from "./store/store";
import { useShallow } from "zustand/shallow";
// import { get } from "react-hook-form";
import { mockProjects, mockTasks } from "@/utils/const";

function App() {

  const { setProjects, setTasks } = useMyStore(
    useShallow( (state => ({
      setProjects: state.setProjects,
      setTasks: state.setTasks,
    })))
  );

  useEffect(() => {
    setProjects(mockProjects);
    setTasks(mockTasks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const { fetchProjects } = useProjectStore();

  // useEffect(() => {
  //   fetchProjects();
  // }, [fetchProjects]);

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
