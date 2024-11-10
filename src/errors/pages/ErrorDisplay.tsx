import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorsTable from "../components/ErrorsTable";
import FilterBar from "../components/FilterBar";
import { HandledFilter, TimeFilter } from "../../types";

const ErrorDisplay = () => {
  const [selectedHandled, setSelectedHandled] = useState<HandledFilter>("All");
  const [selectedTime, setSelectedTime] = useState<TimeFilter>("Forever");
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { handled, time } = location.state;
      
      if (handled) {
        setSelectedHandled(handled);
      }
      if (time) {
        setSelectedTime(time);
      }
    }
  }, [location.state]);

  return (
    <>
      <FilterBar
        selectedHandled={selectedHandled}
        setSelectedHandled={setSelectedHandled}
        setSelectedTime={setSelectedTime}
      />
      <ErrorsTable 
        selectedHandled={selectedHandled}
        selectedTime={selectedTime}
      />
    </>
  );
}

export default ErrorDisplay;