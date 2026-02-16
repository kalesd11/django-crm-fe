import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    Globe,
    MessageSquare,
    Download,
    CreditCard as CardIcon,
    MoreVertical,
    CheckCircle,
    XCircle,
    RefreshCw,
    Users,
    Globe as GlobeIcon,
    Users as UsersIcon,
    ChevronDown,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";
import Table from "../Utility/Table";
import axios from "axios";

function LeadView() {
    const user = useSelector((state) => state.auth.user);
    const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
    const [activeTab, setActiveTab] = useState("overview");
    const [showLeadsTable, setShowLeadsTable] = useState(true);
    const [selectedLeadId, setSelectedLeadId] = useState(null);
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Navigation items for lead details
    const navItems = [
        { id: "profile", label: "Profile", icon: User },
        { id: "proposal", label: "Proposal", icon: MessageSquare },
        { id: "tasks", label: "Tasks", icon: CheckCircle },
        { id: "notes", label: "Notes", icon: MessageSquare },
        { id: "comments", label: "Comments", icon: Users },
    ];

    // Fetch leads from API
    useEffect(() => {
        fetchLeads();
    }, []);

    // Fetch selected lead details when ID changes
    useEffect(() => {
        if (selectedLeadId) {
            fetchLeadDetails(selectedLeadId);
            setShowLeadsTable(false);
        }
    }, [selectedLeadId]);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API}/leads/`);
            setLeads(response.data);
        } catch (err) {
            setError("Failed to fetch leads");
            console.error("Error fetching leads:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchLeadDetails = async (leadId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/leads/${leadId}/`);
            setSelectedLead(response.data);
        } catch (err) {
            console.error("Error fetching lead details:", err);
        }
    };

    const handleLeadSelect = (leadId) => {
        setSelectedLeadId(leadId);
    };

    const handleBackToLeads = () => {
        setSelectedLeadId(null);
        setSelectedLead(null);
        setShowLeadsTable(true);
        setActiveTab("overview");
    };

    // Table columns for Leads List - Based on Lead model
    const leadsColumns = [
        {
            header: "Lead",
            accessor: "name",
            align: "text-left",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {row.name?.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.position}</p>
                    </div>
                </div>
            ),
        },
        {
            header: "Company",
            accessor: "company",
            align: "text-left",
        },
        {
            header: "Email",
            accessor: "email",
            align: "text-left",
        },
        {
            header: "Phone",
            accessor: "phone",
            align: "text-left",
        },
        {
            header: "Status",
            accessor: "status",
            align: "text-center",
            render: (row) => (
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        row.status?.toLowerCase() === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {row.status || "Active"}
                </span>
            ),
        },
        {
            header: "Source",
            accessor: "source",
            align: "text-left",
        },
        {
            header: "Assigned To",
            accessor: "assigned_to",
            align: "text-left",
            render: (row) => <span>{row.assigned_to || "Unassigned"}</span>,
        },
        {
            header: "Created Date",
            accessor: "createdDate",
            align: "text-left",
            render: (row) => <span>{new Date(row.createdDate).toLocaleDateString()}</span>,
        },
    ];

    // Actions for leads table
    const leadsActions = (row) => (
        <div className="flex items-center justify-center space-x-2">
            <button
                onClick={() => handleLeadSelect(row.id)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
                View Details
            </button>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="flex h-full bg-gray-50 min-h-screen">
                <Navbar />
                <div className="flex-1">
                    <Header title="Leads" subtitle="Leads / View" user={user} />
                    <div className="pt-[100px] px-6 pb-6 flex items-center justify-center">
                        <div className="text-center">
                            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                            <p className="mt-4 text-gray-600">Loading leads...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex h-full bg-gray-50 min-h-screen">
                <Navbar />
                <div className="flex-1">
                    <Header title="Leads" subtitle="Leads / View" user={user} />
                    <div className="pt-[100px] px-6 pb-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                            <h3 className="mt-4 text-lg font-medium text-red-800">
                                Error Loading Leads
                            </h3>
                            <p className="mt-2 text-red-600">{error}</p>
                            <button
                                onClick={fetchLeads}
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
        <div className="flex h-full bg-gray-50 min-h-screen">
            <Navbar />

            <div className="flex-1">
                <Header title="Leads" subtitle="Leads / View" user={user} />

                <div
                    className="pt-[100px] px-6 pb-6 space-y-6"
                    style={{
                        paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
                    }}
                >
                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Header with Title */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                                <div className="flex items-center text-gray-600 mt-2">
                                    <span className="text-gray-400 mr-2">Home</span>
                                    <span className="mx-2">›</span>
                                    <span>View</span>
                                    {selectedLead && (
                                        <>
                                            <span className="mx-2">›</span>
                                            <span className="text-blue-600">
                                                {selectedLead.name}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                {selectedLead && (
                                    <button
                                        onClick={handleBackToLeads}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <ChevronDown className="h-4 w-4 rotate-90" />
                                        Back to Leads
                                    </button>
                                )}
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                    <Download size={18} />
                                    Export
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                    <User size={18} />
                                    Add Lead
                                </button>
                            </div>
                        </div>

                        {/* Leads Table */}
                        {showLeadsTable && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            All Leads
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Manage and view all your leads
                                        </p>
                                    </div>
                                    {/* <span className="text-sm text-gray-500">
                                        {leads.length} leads found
                                    </span> */}
                                </div>
                                <Table
                                    data={leads}
                                    columns={leadsColumns}
                                    actions={leadsActions}
                                    checkSelect={false}
                                />
                            </div>
                        )}

                        {/* Lead Details View */}
                        {selectedLead && !showLeadsTable && (
                            <>
                                {/* Lead Information Card */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Lead Information
                                            </h2>
                                            <p className="text-gray-600 mt-1">
                                                Detailed information for {selectedLead.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    selectedLead.status?.toLowerCase() === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {selectedLead.status || "Active"}
                                            </span>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                <MoreVertical size={20} className="text-gray-500" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Column 1 */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm text-gray-500">
                                                    Name
                                                </label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <User size={18} className="text-gray-400" />
                                                    <p className="text-gray-900 font-medium">
                                                        {selectedLead.name}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-500">
                                                    Position
                                                </label>
                                                <p className="text-gray-900 font-medium mt-1">
                                                    {selectedLead.position || "N/A"}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-500">
                                                    Company
                                                </label>
                                                <p className="text-gray-900 font-medium mt-1">
                                                    {selectedLead.company || "N/A"}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-500">
                                                    Email
                                                </label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Mail size={18} className="text-gray-400" />
                                                    <a
                                                        href={`mailto:${selectedLead.email}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {selectedLead.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Column 2 */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm text-gray-500">
                                                    Phone
                                                </label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Phone size={18} className="text-gray-400" />
                                                    <p className="text-gray-900 font-medium">
                                                        {selectedLead.phone}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-500">
                                                    Source
                                                </label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Globe size={18} className="text-gray-400" />
                                                    <p className="text-gray-900 font-medium">
                                                        {selectedLead.source || "N/A"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-500">
                                                    Assigned To
                                                </label>
                                                <p className="text-gray-900 font-medium mt-1">
                                                    {selectedLead.assigned_to || "Unassigned"}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-500">
                                                    Created Date
                                                </label>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Calendar size={18} className="text-gray-400" />
                                                    <p className="text-gray-900 font-medium">
                                                        {new Date(
                                                            selectedLead.createdDate
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Column 3 - Address */}
                                        {selectedLead.address && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-sm text-gray-500">
                                                        Address
                                                    </label>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <MapPin
                                                            size={18}
                                                            className="text-gray-400"
                                                        />
                                                        <p className="text-gray-900 font-medium">
                                                            {selectedLead.address.street || ""}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-sm text-gray-500">
                                                            City
                                                        </label>
                                                        <p className="text-gray-900 font-medium mt-1">
                                                            {selectedLead.address.city || ""}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <label className="text-sm text-gray-500">
                                                            State
                                                        </label>
                                                        <p className="text-gray-900 font-medium mt-1">
                                                            {selectedLead.address.state || ""}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="text-sm text-gray-500">
                                                        Country
                                                    </label>
                                                    <p className="text-gray-900 font-medium mt-1">
                                                        {selectedLead.address.country || ""}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Navigation Tabs for Lead Details */}
                                <div className="bg-white rounded-lg shadow">
                                    <div className="border-b border-gray-200">
                                        <nav className="flex overflow-x-auto">
                                            {navItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => setActiveTab(item.id)}
                                                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                                                        activeTab === item.id
                                                            ? "border-blue-600 text-blue-600"
                                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                                    }`}
                                                >
                                                    {item.icon && (
                                                        <item.icon size={16} className="mr-2" />
                                                    )}
                                                    {item.label}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* Tab Content */}
                                    <div className="p-6">
                                        {activeTab === "profile" && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Profile Information
                                                </h3>
                                                <p className="text-gray-600">
                                                    Additional profile details will appear here.
                                                </p>
                                            </div>
                                        )}
                                        {activeTab === "proposal" && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Proposals
                                                </h3>
                                                <p className="text-gray-600">
                                                    Proposals for this lead will appear here.
                                                </p>
                                            </div>
                                        )}
                                        {activeTab === "tasks" && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Tasks
                                                </h3>
                                                <p className="text-gray-600">
                                                    Tasks assigned to this lead will appear here.
                                                </p>
                                            </div>
                                        )}
                                        {activeTab === "notes" && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Notes
                                                </h3>
                                                <p className="text-gray-600">
                                                    Notes about this lead will appear here.
                                                </p>
                                            </div>
                                        )}
                                        {activeTab === "comments" && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Comments
                                                </h3>
                                                <p className="text-gray-600">
                                                    Comments about this lead will appear here.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}

export default LeadView;
