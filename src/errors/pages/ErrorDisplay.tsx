import { useState } from "react";
import ErrorsTable from "../components/ErrorsTable";
import FilterBar from "../components/FilterBar";
import { HandledFilter, TimeFilter } from "../../types";

const ErrorDisplay = () => {
  const [selectedHandled, setSelectedHandled] = useState<HandledFilter>("All");
  const [selectedTime, setSelectedTime] = useState<TimeFilter>("Forever");

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