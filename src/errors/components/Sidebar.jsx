import React, { useState, useEffect } from "react";

export default function Sidebar({ selectedProject, setSelectedProject }) {
    const navigate = useNavigate();
  
    const [loadedProjects, setLoadedProjects] = useState([]);
  
    useEffect(() => {
      fetchProjects();
    }, []);
  
    async function fetchProjects(pageToRequest = 1) {
      try {
        const data = await getAllProjects(pageToRequest, PROJECT_LIMIT_PER_PAGE);
        console.log(data.projects);
  
        setLoadedProjects(data.projects);
        setCurrentPage(data.current_page);
        setTotalPages(data.total_pages);
      } catch (e) {
        alert("Couldn't fetch project data");
      }
    }
    return (
        <ul>
            {loadedProjects}
        </ul>
    )


