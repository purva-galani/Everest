'use client';
import React, { useState, useEffect, useRef } from "react";
import { Chart } from 'chart.js/auto'; 

export default function CardLineChart() {
  const [selectedOption, setSelectedOption] = useState("New");
  const [chartData, setChartData] = useState({
    New: [],
    Paid: [],
    Pending: [],
  });
  const chartRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/lead/getLeadsByStatus?status=${selectedOption}`);
        const data = await response.json();
        console.log("Fetched data:", data); // Debug log
        if (data.success) {
          const leads = data.data;
          const amounts = leads.map(lead => lead.amount);
          setChartData(prevState => ({
            ...prevState,
            [selectedOption]: amounts,
          }));
        }
      } catch (error) {
        console.error("Error fetching lead data:", error);
      }
    };
    

    fetchData();
  }, [selectedOption]);
  
  // Effect to initialize the chart
  useEffect(() => {
    const ctx = document.getElementById("line-chart").getContext("2d");

    // Destroy the previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
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
        plugins: {
          legend: {
            labels: {
              color: "white", // Update font color for legend
            },
            align: "end",
            position: "bottom",
          },
          title: {
            display: false,
            text: "Sales Charts",
            color: "white",
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(240, 22, 22, 0.7)", // Update font color for x-axis
            },
            grid: {
              display: false,
              color: "rgba(33, 37, 41, 0.3)",
            },
          },
          y: {
            ticks: {
              color: "rgba(241, 8, 8, 0.7)", // Update font color for y-axis
            },
            grid: {
              color: "rgba(250, 13, 13, 0.15)",
            },
          },
        },
      },
    });

    // Cleanup the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [selectedOption]);

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
              <h2 className="text-white text-blueGray-100 font-semibold">Invoice value</h2>
            </div>
            {/* Dropdown to select chart data */}
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Set a fixed width (w-32)
            >
              <option value="New">New</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
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
