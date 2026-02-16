import {
    Activity,
    Bell,
    Check,
    ChevronDown,
    CreditCard,
    Download,
    MessageSquare,
    Printer,
    RefreshCw,
    Share2,
    Shield,
    Wifi,
    X,
    XCircle,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Globe,
    MoreVertical,
    CheckCircle,
    Clock,
    Eye,
    Trash2,
    CreditCard as CardIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";
import Table from "../Utility/Table";
import axios from "axios";

function CustomerView() {
    const user = useSelector((state) => state.auth.user);
    const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [showCustomersTable, setShowCustomersTable] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch customers from API
    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (selectedCustomerId) {
            fetchCustomerDetails(selectedCustomerId);
            // Hide the customers table when a customer is selected
            setShowCustomersTable(false);
        }
    }, [selectedCustomerId]);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API}/customers/`);
            setCustomers(response.data);
            if (response.data.length > 0 && !selectedCustomerId) {
                setSelectedCustomerId(response.data[0].id);
            }
        } catch (err) {
            setError("Failed to fetch customers");
            console.error("Error fetching customers:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomerDetails = async (customerId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}/customers/${customerId}/`
            );
            console.log(response, "response");
            setSelectedCustomer(response.data);
        } catch (err) {
            console.error("Error fetching customer details:", err);
        }
    };

    // Handle customer selection
    const handleCustomerSelect = (customerId) => {
        setSelectedCustomerId(customerId);
        setActiveTab("overview");
    };

    // Handle back to customers list
    const handleBackToCustomers = () => {
        setShowCustomersTable(true);
        setSelectedCustomerId(null);
        setSelectedCustomer(null);
    };

    // Table columns for Customers List
    const customersColumns = [
        {
            header: "Customer",
            accessor: "firstname",
            align: "text-left",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {row.firstname?.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium">
                            {row.firstname} {row.lastname}
                        </p>
                        {row.subscription && (
                            <p className="text-xs text-gray-500">{row.subscription.name} Plan</p>
                        )}
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
            header: "Phone",
            accessor: "phone",
            align: "text-left",
        },
        {
            header: "Location",
            accessor: "location",
            align: "text-left",
        },
        {
            header: "Subscription",
            accessor: "subscription",
            align: "text-left",
            render: (row) => (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {row.subscription?.name || "No Plan"}
                </span>
            ),
        },
        {
            header: "Created Date",
            accessor: "createdDate",
            align: "text-left",
            render: (row) => <span>{new Date(row.createdDate).toLocaleDateString()}</span>,
        },
    ];

    // Actions for customers table
    const customersActions = (row) => (
        <div className="flex items-center justify-center">
            <button
                onClick={() => handleCustomerSelect(row.id)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
                View Profile
            </button>
        </div>
    );

    // Table columns for Billing History
    const billingHistoryColumns = [
        {
            header: "ID",
            accessor: "id",
            align: "text-left",
        },
        {
            header: "DATE",
            accessor: "date",
            align: "text-left",
        },
        {
            header: "AMOUNT",
            accessor: "amount",
            align: "text-left",
        },
        {
            header: "STATUS",
            accessor: "status",
            align: "text-left",
            render: (row) => (
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Completed" || row.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {row.status}
                </span>
            ),
        },
    ];

    // Table actions for Billing History
    const billingHistoryActions = (row) => (
        <div className="flex items-center justify-center space-x-2">
            <button className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded">
                <Check size={18} />
            </button>
            <button className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded">
                <X size={18} />
            </button>
        </div>
    );

    // Info component for details view
    const InfoItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-start gap-3">
            <div className="mt-1">
                <Icon size={18} className="text-gray-400" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-900">{value || "N/A"}</p>
            </div>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="flex h-full bg-gray-50 min-h-screen">
                <Navbar />
                <div className="flex-1">
                    <Header title="Customer" subtitle="Customer / View" user={user} />
                    <div className="pt-[100px] px-6 pb-6 flex items-center justify-center">
                        <div className="text-center">
                            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                            <p className="mt-4 text-gray-600">Loading customers...</p>
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
                    <Header title="Customer" subtitle="Customer / View" user={user} />
                    <div className="pt-[100px] px-6 pb-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                            <h3 className="mt-4 text-lg font-medium text-red-800">
                                Error Loading Customers
                            </h3>
                            <p className="mt-2 text-red-600">{error}</p>
                            <button
                                onClick={fetchCustomers}
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

    // Extract data from selected customer
    const customerData = selectedCustomer || {};
    const paymentMethods = customerData.cards || [];
    const billingHistory = customerData.bills || [];

    // Navigation items
    const navItems = [
        { id: "overview", label: "Overview", icon: User },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "activity", label: "Activity", icon: Activity },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "connection", label: "Connection", icon: Wifi },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
        <div className="flex h-full bg-gray-50 min-h-screen">
            <Navbar />

            <div className="flex-1">
                <Header title="Customer" subtitle="Customer / View" user={user} />

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
                                <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
                                <div className="flex items-center text-gray-600 mt-2">
                                    <span className="text-gray-400 mr-2">Home</span>
                                    <span className="mx-2">›</span>
                                    <span>View</span>
                                    {selectedCustomer && !showCustomersTable && (
                                        <>
                                            <span className="mx-2">›</span>
                                            <span className="text-blue-600">
                                                {selectedCustomer.firstname}{" "}
                                                {selectedCustomer.lastname}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                {selectedCustomer && !showCustomersTable && (
                                    <button
                                        onClick={handleBackToCustomers}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <ChevronDown className="h-4 w-4 rotate-90" />
                                        Back to Customers
                                    </button>
                                )}
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                    <Download size={18} />
                                    Export
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                    <User size={18} />
                                    Add Customer
                                </button>
                            </div>
                        </div>

                        {/* Customer Selector / Current Customer Info */}
                        {!showCustomersTable && selectedCustomer ? (
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-2xl">
                                            {selectedCustomer.firstname?.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {selectedCustomer.firstname}{" "}
                                                {selectedCustomer.lastname}
                                            </h2>
                                            <p className="text-gray-600">
                                                {selectedCustomer.company}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Member since:{" "}
                                                {new Date(
                                                    selectedCustomer.createdDate
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowCustomersTable(true)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Change Customer
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowCustomersTable(!showCustomersTable)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                {showCustomersTable ? "Hide Customers" : "View All Customers"}
                            </button>
                        )}

                        {/* Main Customers Table */}
                        {showCustomersTable && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        All Customers
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {customers.length} customers found
                                    </span>
                                </div>
                                <Table
                                    data={customers}
                                    columns={customersColumns}
                                    actions={customersActions}
                                    checkSelect={false}
                                />
                            </div>
                        )}

                        {/* Customer Details View */}
                        {selectedCustomer && !showCustomersTable && (
                            <div className="space-y-6">
                                {/* Navigation Tabs */}
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
                                        {/* Overview Tab */}
                                        {activeTab === "overview" && (
                                            <div className="space-y-6">
                                                {/* Profile Details */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                        Profile Details
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <InfoItem
                                                            icon={User}
                                                            label="Full Name"
                                                            value={`${selectedCustomer.firstname} ${selectedCustomer.lastname}`}
                                                        />
                                                        <InfoItem
                                                            icon={Mail}
                                                            label="Email"
                                                            value={selectedCustomer.email}
                                                        />
                                                        <InfoItem
                                                            icon={Phone}
                                                            label="Phone"
                                                            value={selectedCustomer.phone}
                                                        />
                                                        <InfoItem
                                                            icon={MapPin}
                                                            label="Location"
                                                            value={selectedCustomer.location}
                                                        />
                                                        <InfoItem
                                                            icon={Globe}
                                                            label="Company"
                                                            value={selectedCustomer.company}
                                                        />
                                                        <InfoItem
                                                            icon={Calendar}
                                                            label="Member Since"
                                                            value={new Date(
                                                                selectedCustomer.createdDate
                                                            ).toLocaleDateString()}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Subscription Info */}
                                                {selectedCustomer.subscription && (
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                            Subscription
                                                        </h3>
                                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="text-sm text-blue-600 font-medium">
                                                                        Current Plan
                                                                    </p>
                                                                    <p className="text-2xl font-bold text-gray-900 mt-1">
                                                                        {
                                                                            selectedCustomer
                                                                                .subscription.name
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                                    Active
                                                                </span>
                                                            </div>
                                                            {selectedCustomer.subscription
                                                                .price && (
                                                                <p className="mt-4 text-gray-700">
                                                                    Price:{" "}
                                                                    {
                                                                        selectedCustomer
                                                                            .subscription.price
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Billing Tab */}
                                        {activeTab === "billing" && (
                                            <div className="space-y-6">
                                                {/* Payment Methods */}
                                                <div>
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            Payment Methods
                                                        </h3>
                                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                                            Add New Card
                                                        </button>
                                                    </div>
                                                    {paymentMethods.length > 0 ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {paymentMethods.map((card) => (
                                                                <div
                                                                    key={card.id}
                                                                    className="border rounded-lg p-4"
                                                                >
                                                                    <div className="flex justify-between items-start">
                                                                        <div>
                                                                            <p className="font-medium">
                                                                                {card.cardHolder}
                                                                            </p>
                                                                            <p className="text-sm text-gray-600 mt-1">
                                                                                {card.cardNumber}
                                                                            </p>
                                                                            <p className="text-sm text-gray-500 mt-2">
                                                                                Expires:{" "}
                                                                                {card.expiry}
                                                                            </p>
                                                                        </div>
                                                                        <CardIcon
                                                                            size={24}
                                                                            className="text-gray-400"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500 text-center py-4">
                                                            No payment methods found
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Billing History */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                        Billing History
                                                    </h3>
                                                    {billingHistory.length > 0 ? (
                                                        <Table
                                                            data={billingHistory}
                                                            columns={billingHistoryColumns}
                                                            actions={billingHistoryActions}
                                                            checkSelect={false}
                                                        />
                                                    ) : (
                                                        <p className="text-gray-500 text-center py-4">
                                                            No billing history found
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Activity Tab */}
                                        {activeTab === "activity" && (
                                            <div className="text-center py-8 text-gray-500">
                                                <Activity
                                                    size={48}
                                                    className="mx-auto text-gray-400 mb-4"
                                                />
                                                <p>Activity history will appear here</p>
                                            </div>
                                        )}

                                        {/* Notifications Tab */}
                                        {activeTab === "notifications" && (
                                            <div className="text-center py-8 text-gray-500">
                                                <Bell
                                                    size={48}
                                                    className="mx-auto text-gray-400 mb-4"
                                                />
                                                <p>Notifications will appear here</p>
                                            </div>
                                        )}

                                        {/* Connection Tab */}
                                        {activeTab === "connection" && (
                                            <div className="text-center py-8 text-gray-500">
                                                <Wifi
                                                    size={48}
                                                    className="mx-auto text-gray-400 mb-4"
                                                />
                                                <p>Connection settings will appear here</p>
                                            </div>
                                        )}

                                        {/* Security Tab */}
                                        {activeTab === "security" && (
                                            <div className="text-center py-8 text-gray-500">
                                                <Shield
                                                    size={48}
                                                    className="mx-auto text-gray-400 mb-4"
                                                />
                                                <p>Security settings will appear here</p>
                                            </div>
                                        )}
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

export default CustomerView;
