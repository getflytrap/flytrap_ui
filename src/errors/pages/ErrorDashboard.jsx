import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

import Sidebar from "../components/Sidebar";

// Sidebar: selectedProject, setSelectedProject, projects
// ED: selectedProject, setSelectedProject

export default function ErrorDashboard(props) {
  const location = useLocation();

  let selection;
  if (location.state) {
    selection = location.state.selection;
  }
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(selection);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects(pageToRequest = 1) {
    try {
      // const { data } = await getAllProjects(
      //   pageToRequest,
      //   PROJECT_LIMIT_PER_PAGE
      // );
      // console.log("projects:", data);

      // dummy data
      let data = {
        status: "success",
        data: {
          projects: [
            {
              uuid: "6f4c2c48-bf42-4f8e-ae1c-f5c53e87bcd1",
              name: "React Shopping Cart App",
              issue_count: 3,
            },
            {
              uuid: "6f4c2c48-bf42-4f8e-ae1c-f5c53e87234",
              name: "Express Shopping Cart App",
              issue_count: 5,
            },
            {
              uuid: "6f4c2c48-bf42-4f8e-ae1c-f5444447bcd1",
              name: "Flask App",
              issue_count: 2,
            },
          ],
          total_pages: 1,
          current_page: 1,
        },
      };

      if (!selectedProject) {
        setSelectedProject(data.projects[0]);
      }

      setLoadedProjects(data.projects);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
    } catch (e) {
      alert("Couldn't fetch project data");
    }
  }

  return (
    <div className="site-wrapper">
      <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          bg="purple.400"
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
        >
          <Sidebar
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            projects={loadedProjects}
          />
        </GridItem>

        <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="40px">
          <Outlet
            context={{
              selectedProject,
              setSelectedProject,
              projects: loadedProjects,
            }}
          />
        </GridItem>
      </Grid>
    </div>
  );
}
