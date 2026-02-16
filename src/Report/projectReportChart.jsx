import React, { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import data from "../Store/Data.json";

function ProjectReportChart() {
  const chartData = data.projectReport.chart;
  const [hoveredDot, setHoveredDot] = useState(null);
  
  // Handle dot actions
  const handleDotAction = (action) => {
    switch(action) {
      case 'delete':
        console.log('Delete Project Report Chart');
        // Add your delete logic here
        // Example: onDelete && onDelete();
        break;
      case 'refresh':
        console.log('Refresh Project Report Data');
        // Add your refresh logic here
        // Example: fetchNewData();
        break;
      case 'minimize':
        console.log('Toggle Minimize/Maximize');
        // Add your minimize/maximize logic here
        // Example: setIsMinimized(!isMinimized);
        break;
      default:
        break;
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Project Report</h3>
        <div className="flex gap-2 relative">
          {/* Red dot - Delete */}
          <div className="relative">
            <button
              className="w-3 h-3 bg-red-400 rounded-full hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
              onMouseEnter={() => setHoveredDot('delete')}
              onMouseLeave={() => setHoveredDot(null)}
              onClick={() => handleDotAction('delete')}
              aria-label="Delete chart"
              title="Delete"
            >
              <span className="sr-only">Delete</span>
            </button>
            
            {/* Tooltip for delete */}
            {hoveredDot === 'delete' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap shadow-lg">
                  Delete
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900"></div>
                </div>
              </div>
            )}
          </div>

          {/* Yellow dot - Refresh */}
          <div className="relative">
            <button
              className="w-3 h-3 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
              onMouseEnter={() => setHoveredDot('refresh')}
              onMouseLeave={() => setHoveredDot(null)}
              onClick={() => handleDotAction('refresh')}
              aria-label="Refresh chart"
              title="Refresh"
            >
              <span className="sr-only">Refresh</span>
            </button>
            
            {/* Tooltip for refresh */}
            {hoveredDot === 'refresh' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap shadow-lg">
                  Refresh
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900"></div>
                </div>
              </div>
            )}
          </div>

          {/* Green dot - Minimize/Maximize */}
          <div className="relative">
            <button
              className="w-3 h-3 bg-green-400 rounded-full hover:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
              onMouseEnter={() => setHoveredDot('minimize')}
              onMouseLeave={() => setHoveredDot(null)}
              onClick={() => handleDotAction('minimize')}
              aria-label="Minimize or maximize chart"
              title="Minimize/Maximize"
            >
              <span className="sr-only">Minimize/Maximize</span>
            </button>
            
            {/* Tooltip for minimize/maximize */}
            {hoveredDot === 'minimize' && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap shadow-lg">
                  Minimize/Maximize
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b5bfd" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3b5bfd" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="orange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(v) => `${v}K`} />
          <Tooltip
            formatter={(value, name) => [
              `${value}K`,
              name === "tasks"
                ? "Tasks Completed"
                : name === "completed"
                ? "Project Completed"
                : "Upcoming Project"
            ]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Area
            type="monotone"
            dataKey="tasks"
            stroke="#3b5bfd"
            strokeDasharray="5 5"
            fill="url(#blue)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="completed"
            stroke="#22c55e"
            strokeDasharray="5 5"
            fill="url(#green)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="upcoming"
            stroke="#f59e0b"
            strokeDasharray="5 5"
            fill="url(#orange)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
 
export default ProjectReportChart;