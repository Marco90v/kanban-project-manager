import { Box } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router"
import Layout from "@/components/layout/Layout"
import Dashboard from "@/pages/Dashboard"
import { useEffect } from "react";
import { useProjectStore } from "./store/projectStore";
import ProjectBoard from "@/pages/ProjectBoard";

function App() {
   const { fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
