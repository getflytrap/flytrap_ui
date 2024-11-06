import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { getErrors } from "../../services/data";

import ErrorsTable from "../components/ErrorsTable";
import FilterBar from "../components/FilterBar";

const ERROR_LIMIT_PER_PAGE = 10;

export default function ErrorDashboard({ selectedProject }) {
  const location = useLocation();

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
    console.log(convertToTimeStamp(selectedTime));

    try {
      const data = await getErrors(
        selectedProject?.project_id,
        convertHandledToBoolean(selectedHandled),
        convertToTimeStamp(selectedTime),
        pageToRequest,
        ERROR_LIMIT_PER_PAGE
      );

      setCurrentErrors(data.errors);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
    } catch (err) {
      alert(err.message);
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
        pastDate = new Date(0);
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
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
