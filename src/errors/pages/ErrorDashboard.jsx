import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

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

  return <ul>{currentErrors}</ul>;
}
