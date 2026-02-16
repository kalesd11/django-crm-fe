import React from "react";
import { Upload, MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";
import Navbar from "../Utility/Navbar";
import Header from "../Utility/Header";
import DashboardFooter from "../Utility/Footer";
import data from "../Store/Data.json";
import Table from "../Utility/Table";

function Storage() {
  const user = useSelector((state) => state.auth.user);
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);

  const projectFiles = data.storage?.recentFiles || [];

  const storageProviders = data.Application?.storage || [
    {
      id: 1,
      name: "Dropbox Storage",
      used: 5.68,
      total: 15,
      color: "bg-blue-600",
      lastActivity: "3 Hours Ago",
      icon: "https://cdn-icons-png.flaticon.com/512/888/888847.png",
    },
    {
      id: 2,
      name: "Google Drive",
      used: 4.75,
      total: 10,
      color: "bg-red-500",
      lastActivity: "5 Hours Ago",
      icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    },
    {
      id: 3,
      name: "Box Storage",
      used: 3.64,
      total: 10,
      color: "bg-cyan-500",
      lastActivity: "26 Aug, 2022",
      icon: "https://cdn-icons-png.flaticon.com/512/888/888870.png",
    },
  ];

  const recentFiles = [
    { id: 1, type: "ZIP", color: "bg-green-500" },
    { id: 2, type: "PNG", color: "bg-purple-500" },
    { id: 3, type: "PDF", color: "bg-red-500" },
    { id: 4, type: "PSD", color: "bg-blue-400" },
  ];

  const columns = [
    {
      header: "Name",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3 font-medium">
          <span className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs">
            {row.type}
          </span>
          {row.name}
        </div>
      ),
    },
    { header: "Size", accessor: "size" },
    { header: "Upload", accessor: "upload" },
    {
      header: "Members",
      accessor: "members",
      render: (row) => (
        <span className="text-blue-600">{row.members}+ members</span>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <Header title="Storage" subtitle="Applications / Storage" user={user} />

        <div
          className="pt-[100px] px-6 pb-6"
          style={{ paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem" }}
        >
          {/* Upload Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Storage</h2>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Upload size={16} /> Upload Files
            </button>
          </div>

          {/* Cloud Storage */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Cloud Storage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storageProviders.map((sp) => {
                const percent = Math.min((sp.used / sp.total) * 100, 100);

                return (
                  <div key={sp.id} className="bg-white rounded-xl shadow p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img src={sp.icon} alt="" className="w-8 h-8" />
                        <div>
                          <h4 className="font-semibold">{sp.name}</h4>
                          <p className="text-xs text-gray-500">
                            {sp.used}GB / {sp.total}GB
                          </p>
                        </div>
                      </div>
                      <MoreVertical size={18} className="text-gray-400" />
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                      <div
                        className={`h-2 rounded-full ${sp.color}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <p className="text-xs text-gray-500">
                      Last Activity: {sp.lastActivity}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Files */}
          <div>
            <h3 className="font-semibold mb-4">Recent Files</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-3"
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${file.color} flex items-center justify-center text-white font-bold`}
                  >
                    {file.type}
                  </div>
                  <p className="text-sm font-medium">UX/UI Templates</p>
                  <p className="text-xs text-gray-400">
                    Project / Dashboard / Webapps
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Files Table */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg">Project Files</h3>
                <p className="text-sm text-gray-500">
                  Recent project files (Last access 24 min ago)
                </p>
              </div>
              <button className="text-xs px-4 py-2 border rounded-lg hover:bg-gray-100">
                View More
              </button>
            </div>

            <Table
              data={projectFiles}
              columns={columns}
              actions={() => (
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical size={16} />
                </button>
              )}
            />
          </div>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default Storage;
