import { 
  Mail, Phone, MapPin, Calendar, User, Globe, MessageSquare, 
  Download, Printer, Share2, Bell, Wifi, Shield, CreditCard, 
  Activity, Check, X, Eye, Trash2, CreditCard as CardIcon, 
  MoreVertical, CheckCircle, XCircle, RefreshCw, WifiOff, 
  Clock, Users, TrendingUp, Heart, Music, Video, ExternalLink, 
  Lock, Facebook, Globe as GlobeIcon, Users as UsersIcon, 
  Star, Target, Search, Filter, ChevronDown
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";
import Table from "../Utility/Table";
import data from "../Store/Data.json";

function ProjectView() {
  const user = useSelector((state) => state.auth.user);
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get projects data from your data.json
  const projectsData = data.projects || [];
  
  // Filter projects based on search
  const filteredProjects = projectsData.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Set first project as default selected
  React.useEffect(() => {
    if (projectsData.length > 0 && !selectedProject) {
      setSelectedProject(projectsData[0]);
    }
  }, [projectsData, selectedProject]);

  // Handle view button click
  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowDetails(true);
  };

  // Format progress bar color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'in progress': return 'bg-blue-600';
      case 'on hold': return 'bg-yellow-500';
      case 'upcoming': return 'bg-gray-400';
      default: return 'bg-blue-600';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'in progress': return 'bg-blue-100 text-blue-600';
      case 'on hold': return 'bg-yellow-100 text-yellow-600';
      case 'upcoming': return 'bg-gray-100 text-gray-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  // Table columns configuration
  const projectColumns = [
    {
      header: "Project Name",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xs">P</span>
          </div>
          <div>
            <p className="font-medium text-sm">{row.name}</p>
            <p className="text-xs text-gray-500">{row.projectCode}</p>
          </div>
        </div>
      )
    },
    {
      header: "Customer",
      accessor: "customer",
      render: (row) => (
        <div>
          <p className="font-medium text-sm">{row.customer}</p>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(row.status)}`}>
          {row.status}
        </span>
      )
    },
    {
      header: "Progress",
      accessor: "progress",
      render: (row) => (
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>{row.tasksCompleted}/{row.totalTasks}</span>
            <span>{row.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded">
            <div 
              className={`h-1.5 rounded ${getStatusColor(row.status)}`} 
              style={{ width: `${row.progress}%` }} 
            />
          </div>
        </div>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      align: "center",
      render: (row) => (
        <button
          onClick={() => handleViewProject(row)}
          className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 flex items-center gap-1"
        >
          <Eye size={12} />
          View
        </button>
      )
    }
  ];

  // Helper components
  const Info = ({ label, value }) => (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-sm">{value}</p>
    </div>
  );

  const Stat = ({ title, value, icon }) => (
    <div className="bg-gray-50 p-3 rounded-xl flex flex-col gap-2">
      <div className="text-blue-600">{icon}</div>
      <p className="text-xs font-medium">{title}</p>
      <p className="text-base font-bold">{value}</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <Header
          title="Projects"
          subtitle="Projects / View"
          user={user}
        />

        <div
          className="flex-1 px-6 pb-6 flex flex-col overflow-hidden"
          style={{
            paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
            marginTop: "5rem",
          }}
        >
          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            {/* Left Column - Projects Table */}
            <div className={`flex-1 flex flex-col ${showDetails ? 'lg:w-2/3' : 'w-full'}`}>
              {/* Table Header */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">All Projects</h2>
                    <p className="text-sm text-gray-500">Manage and view all your projects</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    {/* Filter Button */}
                    <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                      <Filter size={16} />
                      Filter
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Projects Table */}
              <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-y-auto flex-1">
                  <Table
                    data={filteredProjects}
                    columns={projectColumns}
                    checkSelect={false}
                    onDelete={() => {}}
                  />
                </div>
                
                {/* Table Footer */}
                <div className="border-t p-4">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Showing {filteredProjects.length} of {projectsData.length} projects</span>
                    <div className="flex items-center gap-4">
                      <span>Total Projects: {projectsData.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Project Details (Only shown when showDetails is true) */}
            {showDetails && selectedProject && (
              <div className="lg:w-1/3 flex flex-col overflow-hidden">
                {/* Details Header */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Project Details</h3>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Project Details Card with Scroll */}
                <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                  <div className="overflow-y-auto flex-1 p-4">
                    {/* Header */}
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold">{selectedProject.name}</h2>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded ${getStatusBgColor(selectedProject.status)}`}>
                          {selectedProject.status}
                        </span>
                        <span className="text-xs text-gray-500">{selectedProject.projectCode}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Project Progress</span>
                        <span className="font-medium">{selectedProject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded">
                        <div 
                          className={`h-2 rounded ${getStatusColor(selectedProject.status)}`} 
                          style={{ width: `${selectedProject.progress}%` }} 
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedProject.tasksCompleted} of {selectedProject.totalTasks} tasks completed
                      </p>
                    </div>

                    {/* Project Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Info label="Customer" value={selectedProject.customer} />
                      <Info label="Billing Type" value={selectedProject.billingType} />
                      <Info label="Start Date" value={selectedProject.startDate} />
                      <Info label="End Date" value={selectedProject.endDate} />
                      <Info label="Hourly Rate" value={selectedProject.hourlyRate} />
                      <Info label="Logged Hours" value={selectedProject.loggedHours} />
                    </div>

                    {/* Stats */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-3 text-sm">Time Tracking</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Stat title="Logged Hours" value={selectedProject.stats.loggedHours} icon={<Clock size={16} />} />
                        <Stat title="Billable Hours" value={selectedProject.stats.billableHours} icon={<CreditCard size={16} />} />
                        <Stat title="Billed Hours" value={selectedProject.stats.billedHours} icon={<Check size={16} />} />
                        <Stat title="Unbilled Hours" value={selectedProject.stats.unbilledHours} icon={<X size={16} />} />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-2 text-sm">Description</h4>
                      <p className="text-sm text-gray-600">{selectedProject.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="border-t pt-4">
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                          <div className="flex items-center justify-center gap-2">
                            <Clock size={14} />
                            Start Timer
                          </div>
                        </button>
                        <button className="px-4 py-2 border text-sm rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-2">
                            <CheckCircle size={14} />
                            Mark Complete
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default ProjectView;