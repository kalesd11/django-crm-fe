import React from "react";
import { useSelector } from "react-redux";

import data from "../Store/Data.json";
import Navbar from "../Utility/Navbar";
import Header from "../Utility/Header";
import PaymentChart from "../PaymentChart";
import DashboardFooter from "../Utility/Footer";
import ProjectReportChart from "./projectReportChart";
import ProjectCalendar from "./ProjectCalendar";
import Table from "../Utility/Table";

function ProjectReport() {
  const user = useSelector((state) => state.auth.user);
  const { stats,teamProgress,activeProjects,   projectsDetails, paymentStatsProjects } =
    data.projectReport;
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);

  const leadActions = () => (
    <button className="text-gray-400 hover:text-gray-600">⋮</button>
  );
  const columns = [
    {
      header: "Project",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-2">
          <img src={row.icon} className="w-6 h-6 rounded-full" alt={row.name} />
          <div>
            <div className="font-semibold">{row.name}</div>
            <div className="text-gray-400 text-xs">{`Project: ${row.manager}`}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Budget",
      accessor: "budget",
      align: "text-center",
      render: (row) => <span className="font-medium">{row.budget}</span>,
    },
    {
      header: "Stage",
      accessor: "stage",
      align: "text-center",
      render: (row) => (
        <div className="flex justify-center gap-1">
          {row.stage.map((s, i) => (
            <span key={i} className={`w-4 h-2 rounded-full ${s}`}></span>
          ))}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      align: "text-center",
      render: (row) => {
        let statusColor = "bg-gray-200 text-gray-600";
        if (row.status === "In Progress")
          statusColor = "bg-blue-100 text-blue-600";
        if (row.status === "On Hold")
          statusColor = "bg-orange-100 text-orange-600";
        if (row.status === "Completed")
          statusColor = "bg-green-100 text-green-600";
        if (row.status === "Upcoming")
          statusColor = "bg-teal-100 text-teal-600";
        return (
          <span className={`px-2 py-1 rounded text-xs ${statusColor}`}>
            {row.status}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessor: "action",
      align: "text-center",
      render: (row) => (
        <button className="text-gray-400 hover:text-gray-600">→</button>
      ),
    },
  ];

  return (
    <div className="flex h-full bg-gray-100">
      <Navbar />

      <div className="flex-1">
        <Header
          title="Project Report"
          subtitle="Reports / Projects"
          user={user}
        />

        <div
          className="pt-[100px] px-6 space-y-6"
          style={{
            paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
          }}
        >
          {/* ===== TOP STATS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl shadow">
                <p className="text-sm text-gray-500">{s.title}</p>
                <h2 className="text-2xl font-bold mt-2">{s.value}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    s.positive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {s.change}
                </span>
              </div>
            ))}
          </div>

          {/* ===== PROJECT REPORT + CALENDAR ===== */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="xl:col-span-2 bg-white rounded-xl p-6 shadow">
              <ProjectReportChart />
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-xl shadow p-5 min-h-[420px]">
              <ProjectCalendar />
            </div>
          </div>
           
          {/* ===== HOURS SPENT + TEAM PROGRESS + ACTIVE PROJECT ===== */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {/* Hours Spent Chart - Column 1 */}
  <div className="bg-white rounded-xl   shadow">
    <PaymentChart 
      title="Hours Spent"
      data={paymentStatsProjects ? paymentStatsProjects.map(item => ({
        month: item.day,
        rejected: item.unbillableHours,
        completed: item.billableHours,
        awaiting: item.totalHours
      })) : []}
      chartType="hours"
      billableLabel="Billable Hours"
      unbillableLabel="Unbillable Hours"
    />
  </div>

  {/* Team Progress - Column 2 */}
  <div className="bg-white rounded-xl shadow p-5">
    <h3 className="font-semibold text-lg mb-4">Team Progress</h3>
    <div className="space-y-4">
      {teamProgress.map((member, index) => (
        <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
          <div className="flex items-center gap-3">
            {member.avatar ? (
              <img src={member.avatar} className="w-10 h-10 rounded-full" alt={member.name} />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {member.initials}
              </div>
            )}
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-lg">{member.progress}%</div>
            <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${member.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Active Project - Column 3 */}
  <div className="bg-white rounded-xl shadow p-5">
    <h3 className="font-semibold text-lg mb-4">Active Project</h3>
    <div className="space-y-4">
      {activeProjects.map((project, index) => (
        <div key={project.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center`}>
              <img src={project.icon} className="w-6 h-6 filter invert" alt={project.name} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-medium truncate">{project.name}...</p>
                <span className="font-bold">{project.progress}%</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{project.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${project.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Upcoming Projects Button */}
    <button className="w-full mt-6 py-3 text-center text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition">
      UPCOMING PROJECTS →
    </button>
  </div>
</div>



          {/* ===== PROJECTS TABLE ===== */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold text-lg mb-4">Projects Stats</h3>
            <Table
              data={projectsDetails}
              columns={columns}
              actions={leadActions}
            />
          </div>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default ProjectReport;
