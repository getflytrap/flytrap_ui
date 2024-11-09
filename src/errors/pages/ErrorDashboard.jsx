import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

import Sidebar from "../components/Sidebar";
import { getAllProjects, getProjectsForUser } from "../../services/data";

const PROJECT_LIMIT_PER_PAGE = 10;

export default function ErrorDashboard(props) {
  const location = useLocation();

  let selection;
  if (location.state) {
    selection = location.state.selection;
  }
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(selection);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  useEffect(() => {
    fetchProjectsForUser();
  }, []);

  // async function fetchProjects(pageToRequest = 1) {
  //   try {
  //     const { data } = await getAllProjects(
  //       pageToRequest,
  //       PROJECT_LIMIT_PER_PAGE
  //     );
  //     // console.log("projects:", data);

  //     // dummy data
  //     // let dummy = {
  //     //   status: "success",
  //     //   data: {
  //     //     projects: [
  //     //       {
  //     //         uuid: "e61d40f6-04c5-46a6-b24f-8f9abfa7cc2a",
  //     //         name: "React Shopping Cart App",
  //     //         issue_count: 3,
  //     //       },
  //     //       {
  //     //         uuid: "0b9c13ed-8b72-42a4-b4b0-35f15c13be33",
  //     //         name: "Express Shopping Cart App",
  //     //         issue_count: 5,
  //     //       },
  //     //       {
  //     //         uuid: "c8d95fbf-63a7-479f-988d-f3fdf3a63489",
  //     //         name: "Flask App",
  //     //         issue_count: 2,
  //     //       },
  //     //     ],
  //     //     total_pages: 1,
  //     //     current_page: 1,
  //     //   },
  //     // };

  //     if (!selectedProject) {
  //       setSelectedProject(data.projects[0]);
  //     }

  //     setLoadedProjects(data.projects);
  //     setCurrentPage(data.current_page);
  //     setTotalPages(data.total_pages);
  //   } catch (e) {
  //     alert(e.message);
  //   }
  // }

  async function fetchProjectsForUser(pageToRequest = 1) {
    try {
      // const { data } = await getProjectsForUser(
      //   pageToRequest,
      //   PROJECT_LIMIT_PER_PAGE
      // );

      // dummy data
      let data = {
        projects: [
          {
            uuid: "e61d40f6-04c5-46a6-b24f-8f9abfa7cc2a",
            name: "DUMMY React Shopping Cart App",
            issue_count: 3,
          },
          {
            uuid: "0b9c13ed-8b72-42a4-b4b0-35f15c13be33",
            name: "DUMMY Express Shopping Cart App",
            issue_count: 5,
          },
          {
            uuid: "c8d95fbf-63a7-479f-988d-f3fdf3a63489",
            name: "DUMMY Flask App",
            issue_count: 2,
          },
        ],
        total_pages: 1,
        current_page: 1,
      };

      if (!selectedProject) {
        setSelectedProject(data.projects[0]);
      }

      setLoadedProjects(data.projects);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
    } catch (e) {
      alert(e.message);
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
            fetchProjectsForUser={fetchProjectsForUser}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </GridItem>

        <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="40px">
          <Outlet
            context={{
              selectedProject,
            }}
          />
        </GridItem>
      </Grid>
    </div>
  );
}
