import React, { useState } from "react";
import { FILTER_OPTIONS } from "../Utils/constants";

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    if (selectedFilter === "TimeStamp") {
      setSelectedFilters((prevFilters) => [
        ...prevFilters,
        { filter: selectedFilter, options: ["1h", "24h"] },
      ]);
    }
    // Add more conditions here for other filters
  };

  return (
    <div className="logs-filter">
      <select className="select" onChange={handleFilterChange}>
        <option value="">Select a filter</option>
        {FILTER_OPTIONS.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedFilters.map((filterObj, index) => (
        <div key={index} className="filter-row">
          <span>{filterObj.filter}</span>
          <select className="select">
            {filterObj.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default Filter;
