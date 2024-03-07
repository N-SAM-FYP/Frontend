import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../../assets/css/charts.css";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = ({ chartData }) => {
  console.log("chartData", chartData);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Payload size per hour",
    },
    axisY: {
      title: "Payload Size",
    },
    axisX: {
      title: "Hour of the day",
      prefix: "H",
      interval: 1,
    },
    data: [
      {
        type: "line",
        toolTipContent: "Hour {x}: {y}",
        dataPoints: chartData,
      },
    ],
  };

  return (
    <div className="chart">
      <CanvasJSChart options={options} />
    </div>
  );
};

export default LineChart;
