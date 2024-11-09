import React, { useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { getErrors } from "../../services/index";

import ErrorsTable from "../components/ErrorsTable";
import FilterBar from "../components/FilterBar";

const ERROR_LIMIT_PER_PAGE = 10;

export default function ErrorDisplay() {
  const location = useLocation();
  const { selectedProject } = useOutletContext();

  const [currentErrors, setCurrentErrors] = useState([]);
  const [selectedHandled, setSelectedHandled] = useState(
    location.state?.handled || "All"
  );
  const [selectedTime, setSelectedTime] = useState(
    location.state?.time || "Forever"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchErrors();
  }, [selectedProject, selectedHandled, selectedTime]); // currentPage cannot be in here or it causes an infinite loop

  async function prevPage() {
    fetchErrors(currentPage - 1);
  }

  async function nextPage() {
    fetchErrors(currentPage + 1);
  }

  async function fetchErrors(pageToRequest = 1) {
    if (!selectedProject) {
      return;
    }

    try {
      console.log("selected Project:", selectedProject);
      const data = await getErrors(
        selectedProject?.uuid,
        convertHandledToBoolean(selectedHandled), // null for "All"
        convertToTimeStamp(selectedTime),
        pageToRequest,
        ERROR_LIMIT_PER_PAGE
      );

      console.log("from error dashboard", data);
      setCurrentErrors(data.errors);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      // alert(err.message);
    }
  }

  function convertHandledToBoolean(handled) {
    if (handled === "Handled") {
      return true;
    } else if (handled === "Unhandled") {
      return false;
    } else {
      return null;
    }
  }

  function convertToTimeStamp(period) {
    const now = new Date();
    let pastDate;

    switch (period) {
      case "Today":
        pastDate = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
        break;
      case "Last 7 days":
        pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "Last 14 days":
        pastDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        break;
      case "Last 30 days":
        pastDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "Last 90 days":
        pastDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "Forever":
        pastDate = new Date(now.getTime() - 10000 * 24 * 60 * 60 * 1000);
        break;
      default:
        throw new Error("Invalid period provided.");
    }

    return pastDate.toISOString();
  }

  return (
    <>
      <FilterBar
        selectedHandled={selectedHandled}
        setSelectedHandled={setSelectedHandled}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <ErrorsTable
        errors={currentErrors}
        selectedHandled={selectedHandled}
        selectedTime={selectedTime}
        selectedProject={selectedProject}
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
