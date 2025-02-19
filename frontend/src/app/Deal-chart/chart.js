'use client';
import React, { useState, useEffect } from "react";
import Chart from "chart.js";

export default function CardLineChart() {
  // State to track the selected dropdown value
  const [selectedOption, setSelectedOption] = useState("New");

  // Data for each option
  const chartData = {
    New: [65, 78, 66, 44, 56, 67, 75],
    Discussion: [40, 68, 86, 74, 56, 60, 87],
    Demo: [55, 60, 70, 80, 65, 75, 90],
    Proposal: [45, 55, 60, 68, 50, 77, 95],
    Decided: [50, 70, 80, 65, 90, 85, 100]
  };

  // Effect to initialize the chart
  useEffect(() => {
    const config = {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: chartData[selectedOption], // Use selected option data
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#A9A9A9",
            borderColor: "#A9A9A9",
            data: chartData[selectedOption], // Use selected option data
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(240, 22, 22, 0.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(241, 8, 8, 0.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(250, 13, 13, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);

    // Cleanup the chart on component unmount
    return () => {
      if (window.myLine) {
        window.myLine.destroy();
      }
    };
  }, [selectedOption]); // Re-run the effect when selectedOption changes

  // Handler to update the selected dropdown option
  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-blueGray-100 font-semibold">Deal value</h2>
            </div>
            {/* Dropdown to select chart data */}
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Set a fixed width (w-32)
            >
              <option value="New">New</option>
              <option value="Discussion">Discussion</option>
              <option value="Demo">Demo</option>
              <option value="Proposal">Proposal</option>
              <option value="Decided">Decided</option>
            </select>

          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative" style={{ height: "500px", width: "100%" }}>
            <canvas id="line-chart" style={{ height: "100%", width: "100%" }}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
