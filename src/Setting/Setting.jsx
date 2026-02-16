import {
    Users, Shield, Eye, Check
  } from "lucide-react";
  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import DashboardFooter from "../Utility/Footer";
  import Header from "../Utility/Header";
  import Navbar from "../Utility/Navbar";
  
  function Setting() {
    const user = useSelector((state) => state.auth.user);
    const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
  
    const [activeTab, setActiveTab] = useState("general");

  
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
  
        <div className="flex-1">
          <Header title="Settings" subtitle="Settings / General" user={user} />
  
          <div
            className="pt-[100px] px-6 pb-6"
            style={{ paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem" }}
          >
            <div className="grid grid-cols-12 gap-6">
              {/* Left Menu */}
  
              {/* Right Content */}
              <div className="col-span-12 md:col-span-12 bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold capitalize">{activeTab}</h2>
                  <div className="space-x-3">
                    <button className="text-sm text-red-500 hover:underline">Cancel</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                      Save Changes
                    </button>
                  </div>
                </div>
  
                {/* General Form */}
                {activeTab === "general" && (
                  <div className="space-y-6 max-w-3xl">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-indigo-600 text-white flex items-center justify-center text-3xl rounded-lg">
                        D
                      </div>
                    </div>
  
                    <FormInput label="Name" placeholder="Company Name" helper="Your company name (Ex: Theme Ocean)" />
                    <FormInput label="Address" placeholder="Company Address" helper="Your company address (Ex: 708 Heaven Court)" />
                    <FormInput label="City" placeholder="Company City" helper="Your company city (Ex: Levittown)" />
                    <FormInput label="State" placeholder="Company State" helper="Your company state (Ex: NY 11756)" />
                    <FormInput label="Zip" placeholder="Zip Code" helper="Zip Code (Ex: 11756)" />
                    <FormInput label="Phone" placeholder="Phone Number" />
                    <FormInput label="Email" placeholder="Company Email" />
                  </div>
                )}
              </div>
            </div>
  
            <DashboardFooter />
          </div>
        </div>
      </div>
    );
  }
  
  function FormInput({ label, placeholder, helper }) {
    return (
      <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {helper && <p className="text-xs text-gray-400 mt-1">{helper}</p>}
      </div>
    );
  }
  
  export default Setting;
  