import { Users, Shield, Eye, Check, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";

function ProjectCreate() {
  const user = useSelector((state) => state.auth.user);
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);

  const [activeTab, setActiveTab] = useState("type");
  const [projectType, setProjectType] = useState(null);
  const [projectManage, setProjectManage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Default IDs (you can change these as needed)
  const DEFAULT_SUBSCRIPTION_ID = 1;
  const DEFAULT_CUSTOMER_ID = 1;
  const DEFAULT_ASSIGNED_TO_ID = 1;

  const [projectDetails, setProjectDetails] = useState({
    name: "",
    notes: "",
    type: "",
    budget: "",
    releaseDate: "",
    targetTitle: "",
    targetDescription: "",
    tags: [],
    subscription_id: DEFAULT_SUBSCRIPTION_ID,
    customer_id: DEFAULT_CUSTOMER_ID,
    assignedTo_id: DEFAULT_ASSIGNED_TO_ID,
  });

  const [attachments, setAttachments] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const updateDetails = (key, value) => {
    setProjectDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !projectDetails.tags.includes(tagInput.trim())) {
      setProjectDetails((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProjectDetails((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare the project data according to the serializer
      const projectData = {
        name: projectDetails.name,
        notes: JSON.stringify({
          description: projectDetails.notes,
          targetTitle: projectDetails.targetTitle,
          targetDescription: projectDetails.targetDescription,
          tags: projectDetails.tags,
        }),
        type: projectType || "personal",
        budget: projectDetails.budget || "0",
        releaseDate: projectDetails.releaseDate || new Date().toISOString(),
        subscription_id: projectDetails.subscription_id,
        customer_id: projectDetails.customer_id,
        assignedTo_id: projectDetails.assignedTo_id || DEFAULT_ASSIGNED_TO_ID,
      };

      // Create the project
      const response = await axios.post(`${import.meta.env.VITE_API}/projects/`, projectData);
      const createdProject = response.data;

      // Upload attachments if any
      if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach((file) => {
          formData.append("files", file);
        });
        formData.append("project_id", createdProject.id);

        await axios.post("/api/projects/upload-attachments/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // Redirect or show success message
      alert("Project created successfully!");
      // Optionally redirect to projects list
      // window.location.href = '/projects';
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create project. Please try again.",
      );
      console.error("Error creating project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = ["type", "details", "budget", "attachment"];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <Header title="Projects" subtitle="Projects / Create" user={user} />

        <div
          className="pt-[100px] px-6 pb-6 space-y-6"
          style={{ paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem" }}
        >
          <div className="text-sm text-gray-500">Projects / Home / Create</div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Step Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b grid grid-cols-4 text-sm font-medium text-gray-600">
              {steps.map((step) => {
                const disabled =
                  step === "details" && (!projectType || !projectManage);
                return (
                  <div
                    key={step}
                    onClick={() => !disabled && setActiveTab(step)}
                    className={`text-center py-4 capitalize ${
                      activeTab === step
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : disabled
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:text-blue-600 cursor-pointer"
                    }`}
                  >
                    {step}
                  </div>
                );
              })}
            </div>

            {/* TYPE TAB */}
            {activeTab === "type" && (
              <div className="p-10 space-y-10">
                <div>
                  <h3 className="text-lg font-semibold">Project type</h3>
                  <div className="grid gap-4 max-w-xl mt-4">
                    {["personal", "team"].map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          setProjectType(type);
                          updateDetails("type", type);
                        }}
                        className={`cursor-pointer rounded-xl p-4 flex justify-between items-center border-2 ${
                          projectType === type
                            ? "border-green-400 bg-green-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex gap-3 items-center">
                          <Users
                            className={
                              projectType === type
                                ? "text-green-500"
                                : "text-gray-400"
                            }
                          />
                          <p className="font-medium capitalize">
                            {type} Project
                          </p>
                        </div>
                        {projectType === type && (
                          <Check className="text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Project manage</h3>
                  <div className="grid gap-4 max-w-xl mt-4">
                    {[
                      { id: "everyone", label: "Everyone", icon: Eye },
                      { id: "admin", label: "Admins Only", icon: Shield },
                      { id: "specific", label: "Specific Users", icon: Users },
                    ].map(({ id, label, icon: Icon }) => (
                      <div
                        key={id}
                        onClick={() => setProjectManage(id)}
                        className={`cursor-pointer rounded-xl p-4 flex justify-between items-center border-2 ${
                          projectManage === id
                            ? "border-green-400 bg-green-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex gap-3 items-center">
                          <Icon
                            className={
                              projectManage === id
                                ? "text-green-500"
                                : "text-gray-400"
                            }
                          />
                          <p className="font-medium">{label}</p>
                        </div>
                        {projectManage === id && (
                          <Check className="text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  disabled={!projectType || !projectManage}
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-2 rounded ${
                    !projectType || !projectManage
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            {/* DETAILS TAB */}
            {activeTab === "details" && (
              <div className="p-10 flex justify-center">
                <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-xl space-y-6">
                  <h2 className="text-2xl font-semibold text-center">
                    Project Details
                  </h2>

                  {/* Project Name */}
                  <div>
                    <label className="text-sm text-gray-500">
                      Project Name *
                    </label>
                    <input
                      className="w-full mt-1 p-2 border rounded-lg"
                      placeholder="Website Development"
                      value={projectDetails.name}
                      onChange={(e) => updateDetails("name", e.target.value)}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm text-gray-500">Description</label>
                    <textarea
                      className="w-full mt-1 p-2 border rounded-lg min-h-[100px]"
                      placeholder="Project description..."
                      value={projectDetails.notes}
                      onChange={(e) => updateDetails("notes", e.target.value)}
                    />
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="text-sm text-gray-500">
                      Assigned To *
                    </label>
                    <select
                      className="w-full mt-1 p-2 border rounded-lg"
                      value={projectDetails.assignedTo_id}
                      onChange={(e) =>
                        updateDetails("assignedTo_id", parseInt(e.target.value))
                      }
                      required
                    >
                      <option value={1}>John Doe (Admin)</option>
                      <option value={2}>Jane Smith (Manager)</option>
                      <option value={3}>Bob Johnson (Developer)</option>
                    </select>
                  </div>

                  {/* Release Date */}
                  <div>
                    <label className="text-sm text-gray-500">
                      Release Date *
                    </label>
                    <input
                      type="datetime-local"
                      className="w-full mt-1 p-2 border rounded-lg"
                      value={projectDetails.releaseDate}
                      onChange={(e) =>
                        updateDetails("releaseDate", e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Hidden fields with default values */}
                  <input
                    type="hidden"
                    name="subscription_id"
                    value={projectDetails.subscription_id}
                  />
                  <input
                    type="hidden"
                    name="customer_id"
                    value={projectDetails.customer_id}
                  />

                  {/* Nav Buttons */}
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setActiveTab("type")}
                      className="border px-4 py-2 rounded-lg"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setActiveTab("budget")}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                      disabled={
                        !projectDetails.name || !projectDetails.releaseDate
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BUDGET TAB (merged with target) */}
            {activeTab === "budget" && (
              <div className="p-10 flex justify-center">
                <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-xl space-y-6">
                  <h2 className="text-2xl font-semibold text-center">
                    Budget & Target
                  </h2>

                  {/* Budget */}
                  <div>
                    <label className="text-sm text-gray-500">Budget</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded-lg"
                      placeholder="0.00"
                      value={projectDetails.budget}
                      onChange={(e) => updateDetails("budget", e.target.value)}
                    />
                  </div>

                  {/* Budget Tiers */}
                  <div className="grid gap-3">
                    <label className="text-sm text-gray-500">
                      Quick Select
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { range: "$100 - $999", value: "500" },
                        { range: "$1,000 - $4,999", value: "2500" },
                        { range: "$5,000 - $9,999", value: "7500" },
                        { range: "$10,000+", value: "10000" },
                      ].map((tier) => (
                        <div
                          key={tier.value}
                          onClick={() => updateDetails("budget", tier.value)}
                          className={`border-2 border-dashed rounded-xl p-3 cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition text-center ${
                            projectDetails.budget === tier.value
                              ? "border-blue-600 bg-blue-50"
                              : ""
                          }`}
                        >
                          <p className="text-sm font-semibold">{tier.range}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Title */}
                  <div>
                    <label className="text-sm text-gray-500">
                      Target Title
                    </label>
                    <input
                      className="w-full mt-1 p-2 border rounded-lg"
                      placeholder="Q1 2024 Target"
                      value={projectDetails.targetTitle}
                      onChange={(e) =>
                        updateDetails("targetTitle", e.target.value)
                      }
                    />
                  </div>

                  {/* Target Description */}
                  <div>
                    <label className="text-sm text-gray-500">
                      Target Description
                    </label>
                    <textarea
                      className="w-full mt-1 p-2 border rounded-lg min-h-[100px]"
                      placeholder="Describe your target goals..."
                      value={projectDetails.targetDescription}
                      onChange={(e) =>
                        updateDetails("targetDescription", e.target.value)
                      }
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-sm text-gray-500">Tags</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        className="flex-1 p-2 border rounded-lg"
                        placeholder="Add a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Add
                      </button>
                    </div>

                    {/* Tag Display */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {projectDetails.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setActiveTab("details")}
                      className="border px-4 py-2 rounded-lg"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setActiveTab("attachment")}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ATTACHMENT TAB */}
            {activeTab === "attachment" && (
              <div className="p-10 flex justify-center">
                <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-2xl space-y-6">
                  <h2 className="text-2xl font-semibold text-center">
                    Attachments
                  </h2>
                  <p className="text-gray-500 text-sm text-center">
                    Upload project files (optional)
                  </p>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed rounded-xl p-8 text-center bg-gray-50">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex flex-col items-center gap-2"
                    >
                      <Upload className="w-10 h-10 text-gray-400" />
                      <p className="text-blue-600 font-medium">
                        Click to upload
                      </p>
                      <p className="text-xs text-gray-500">or drag and drop</p>
                    </label>
                  </div>

                  {/* File List */}
                  {attachments.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium">Selected Files</h3>
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                              {file.name.split(".").pop().toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setActiveTab("budget")}
                      className="border px-4 py-2 rounded-lg"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    >
                      {isSubmitting ? "Creating..." : "Create Project"}
                    </button>
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

export default ProjectCreate;
