import { useState } from "react";
import { useSelector } from "react-redux";
import {
  User,
  CreditCard,
  Package,
  Check,
  X,
  ChevronDown,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react";
import React from "react";
import Navbar from "../Utility/Navbar";
import Header from "../Utility/Header";
import DashboardFooter from "../Utility/Footer";
import axios from "axios";

function CustomerNew() {
  const user = useSelector((state) => state.auth.user);
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form state matching Django Customer model
  const [formData, setFormData] = useState({
    // Django model fields
    firstname: "",
    lastname: "",
    company: "",
    phone: "",
    location: "",
    subscription: "",

    // Billing fields
    billingAddress: "",
    billingZipCode: "",
    billingCountry: "United States",
    billingState: "",
    billingCity: "",

    // Shipping fields
    shippingAddress: "",
    shippingZipCode: "",
    shippingCountry: "United States",
    shippingState: "",
    shippingCity: "",
    shippingSameAsBilling: true,

    // Additional profile fields
    email: "",
    designation: "",
    website: "",
    vat: "",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing & Shipping", icon: CreditCard },
    { id: "subscription", label: "Subscription", icon: Package },
  ];

  // Countries for dropdown
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "India",
  ];

  // Sample subscription options
  const subscriptionOptions = [
    { id: 1, name: "Basic Plan", price: "$12.99/month" },
    { id: 2, name: "Pro Plan", price: "$29.99/month" },
    { id: 3, name: "Enterprise Plan", price: "$49.99/month" },
  ];

  // Subscription plans for display
  const subscriptionPlans = [
    {
      id: "free",
      name: "Basic Plan",
      price: "$12.99/month",
      features: ["1 User", "1GB Storage", "Basic Support", "Limited Features"],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: "$29.99/month",
      features: [
        "5 Users",
        "50GB Storage",
        "Priority Support",
        "All Features",
        "Advanced Analytics",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: "$49.99/month",
      features: [
        "Unlimited Users",
        "500GB Storage",
        "24/7 Support",
        "Custom Solutions",
        "API Access",
        "White Label",
      ],
      popular: false,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate required fields
      if (!formData.firstname || !formData.lastname) {
        throw new Error("First name and last name are required");
      }

      // Prepare data for API - only include fields that match the Django model
      const customerData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        company: formData.company || "",
        phone: formData.phone || "",
        location: formData.location || 1,
        subscription_id: 1 || null,
      };

      // Make API call to create customer
      const response = await axios.post(
        `${import.meta.env.VITE_API}/customers/`,
        customerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Customer created successfully:", response.data);
      setSuccess("Customer created successfully!");

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstname: "",
          lastname: "",
          company: "",
          phone: "",
          location: "",
          subscription: "",
          billingAddress: "",
          billingZipCode: "",
          billingCountry: "United States",
          billingState: "",
          billingCity: "",
          shippingAddress: "",
          shippingZipCode: "",
          shippingCountry: "United States",
          shippingState: "",
          shippingCity: "",
          shippingSameAsBilling: true,
          email: "",
          designation: "",
          website: "",
          vat: "",
        });
        setActiveTab("profile");
      }, 2000);
    } catch (err) {
      console.error("Error creating customer:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create customer",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Header
          title="Create New Customer"
          subtitle="Duralux / Meta Memo"
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
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center text-gray-600 mt-2">
                  <span className="text-gray-400 mr-2">META MEMO</span>
                  <span className="mx-2">›</span>
                  <span>Create New Customer</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Create Customer
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Success
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>{success}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Warning Banner */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Fill in the customer information. Required fields are
                      marked with *
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Main Form with Tabs */}
              <div className="space-y-6">
                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow">
                  <div className="border-b border-gray-200">
                    <nav className="flex overflow-x-auto">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                            activeTab === tab.id
                              ? "border-blue-600 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {tab.icon && <tab.icon size={16} className="mr-2" />}
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {/* Profile Tab - Django model fields */}
                    {activeTab === "profile" && (
                      <div className="space-y-8">
                        {/* Personal Information Form - Django Model Fields */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Customer Information
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Fields marked with * are required
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name - Required */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter first name"
                              />
                            </div>

                            {/* Last Name - Required */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter last name"
                              />
                            </div>

                            {/* Email (Additional) */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter email address"
                              />
                            </div>

                            {/* Phone */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter phone number"
                              />
                            </div>

                            {/* Company */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company
                              </label>
                              <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter company name"
                              />
                            </div>

                            {/* Designation */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Designation
                              </label>
                              <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter designation"
                              />
                            </div>

                            {/* Website */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                              </label>
                              <input
                                type="text"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter website URL"
                              />
                            </div>

                            {/* VAT */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                VAT
                              </label>
                              <input
                                type="text"
                                name="vat"
                                value={formData.vat}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter VAT number"
                              />
                            </div>

                            {/* Location */}
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                              </label>
                              <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter location (city, country)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Billing & Shipping Tab */}
                    {activeTab === "billing" && (
                      <div className="space-y-8">
                        {/* Billing Address Section */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Billing Address
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Address */}
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                              </label>
                              <input
                                type="text"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter billing address"
                              />
                            </div>

                            {/* Zip Code */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Zip Code
                              </label>
                              <input
                                type="text"
                                name="billingZipCode"
                                value={formData.billingZipCode}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., 94105"
                              />
                            </div>

                            {/* Country */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country
                              </label>
                              <div className="relative">
                                <select
                                  name="billingCountry"
                                  value={formData.billingCountry}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                >
                                  {countries.map((country) => (
                                    <option key={country} value={country}>
                                      {country}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                              </div>
                            </div>

                            {/* State */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                State
                              </label>
                              <input
                                type="text"
                                name="billingState"
                                value={formData.billingState}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter state"
                              />
                            </div>

                            {/* City */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                City
                              </label>
                              <input
                                type="text"
                                name="billingCity"
                                value={formData.billingCity}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter city"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Shipping Address Section */}
                        <div className="border-t border-gray-200 pt-8">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Shipping Address
                          </h3>

                          <div className="mb-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="shippingSameAsBilling"
                                name="shippingSameAsBilling"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                checked={formData.shippingSameAsBilling}
                                onChange={handleInputChange}
                              />
                              <label
                                htmlFor="shippingSameAsBilling"
                                className="ml-2 text-sm font-medium text-gray-700"
                              >
                                Same as billing address
                              </label>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Address */}
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                              </label>
                              <input
                                type="text"
                                name="shippingAddress"
                                value={
                                  formData.shippingSameAsBilling
                                    ? formData.billingAddress
                                    : formData.shippingAddress
                                }
                                onChange={handleInputChange}
                                disabled={formData.shippingSameAsBilling}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                placeholder="Enter shipping address"
                              />
                            </div>

                            {/* Zip Code */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Zip Code
                              </label>
                              <input
                                type="text"
                                name="shippingZipCode"
                                value={
                                  formData.shippingSameAsBilling
                                    ? formData.billingZipCode
                                    : formData.shippingZipCode
                                }
                                onChange={handleInputChange}
                                disabled={formData.shippingSameAsBilling}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                placeholder="e.g., 94105"
                              />
                            </div>

                            {/* Country */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country
                              </label>
                              <div className="relative">
                                <select
                                  name="shippingCountry"
                                  value={
                                    formData.shippingSameAsBilling
                                      ? formData.billingCountry
                                      : formData.shippingCountry
                                  }
                                  onChange={handleInputChange}
                                  disabled={formData.shippingSameAsBilling}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 appearance-none"
                                >
                                  {countries.map((country) => (
                                    <option key={country} value={country}>
                                      {country}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                              </div>
                            </div>

                            {/* State */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                State
                              </label>
                              <input
                                type="text"
                                name="shippingState"
                                value={
                                  formData.shippingSameAsBilling
                                    ? formData.billingState
                                    : formData.shippingState
                                }
                                onChange={handleInputChange}
                                disabled={formData.shippingSameAsBilling}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                placeholder="Enter state"
                              />
                            </div>

                            {/* City */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                City
                              </label>
                              <input
                                type="text"
                                name="shippingCity"
                                value={
                                  formData.shippingSameAsBilling
                                    ? formData.billingCity
                                    : formData.shippingCity
                                }
                                onChange={handleInputChange}
                                disabled={formData.shippingSameAsBilling}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                placeholder="Enter city"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Subscription Tab */}
                    {activeTab === "subscription" && (
                      <div className="space-y-8">
                        {/* Subscription Selection */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Select Subscription Plan
                          </h3>

                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Subscription Plan
                            </label>
                            <div className="relative">
                              <select
                                name="subscription"
                                value={formData.subscription}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                              >
                                <option value="">
                                  Select a subscription plan
                                </option>
                                {subscriptionOptions.map((sub) => (
                                  <option key={sub.id} value={sub.id}>
                                    {sub.name} - {sub.price}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* Available Plans */}
                        <div className="border-t border-gray-200 pt-8">
                          <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Available Plans
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {subscriptionPlans.map((plan) => (
                              <div
                                key={plan.id}
                                className={`border rounded-lg p-6 ${plan.popular ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-200"}`}
                              >
                                {plan.popular && (
                                  <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                                    POPULAR
                                  </div>
                                )}

                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                  {plan.name}
                                </h3>
                                <div className="text-2xl font-bold text-gray-900 mb-6">
                                  {plan.price}
                                </div>

                                <ul className="space-y-2 mb-6">
                                  {plan.features.map((feature, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center text-sm text-gray-600"
                                    >
                                      <Check
                                        size={16}
                                        className="text-green-500 mr-2"
                                      />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>

                                <button
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      subscription: plan.id,
                                    }))
                                  }
                                  className={`w-full py-2 rounded-lg font-medium ${
                                    formData.subscription === plan.id
                                      ? "bg-blue-600 text-white hover:bg-blue-700"
                                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  {formData.subscription === plan.id
                                    ? "Selected"
                                    : "Choose Plan"}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
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

export default CustomerNew;
