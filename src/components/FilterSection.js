import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import crossIcon from "../assets/svg/cross.svg";
import moment from "moment";
import { refactorLogs } from "../Utils/helperFunction";

const FilterSection = ({ logs, setFilteredLogs, filters, setFilters }) => {
  const [selectedTimeStamps, setSelectedTimeStamps] = useState({
    start: null,
    end: null,
  });

  console.log("logs", logs);
  console.log("setFilteredLogs", setFilteredLogs);
  console.log("filters", filters);
  console.log("setFilters", setFilters);

  const handleFilterSet = (field) => {
    console.log("field", field.value);

    setFilters((prevState) => {
      let newFilters = [];
      if (prevState.length > 0) {
        newFilters = [...prevState];
      }

      if (!newFilters.includes(field.value)) {
        newFilters.push(field.value);
      }
      return newFilters;
    });
  };

  const handleFilterRemove = (field) => {
    setFilters((prevState) => {
      const newFilters = { ...prevState };
      delete newFilters[field];
      return newFilters;
    });
  };

  const handleFilterReset = () => {
    setFilters([]);
    setFilteredLogs(logs);
  };

  const handleFilterSubmit = () => {
    if (filters) {
      let resultLogs = logs;
      if (filters.includes("Timestamp")) {
        resultLogs = logs.filter(
          (log) =>
            moment(log.timestamp).format("lll") >= selectedTimeStamps.start &&
            moment(log.timestamp).format("lll") <= selectedTimeStamps.end
        );
      }
      setFilteredLogs(refactorLogs(resultLogs));
    }
  };

  return (
    <div className="filter-container">
      <Dropdown
        className="set-filter-dropdown"
        value="Set Filter"
        options={["Timestamp", "Source", "Destination", "Flags", "Payload"]}
        placeholder="Set Filter"
        onChange={(e) => handleFilterSet(e)}
      />
      <div className="filters-row">
        {filters.length > 0 &&
          filters.map((filter, index) => (
            <div key={index} className="filter-wrapper">
              {filter === "Timestamp" && (
                <div className="single-filter">
                  <div>{filter}</div>
                  <InputText
                    className="input-text"
                    value={selectedTimeStamps.start}
                    placeholder="Start"
                    onChange={(e) =>
                      setSelectedTimeStamps({
                        ...selectedTimeStamps,
                        start: e.target.value,
                      })
                    }
                  />
                  <InputText
                    className="input-text"
                    value={selectedTimeStamps.end}
                    placeholder="End"
                    onChange={(e) =>
                      setSelectedTimeStamps({
                        ...selectedTimeStamps,
                        end: e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={() => {
                      handleFilterRemove(filter);
                    }}
                  >
                    <img
                      className="h-2 w-2"
                      src={crossIcon}
                      alt="cross icon"
                    ></img>
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      {filters.length > 0 && (
        <>
          <Button
            className="filter-submit-button"
            label="Submit"
            onClick={handleFilterSubmit}
          />
          <Button
            className="filter-remove-button"
            label="Reset"
            onClick={handleFilterReset}
          />
        </>
      )}
    </div>
  );
};

export default FilterSection;
