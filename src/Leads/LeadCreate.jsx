import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";

function LeadCreate() {
  const user = useSelector((state) => state.auth.user);
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);

  const initialState = {
    status: "New",
    source: "Facebook",
    position: "",
    name: "",
    phone: "",
    company: "",
    email: "",
    assigned_to_id: 1, // ✅ default assigned user
    address_id: "", // must send valid address id
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createLead = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`${import.meta.env.VITE_API}/leads/`, formData);

      alert("Lead Created Successfully ✅");
      setFormData(initialState);
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Failed to create lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Header title="Leads" subtitle="Leads / Create" user={user} />

        <div
          className="pt-[100px] px-6 pb-6"
          style={{
            paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
          }}
        >
          <form onSubmit={createLead} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold">Create Lead</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  placeholder="Status"
                  className="border rounded-lg p-2"
                  required
                />

                <input
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="Source"
                  className="border rounded-lg p-2"
                  required
                />

                <input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Position"
                  className="border rounded-lg p-2"
                />

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="border rounded-lg p-2"
                  required
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border rounded-lg p-2"
                  required
                />

                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="border rounded-lg p-2"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border rounded-lg p-2"
                  required
                />

                <input
                  type="number"
                  name="address_id"
                  value={formData.address_id}
                  onChange={handleChange}
                  placeholder="Address ID"
                  className="border rounded-lg p-2"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Lead"}
              </button>
            </div>
          </form>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default LeadCreate;
