import { Mail, Phone, MapPin, Calendar, User, Globe, MessageSquare, Download, Printer, Share2, Bell, Wifi, Shield, CreditCard, Activity, Check, X, Eye, Trash2, CreditCard as CardIcon, MoreVertical, CheckCircle, XCircle, RefreshCw, WifiOff, Clock, Users, TrendingUp, Heart, Music, Video, ExternalLink, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";
import Table from "../Utility/Table";
import data from "../Store/Data.json";

function CustomerView() {
  const user = useSelector((state) => state.auth.user);
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
  const [activeTab, setActiveTab] = useState("overview");
  const [connectionFilter, setConnectionFilter] = useState("all");
  const [selectedCustomerId, setSelectedCustomerId] = useState("CUST001");
  const [showCustomersTable, setShowCustomersTable] = useState(false);
  
  // Get customers array from data.json
  const customers = data.customers || [];
  
  // Find selected customer
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];
  
  // Extract data with fallbacks
  const customerData = selectedCustomer || {};
  const customerBilling = customerData.billing || {};
  
  const currentPlan = customerBilling.currentPlan || {};
  const plans = customerBilling.plans || [];
  const paymentMethods = customerBilling.paymentMethods || [];
  const billingHistory = customerBilling.billingHistory || [];
  const activity = customerData.activity || [];
  const projects = customerData.projects || [];
  const logsHistory = customerData.ActivtyHistory || [];
  const developmentConnections = customerData.developmentConnections || [];  
  const socialConnections = customerData.socialConnections || [];
  
  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: null },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "connection", label: "Connection", icon: Wifi },
    { id: "security", label: "Security", icon: Shield }
  ];

  // Handle customer selection
  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowCustomersTable(false);
    // Reset to overview tab when switching customers
    setActiveTab("overview");
  };

  // Table columns for Customers List
  const customersColumns = [
    { 
      header: "Customer", 
      accessor: "name",
      align: "text-left",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Company", 
      accessor: "company",
      align: "text-left"
    },
    { 
      header: "Role", 
      accessor: "role",
      align: "text-left"
    },
    { 
      header: "Location", 
      accessor: "location",
      align: "text-left"
    },
    { 
      header: "Status", 
      accessor: "status",
      align: "text-center",
      render: () => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      )
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
      align: "text-left"
    },
    { 
      header: "DATE", 
      accessor: "date",
      align: "text-left"
    },
    { 
      header: "AMOUNT", 
      accessor: "amount",
      align: "text-left"
    },
    { 
      header: "STATUS", 
      accessor: "status",
      align: "text-left",
      render: (row) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          row.status === 'Completed' 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  // Table columns for Logs History
  const logsHistoryColumns = [
    { 
      header: "BROWSER", 
      accessor: "browser",
      align: "text-left"
    },
    { 
      header: "IP", 
      accessor: "ip",
      align: "text-left"
    },
    { 
      header: "TIME", 
      accessor: "time",
      align: "text-left"
    },
    { 
      header: "ACTION", 
      accessor: "action",
      align: "text-center",
      render: (row) => (
        row.action === 'success' ? 
          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : 
          <XCircle className="h-5 w-5 text-red-500 mx-auto" />
      )
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

  // Table columns for Social Connections
  const socialConnectionsColumns = [
    { 
      header: "PLATFORM", 
      accessor: "name",
      align: "text-left",
      render: (row) => (
        <div className="flex items-center">
          {row.icon ? (
            <img 
              src={row.icon} 
              alt={row.name} 
              className="h-8 w-8 rounded mr-3"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`h-8 w-8 rounded mr-3 flex items-center justify-center bg-gray-100 ${
            !row.icon ? '' : 'hidden'
          }`}>
            <span className="font-semibold text-gray-600">
              {row.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.description}</div>
          </div>
        </div>
      )
    },
    { 
      header: "STATUS", 
      accessor: "status",
      align: "text-left",
      render: (row) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          row.status === 'connected' 
            ? 'bg-green-100 text-green-800'
            : row.status === 'disconnected'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status === 'connected' 
            ? <Check size={12} className="mr-1" />
            : row.status === 'disconnected'
            ? <X size={12} className="mr-1" />
            : <Clock size={12} className="mr-1" />
          }
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    },
    { 
      header: "FOLLOWERS", 
      accessor: "followers",
      align: "text-center",
      render: (row) => (
        <div className="flex items-center justify-center">
          <Users className="h-4 w-4 text-gray-400 mr-2" />
          <span className="font-medium">{row.followers}</span>
        </div>
      )
    },
    { 
      header: "FOLLOWING", 
      accessor: "following",
      align: "text-center",
      render: (row) => (
        <div className="flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
          <span className="font-medium">{row.following}</span>
        </div>
      )
    },
    { 
      header: "LAST ACTIVITY", 
      accessor: "lastActivity",
      align: "text-center",
      render: (row) => (
        <div className="text-sm">
          {row.lastActivity ? (
            new Date(row.lastActivity).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          ) : 'Never'}
        </div>
      )
    }
  ];

  // Table actions for Social Connections
  const socialConnectionsActions = (row) => (
    <div className="flex items-center justify-center space-x-2">
      <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg">
        <ExternalLink size={16} />
      </button>
      <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg">
        <MoreVertical size={16} />
      </button>
    </div>
  );

  return (
    <div className="flex h-full bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Header
          title="Customer"
          subtitle="Customer / View"
          user={user}
        />

        <div
          className="pt-[100px] px-6 pb-6 space-y-6"
          style={{
            paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
          }}
        >
          {/* Main Content */}
          <div className="space-y-6">
            {/* Header with Title and Customer Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
                  <div className="flex items-center text-gray-600 mt-2">
                    <span className="text-gray-400 mr-2">Home</span>
                    <span className="mx-2">›</span>
                    <span>View</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <MessageSquare size={18} />
                    Message
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Download size={18} />
                    Download
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Printer size={18} />
                    Print
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              
              {/* Customer Selector */}
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-10">
                  <div className="relative">
                    <button
                      onClick={() => setShowCustomersTable(!showCustomersTable)}
                      className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-lg">
                        {customerData.name?.charAt(0) || "A"}
                      </div>
                      <div className="text-left">
                        <h2 className="text-xl font-bold text-gray-900">{customerData.name || "Alexandra Della"}</h2>
                        <p className="text-gray-600">{customerData.role || "Frontend Developer"}</p>
                        <p className="text-gray-500 text-sm">{customerData.company || "Theme Ocean"}</p>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${showCustomersTable ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Customer Selection Dropdown */}
                    {showCustomersTable && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">Select Customer</h3>
                          <div className="space-y-2">
                            {customers.slice(0, 5).map((customer) => (
                              <button
                                key={customer.id}
                                onClick={() => handleCustomerSelect(customer.id)}
                                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left hover:bg-gray-50 ${
                                  selectedCustomerId === customer.id ? 'bg-blue-50 border border-blue-200' : ''
                                }`}
                              >
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                  {customer.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">{customer.name}</p>
                                  <p className="text-sm text-gray-500">{customer.company}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{customerData.followers || "28.65K"}</div>
                      <div className="text-sm text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{customerData.following || "38.85K"}</div>
                      <div className="text-sm text-gray-500">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{customerData.engagement || "43.67K"}</div>
                      <div className="text-sm text-gray-500">Engagement</div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowCustomersTable(!showCustomersTable)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  {showCustomersTable ? 'Hide Customers' : 'View All Customers'}
                </button>
              </div>
            </div>

            {/* Customers Table (conditionally shown) */}
            {/* {showCustomersTable && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">All Customers</h3>
                  <span className="text-sm text-gray-500">{customers.length} customers found</span>
                </div>
                <Table
                  data={customers}
                  columns={customersColumns}
                  actions={customersActions}
                  checkSelect={false}
                />
              </div>
            )} */}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile Card */}
              <div className="lg:col-span-2 space-y-6">
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
                          {item.icon && <item.icon size={16} className="mr-2" />}
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                  
                  {/* Tab Content - Rest of your existing tab content remains the same */}
                  <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                      <div className="space-y-6">
                        {/* About Section */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile About</h2>
                          <div className="bg-gray-50 rounded-lg p-6">
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                              {customerData.bio}
                            </p>
                          </div>
                        </div>

                        {/* Profile Details */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Details</h2>
                          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <tbody className="divide-y divide-gray-200">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    Full Name:
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {customerData.name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    Surname:
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {customerData.surname}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    Company:
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {customerData.company}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    Email:
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {customerData.email}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    Phone:
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {customerData.phone}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    Location:
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {customerData.location}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                    Member Since:
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {customerData.joinDate}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Billing Tab */}
                    {activeTab === "billing" && (
                      <div className="space-y-8">
                        {/* Subscription & Plan */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-6">Subscription & Plan</h2>
                          
                          {/* Current Plan Card */}
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <div className="text-sm font-medium text-blue-600 mb-1">
                                  {currentPlan.daysRemaining || "4"} DAYS REMAINING
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  Your current plan is {currentPlan.name}
                                </h3>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{currentPlan.price}</div>
                                <div className="text-sm text-gray-600">{currentPlan.billingCycle}</div>
                              </div>
                            </div>
                            
                            <div className="text-gray-600 mb-6">
                              Next payment on {currentPlan.nextPayment || "12/10/2023"} for {currentPlan.nextPaymentAmount || "$62.48"}
                            </div>
                            
                            <div className="flex gap-3">
                              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                                Cancel Plan
                              </button>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                UPDATE PLAN
                              </button>
                            </div>
                          </div>
                          
                          {/* Available Plans */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {plans.length > 0 ? plans.map((plan) => (
                              <div 
                                key={plan.id}
                                className={`border rounded-lg p-6 ${plan.isCurrent ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}
                              >
                                {plan.popular && (
                                  <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                                    POPULAR
                                  </div>
                                )}
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                                
                                <p className="text-gray-700 mb-6 text-sm">{plan.details}</p>
                                
                                <div className="text-2xl font-bold text-gray-900 mb-6">{plan.price}</div>
                                
                                <ul className="space-y-2 mb-6">
                                  {plan.features && plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-sm text-gray-600">
                                      <Check size={16} className="text-green-500 mr-2" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                                
                                <button 
                                  className={`w-full py-2 rounded-lg font-medium ${
                                    plan.isCurrent
                                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {plan.isCurrent ? 'Current Plan' : 'Choose Plan'}
                                </button>
                              </div>
                            )) : (
                              // Fallback plans if not in data.json
                              <>
                                <div className="border border-gray-200 rounded-lg p-6">
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">BASIC</h3>
                                  <p className="text-gray-600 text-sm mb-4">Starter plan for individuals.</p>
                                  <p className="text-gray-700 mb-6 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit....</p>
                                  <div className="text-2xl font-bold text-gray-900 mb-6">$12.99 / Month</div>
                                  <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    Choose Plan
                                  </button>
                                </div>
                                
                                <div className="border border-blue-500 ring-1 ring-blue-500 rounded-lg p-6">
                                  <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                                    POPULAR
                                  </div>
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">TEAM</h3>
                                  <p className="text-gray-600 text-sm mb-4">Collaborate up to 10 people.</p>
                                  <p className="text-gray-700 mb-6 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit....</p>
                                  <div className="text-2xl font-bold text-gray-900 mb-6">$29.99 / Month</div>
                                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Current Plan
                                  </button>
                                </div>
                                
                                <div className="border border-gray-200 rounded-lg p-6">
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">ENTERPRISE</h3>
                                  <p className="text-gray-600 text-sm mb-4">For bigger businesses.</p>
                                  <p className="text-gray-700 mb-6 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit....</p>
                                  <div className="text-2xl font-bold text-gray-900 mb-6">$49.99 / Month</div>
                                  <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    Choose Plan
                                  </button>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Payment Methods Section */}
                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                Add New Card
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {paymentMethods.length > 0 ? paymentMethods.map((card) => (
                                <div 
                                  key={card.id} 
                                  className={`border rounded-lg p-4 ${card.isDefault ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="text-sm text-gray-500">Card Holder</div>
                                      <div className="font-medium">{card.cardHolder}</div>
                                      <div className="text-sm text-gray-500 mt-2">Card Number</div>
                                      <div className="font-medium">{card.cardNumber}</div>
                                      <div className="text-sm text-gray-500 mt-2">CARD EXPIRE...</div>
                                      <div className="font-medium">{card.expiry}</div>
                                    </div>
                                    
                                    <div className="flex flex-col items-end">
                                      {card.isDefault && (
                                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded mb-2">
                                          Default
                                        </span>
                                      )}
                                      <div className="flex items-center space-x-2 mt-2">
                                        <button className="text-gray-600 hover:text-gray-900 p-1">
                                          <Eye size={16} />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 p-1">
                                          <Trash2 size={16} />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 p-1">
                                          <MoreVertical size={16} />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                      <CardIcon size={20} className="text-gray-400 mr-2" />
                                      <span className="text-sm text-gray-600">{card.type}</span>
                                    </div>
                                    {!card.isDefault && (
                                      <button className="text-sm text-blue-600 hover:text-blue-800">
                                        Set as Default
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )) : (
                                // Fallback payment methods
                                <>
                                  <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="text-sm text-gray-500">Card Holder</div>
                                    <div className="font-medium">{customerData.name || "Alexandra Della"}</div>
                                    <div className="text-sm text-gray-500 mt-2">Card Number</div>
                                    <div className="font-medium">5155 **** **** 3456</div>
                                    <div className="text-sm text-gray-500 mt-2">CARD EXPIRE...</div>
                                    <div className="font-medium">12/25</div>
                                  </div>
                                  
                                  <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="text-sm text-gray-500">Card Holder</div>
                                    <div className="font-medium">{customerData.name || "Alexandra Della"}</div>
                                    <div className="text-sm text-gray-500 mt-2">Card Number</div>
                                    <div className="font-medium">3437 **** **** 7890</div>
                                    <div className="text-sm text-gray-500 mt-2">CARD EXPIRE...</div>
                                    <div className="font-medium">08/24</div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Billing History Section */}
                          <div>
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
                              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                                View All
                              </button>
                            </div>
                            
                            {/* Using your Table component */}
                            {billingHistory.length > 0 ? (
                              <Table
                                data={billingHistory}
                                columns={billingHistoryColumns}
                                actions={billingHistoryActions}
                                checkSelect={false}
                                onDelete={(row) => console.log('Delete:', row)}
                              />
                            ) : (
                              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center text-gray-500">
                                <p>No billing history available</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Activity Tab */}
                    {activeTab === "activity" && (
                      <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                          {activity.length > 0 ? activity.map((item) => (
                            <div key={item.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                              <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-4"></div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">{item.action}</div>
                                <div className="text-xs text-gray-500 mt-1">{item.time}</div>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                {item.type}
                              </span>
                            </div>
                          )) : (
                            <div className="text-center py-8 text-gray-500">
                              No activity found
                            </div>
                          )}
                        </div>

                        {/* Logs History */}
                        <div className="bg-white rounded-lg shadow p-6 mt-6">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Logs History</h3>
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                              VIEW ALLS
                            </button>
                          </div> 
                        
                          {/* Using your Table component for Logs History */}
                          {logsHistory.length > 0 ? (
                            <div className="overflow-x-auto">
                              <Table
                                data={logsHistory.slice(0, 5)} // Show only 5 entries
                                columns={logsHistoryColumns}
                                actions={null} // No actions needed for logs
                                checkSelect={false}
                                onDelete={(row) => console.log('Delete:', row)}
                              />
                            </div>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              <p>No logs history available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Other tabs remain the same... */}
                    {activeTab === "notifications" && (
                      <div className="space-y-6">
                        {/* Notifications Table - Same as before */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  DESCRIPTION
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  ACTIONS
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {/* ... Your notifications table rows ... */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === "connection" && (
                      <div className="space-y-8">
                        {/* Development Connections Section */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900">Development Connections</h2>
                              <p className="text-sm text-gray-600 mt-1">Manage your development tools and services</p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="flex bg-gray-100 rounded-lg p-1">
                                {["all", "connected", "disconnected", "pending"].map((filter) => (
                                  <button
                                    key={filter}
                                    onClick={() => setConnectionFilter(filter)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                      connectionFilter === filter
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                                  >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                  </button>
                                ))}
                              </div>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                                Add Connection
                              </button>
                            </div>
                          </div>

                          {/* Filter connections */}
                          {(() => {
                            const filteredConnections = developmentConnections.filter(conn => {
                              if (connectionFilter === "all") return true;
                              return conn.status === connectionFilter;
                            });

                            return (
                              <>
                                {/* Connections Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {filteredConnections.length > 0 ? (
                                    filteredConnections.map((connection) => (
                                      <div
                                        key={connection.id}
                                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                      >
                                        {/* ... connection content ... */}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="col-span-2 text-center py-12 bg-white border border-gray-200 rounded-lg">
                                      <WifiOff className="h-12 w-12 text-gray-400 mx-auto" />
                                      <h3 className="mt-4 text-lg font-medium text-gray-900">No connections found</h3>
                                      <p className="mt-2 text-gray-600">No development connections match the current filter.</p>
                                    </div>
                                  )}
                                </div>

                                {/* Development Statistics */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Connection Statistics</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                      <div className="text-2xl font-bold text-gray-900">
                                        {developmentConnections.filter(c => c.status === "connected").length}
                                      </div>
                                      <div className="text-sm text-gray-600 mt-1">Connected</div>
                                    </div>
                                    {/* ... other stats ... */}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>

                        {/* Social Connections Section */}
                        <div className="bg-white rounded-lg shadow">
                          <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h2 className="text-lg font-semibold text-gray-900">Social Connections</h2>
                                <p className="text-sm text-gray-600 mt-1">Connect and manage your social media platforms</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Connect New
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Social Connections Table */}
                          <div className="p-6">
                            {socialConnections.length > 0 ? (
                              <Table
                                data={socialConnections}
                                columns={socialConnectionsColumns}
                                actions={socialConnectionsActions}
                                checkSelect={false}
                                onDelete={(row) => console.log('Delete:', row)}
                              />
                            ) : (
                              <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
                                <Users className="h-12 w-12 text-gray-400 mx-auto" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No social connections</h3>
                                <p className="mt-2 text-gray-600">Connect your social media accounts to get started.</p>
                              </div>
                            )}
                          </div>

                          {/* Social Statistics */}
                          <div className="bg-gray-50 border-t border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Connection Statistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                              {socialConnections.map((social) => (
                                <div key={social.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                  {/* ... social stats ... */}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === "security" && (
                      <div className="text-center py-12 text-gray-500">
                        <Shield className="h-12 w-12 mx-auto text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium">Security</h3>
                        <p className="mt-2">Security settings will appear here.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-center">
                    {/* Profile Image/Icon */}
                    <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 mb-4">
                      <User className="h-12 w-12 text-blue-600" />
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900">{customerData.name || "Alexandra Della"}</h2>
                    <p className="text-gray-600">{customerData.role || "Frontend Developer"}</p>
                    <p className="text-gray-500 text-sm mt-1">{customerData.company || "Theme Ocean"}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{customerData.followers || "28.65K"}</div>
                        <div className="text-sm text-gray-500">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{customerData.following || "38.85K"}</div>
                        <div className="text-sm text-gray-500">Following</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{customerData.engagement || "43.67K"}</div>
                        <div className="text-sm text-gray-500">Engagement</div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{customerData.location || "California, USA"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">{customerData.phone || "+01 (375) 2589 645"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium">{customerData.email || "alex.della@outlook.com"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Member Since</div>
                        <div className="font-medium">{customerData.joinDate || "2023-01-15"}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Industry</div>
                        <div className="font-medium">Technology</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 space-y-3">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Send Message
                    </button>
                    <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Projects Card */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
                  <div className="space-y-4">
                    {projects.length > 0 ? projects.map((project) => (
                      <div key={project.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg mr-3">
                          {project.icon ? (
                            <img src={project.icon} alt={project.name} className="h-6 w-6" />
                          ) : (
                            <div className="h-6 w-6 bg-blue-500 rounded"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.description}</div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress: {project.progress}%</span>
                              <span className={`px-2 py-1 text-xs font-medium rounded ${
                                project.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className={`h-2 rounded-full ${
                                  project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      // Fallback projects
                      <div className="text-center py-4 text-gray-500">
                        No active projects
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default CustomerView;