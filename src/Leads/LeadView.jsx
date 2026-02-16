import { Mail, Phone, MapPin, Calendar, User, Globe, MessageSquare, Download, Printer, Share2, Bell, Wifi, Shield, CreditCard, Activity, Check, X, Eye, Trash2, CreditCard as CardIcon, MoreVertical, CheckCircle, XCircle, RefreshCw, WifiOff, Clock, Users, TrendingUp, Heart, Music, Video, ExternalLink, Lock, Facebook, Globe as GlobeIcon, Users as UsersIcon, Star, Target } from "lucide-react";
import React, { useState } from "react";
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

  // Get customer data from your data.json
  const customerData = data.customer || {};
  const customerBilling = customerData.billing || {};
  
  // Extract data with fallbacks
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
    { id: "profile", label: "Profile" },
    { id: "proposal", label: "Proposal"},
    { id: "tasks", label: "Tasks" },
    { id: "notes", label: "Notes" },
    { id: "comments", label: "Comments" },
  ];

  // Lead data from the provided information
  const leadInfo = {
    name: "Alexandra Dell",
    position: "CEO, Founder at Theme Ocean",
    company: "Theme Ocean",
    email: "alex.dellai@outlook.com",
    phone: "+01 (375) 5896 654",
    website: "https://themeforest.net/user/theme_ocean",
    leadValue: "$255.50 USD",
    address: "47813 Johnathon Parks Suite 559",
    city: "Cartermouth",
    state: "Connecticut",
    country: "United Kingdom",
    status: "active" // Assuming active status
  };

  // General Information data
  const generalInfo = {
    status: "Active",
    customer: "VIP",
    source: "Facebook",
    facebook: "facebook.com/alexandradell",
    defaultLanguage: "System Default",
    privacy: "Private",
    created: "26 MAY, 2023",
    assigned: "Alexandra Detla",
    leadBy: "Green Cute - Website design and development"
  };

  return (
    <div className="flex h-full bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Header
          title="Leads"
          subtitle="Leads / View"
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
            {/* Header with Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
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

            {/* Lead Information Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Lead Information</h2>
                  <p className="text-gray-600 mt-1">Following information for your lead</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${leadInfo.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {leadInfo.status === 'active' ? 'Active' : 'Inactive'}
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
                    <label className="text-sm text-gray-500">Name</label>
                    <div className="flex items-center gap-2 mt-1">
                      <User size={18} className="text-gray-400" />
                      <p className="text-gray-900 font-medium">{leadInfo.name}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">Position</label>
                    <p className="text-gray-900 font-medium mt-1">{leadInfo.position}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">Company</label>
                    <p className="text-gray-900 font-medium mt-1">{leadInfo.company}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail size={18} className="text-gray-400" />
                      <a href={`mailto:${leadInfo.email}`} className="text-blue-600 hover:underline">
                        {leadInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone size={18} className="text-gray-400" />
                      <p className="text-gray-900 font-medium">{leadInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">Website</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe size={18} className="text-gray-400" />
                      <a 
                        href={leadInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {leadInfo.website.replace('https://', '')}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">Lead Value</label>
                    <p className="text-gray-900 font-medium mt-1 text-lg">{leadInfo.leadValue}</p>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Address</label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={18} className="text-gray-400" />
                      <p className="text-gray-900 font-medium">{leadInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">City</label>
                      <p className="text-gray-900 font-medium mt-1">{leadInfo.city}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-500">State</label>
                      <p className="text-gray-900 font-medium mt-1">{leadInfo.state}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500">Country</label>
                    <p className="text-gray-900 font-medium mt-1">{leadInfo.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* General Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - General Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* General Information Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">General Information</h2>
                  <p className="text-gray-600 mb-6">General information for your lead</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Status</label>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <p className="text-gray-900 font-medium">{generalInfo.status}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500">Customer</label>
                        <div className="flex items-center gap-2 mt-1">
                          <UsersIcon size={18} className="text-gray-400" />
                          <p className="text-gray-900 font-medium">{generalInfo.customer}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500">Source</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Facebook size={18} className="text-gray-400" />
                          <p className="text-gray-900 font-medium">{generalInfo.source}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500">Facebook</label>
                        <p className="text-gray-900 font-medium mt-1">{generalInfo.facebook}</p>
                      </div>
                    </div>
                    
                    {/* Column 2 */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Default Language</label>
                        <div className="flex items-center gap-2 mt-1">
                          <GlobeIcon size={18} className="text-gray-400" />
                          <p className="text-gray-900 font-medium">{generalInfo.defaultLanguage}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500">Privacy</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Lock size={18} className="text-gray-400" />
                          <p className="text-gray-900 font-medium">{generalInfo.privacy}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500">Created</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar size={18} className="text-gray-400" />
                          <p className="text-gray-900 font-medium">{generalInfo.created}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500">Assigned</label>
                        <p className="text-gray-900 font-medium mt-1">{generalInfo.assigned}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-500">Lead By</label>
                        <p className="text-gray-900 font-medium mt-1">{generalInfo.leadBy}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Target Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <label className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Target size={18} />
                      Target
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type here to search"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Team Updates */}
              <div className="space-y-6">
                {/* High Rated Promotions Team Updates */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Star size={20} className="text-yellow-500" />
                      High Rated Promotions Team Updates
                    </h3>
                  </div>
                  
                  <div className="prose max-w-none text-gray-600">
                    <p className="mb-3">
                      Lorem Ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, nulla veniam, ipsam nemo autem fugit earum accusantium reprehenderit recusandae in minima harum vitae doloremque quasi aut dolorum voluptate. Minima, deleniti.
                    </p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, nulla veniam, ipsam nemo autem fugit earum accusantium reprehenderit recusandae in minima harum vitae doloremque quasi aut dolorum voluptate.
                    </p>
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