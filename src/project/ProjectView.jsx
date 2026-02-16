import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    Globe,
    MessageSquare,
    Download,
    Printer,
    Share2,
    Bell,
    Wifi,
    Shield,
    CreditCard,
    Activity,
    Check,
    X,
    Eye,
    Trash2,
    CreditCard as CardIcon,
    MoreVertical,
    CheckCircle,
    XCircle,
    RefreshCw,
    WifiOff,
    Clock,
    Users,
    TrendingUp,
    Heart,
    Music,
    Video,
    ExternalLink,
    Lock,
    Facebook,
    Globe as GlobeIcon,
    Users as UsersIcon,
    Star,
    Target,
    Search,
    Filter,
    ChevronDown,
    DollarSign,
    Briefcase,
    Tag,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";
import Table from "../Utility/Table";
import axios from "axios";

function ProjectView() {
    const user = useSelector((state) => state.auth.user);
    const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    // Fetch projects from API
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API}/projects/`);
            setProjects(response.data);
            if (response.data.length > 0 && !selectedProject) {
                setSelectedProject(response.data[0]);
            }
        } catch (err) {
            setError("Failed to fetch projects");
            console.error("Error fetching projects:", err);
        } finally {
            setLoading(false);
        }
    };

    // Filter projects based on search and status
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.type?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            filterStatus === "all" || project.type?.toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    // Handle view button click
    const handleViewProject = (project) => {
        setSelectedProject(project);
        setShowDetails(true);
    };

    const handleBackToList = () => {
        setShowDetails(false);
    };

    // Format progress based on release date (example logic - you can adjust based on your needs)
    const calculateProgress = (project) => {
        if (!project.releaseDate) return 0;

        const created = new Date(project.createdDate);
        const release = new Date(project.releaseDate);
        const now = new Date();

        if (now >= release) return 100;

        const total = release - created;
        const elapsed = now - created;
        const progress = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));

        return progress;
    };

    // Get status color based on project type
    const getStatusColor = (type) => {
        switch (type?.toLowerCase()) {
            case "completed":
                return "bg-green-500";
            case "in progress":
            case "active":
                return "bg-blue-600";
            case "on hold":
            case "pending":
                return "bg-yellow-500";
            case "upcoming":
            case "planned":
                return "bg-gray-400";
            default:
                return "bg-blue-600";
        }
    };

    const getStatusBgColor = (type) => {
        switch (type?.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-700";
            case "in progress":
            case "active":
                return "bg-blue-100 text-blue-700";
            case "on hold":
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "upcoming":
            case "planned":
                return "bg-gray-100 text-gray-700";
            default:
                return "bg-blue-100 text-blue-700";
        }
    };

    // Table columns configuration based on Project model
    const projectColumns = [
        {
            header: "Project Name",
            accessor: "name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Briefcase className="text-blue-600" size={16} />
                    </div>
                    <div>
                        <p className="font-medium text-sm">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.type}</p>
                    </div>
                </div>
            ),
        },
        {
            header: "Customer",
            accessor: "customer",
            render: (row) => (
                <div>
                    <p className="font-medium text-sm">{row.customer?.name || "N/A"}</p>
                    {row.customer?.company && (
                        <p className="text-xs text-gray-500">{row.customer.company}</p>
                    )}
                </div>
            ),
        },
        {
            header: "Type",
            accessor: "type",
            render: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(
                        row.type
                    )}`}
                >
                    {row.type || "N/A"}
                </span>
            ),
        },
        {
            header: "Budget",
            accessor: "budget",
            render: (row) => (
                <div className="flex items-center gap-1">
                    <DollarSign size={14} className="text-gray-400" />
                    <span className="font-medium text-sm">{row.budget || "0"}</span>
                </div>
            ),
        },
        {
            header: "Assigned To",
            accessor: "assignedTo",
            render: (row) => (
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={12} className="text-gray-600" />
                    </div>
                    <span className="text-sm">{row.assignedTo || "Unassigned"}</span>
                </div>
            ),
        },
        {
            header: "Release Date",
            accessor: "releaseDate",
            render: (row) => (
                <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm">
                        {row.releaseDate ? new Date(row.releaseDate).toLocaleDateString() : "N/A"}
                    </span>
                </div>
            ),
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
            ),
        },
    ];

    // Helper components
    const Info = ({ label, value }) => (
        <div>
            <p className="text-gray-500 text-xs">{label}</p>
            <p className="font-medium text-sm">{value || "N/A"}</p>
        </div>
    );

    const Stat = ({ title, value, icon }) => (
        <div className="bg-gray-50 p-3 rounded-xl flex flex-col gap-2">
            <div className="text-blue-600">{icon}</div>
            <p className="text-xs font-medium">{title}</p>
            <p className="text-base font-bold">{value}</p>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Navbar />
                <div className="flex-1 flex flex-col">
                    <Header title="Projects" subtitle="Projects / View" user={user} />
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                            <p className="mt-4 text-gray-600">Loading projects...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                <Navbar />
                <div className="flex-1 flex flex-col">
                    <Header title="Projects" subtitle="Projects / View" user={user} />
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                            <h3 className="mt-4 text-lg font-medium text-red-800">
                                Error Loading Projects
                            </h3>
                            <p className="mt-2 text-red-600">{error}</p>
                            <button
                                onClick={fetchProjects}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Navbar />

            <div className="flex-1 flex flex-col">
                <Header title="Projects" subtitle="Projects / View" user={user} />

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
                        <div
                            className={`flex-1 flex flex-col ${
                                showDetails ? "lg:w-2/3" : "w-full"
                            }`}
                        >
                            {/* Table Header */}
                            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">All Projects</h2>
                                        <p className="text-sm text-gray-500">
                                            Manage and view all your projects
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                        {/* Search Bar */}
                                        <div className="relative flex-1 sm:flex-initial">
                                            <Search
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={18}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Search projects..."
                                                className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        {/* Filter Button */}
                                        <div className="relative">
                                            <select
                                                className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50 appearance-none pr-10"
                                                value={filterStatus}
                                                onChange={(e) => setFilterStatus(e.target.value)}
                                            >
                                                <option value="all">All Status</option>
                                                <option value="active">Active</option>
                                                <option value="completed">Completed</option>
                                                <option value="pending">Pending</option>
                                                <option value="planned">Planned</option>
                                            </select>
                                            <Filter
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={16}
                                            />
                                        </div>
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
                                    />
                                </div>

                                {/* Table Footer */}
                                <div className="border-t p-4">
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>
                                            Showing {filteredProjects.length} of {projects.length}{" "}
                                            projects
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <span>Total Projects: {projects.length}</span>
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
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={handleBackToList}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Details Card with Scroll */}
                                <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                                    <div className="overflow-y-auto flex-1 p-4">
                                        {/* Header */}
                                        <div className="mb-4">
                                            <h2 className="text-lg font-semibold">
                                                {selectedProject.name}
                                            </h2>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span
                                                    className={`px-2 py-1 text-xs rounded ${getStatusBgColor(
                                                        selectedProject.type
                                                    )}`}
                                                >
                                                    {selectedProject.type || "N/A"}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    ID: {selectedProject.id}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-600">
                                                    Project Progress
                                                </span>
                                                <span className="font-medium">
                                                    {calculateProgress(selectedProject)}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-2 rounded">
                                                <div
                                                    className={`h-2 rounded ${getStatusColor(
                                                        selectedProject.type
                                                    )}`}
                                                    style={{
                                                        width: `${calculateProgress(
                                                            selectedProject
                                                        )}%`,
                                                    }}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Release Date:{" "}
                                                {selectedProject.releaseDate
                                                    ? new Date(
                                                          selectedProject.releaseDate
                                                      ).toLocaleDateString()
                                                    : "Not set"}
                                            </p>
                                        </div>

                                        {/* Project Info Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <Info
                                                label="Customer"
                                                value={selectedProject.customer?.name}
                                            />
                                            <Info
                                                label="Company"
                                                value={selectedProject.customer?.company}
                                            />
                                            <Info
                                                label="Project Type"
                                                value={selectedProject.type}
                                            />
                                            <Info label="Budget" value={selectedProject.budget} />
                                            <Info
                                                label="Assigned To"
                                                value={selectedProject.assignedTo}
                                            />
                                            <Info
                                                label="Created Date"
                                                value={
                                                    selectedProject.createdDate
                                                        ? new Date(
                                                              selectedProject.createdDate
                                                          ).toLocaleDateString()
                                                        : "N/A"
                                                }
                                            />
                                        </div>

                                        {/* Subscription Info */}
                                        {selectedProject.subscription && (
                                            <div className="mb-6">
                                                <h4 className="font-medium mb-3 text-sm flex items-center gap-2">
                                                    <Tag size={16} className="text-gray-500" />
                                                    Subscription Details
                                                </h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Info
                                                        label="Plan"
                                                        value={selectedProject.subscription.name}
                                                    />
                                                    <Info
                                                        label="Price"
                                                        value={selectedProject.subscription.price}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Notes */}
                                        {selectedProject.notes && (
                                            <div className="mb-6">
                                                <h4 className="font-medium mb-2 text-sm">Notes</h4>
                                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                    {selectedProject.notes}
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="border-t pt-4">
                                            <div className="flex gap-2">
                                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <MessageSquare size={14} />
                                                        Add Note
                                                    </div>
                                                </button>
                                                <button className="px-4 py-2 border text-sm rounded-lg hover:bg-gray-50">
                                                    <div className="flex items-center gap-2">
                                                        <Download size={14} />
                                                        Export
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
