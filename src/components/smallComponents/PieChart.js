import React from "react";
import "../../assets/css/charts.css";

import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ ipType, chartData }) => {
  console.log(chartData);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      text: `Top ${ipType} IP Addresses`,
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}",
        startAngle: -90,
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

export default PieChart;
