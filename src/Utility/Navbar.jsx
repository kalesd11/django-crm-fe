import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faChevronDown,
  faArrowLeft,
  faArrowRight,
  faChartBar,
  faUsers,
  faFolderOpen,
  faBullseye,
  faAddressCard,
  faFileAlt, // New icon for Application
  faCog // Another alternative icon
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Features/uiSlice";
import logo from "../../src/assets/logo.png";

const SidebarItem = ({ icon, label, to, expanded, active }) => (
  <Link to={to}>
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all
        ${active ? "bg-blue-600 text-white" : "hover:bg-blue-100"}
      `}
    >
      <FontAwesomeIcon icon={icon} />
      {expanded && <span className="text-sm font-medium">{label}</span>}
    </div>
  </Link>
);

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isExpanded = useSelector((state) => state.ui.isSidebarExpanded);

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    if (!isExpanded) return;
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen glass-effect transition-all duration-300
      ${isExpanded ? "w-64" : "w-20"} p-4`}
    >
      {/* Toggle */}
      <div className="flex justify-end mb-6">
        <button onClick={() => dispatch(toggleSidebar())}>
          <FontAwesomeIcon icon={isExpanded ? faArrowLeft : faArrowRight} />
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <img
          src={logo}
          alt="Delux Logo"
          className="w-10 h-10 rounded-lg object-contain"
        />

        {isExpanded && (
          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-wide text-blue-900">
              CRM
            </h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {/* DASHBOARD */}
        <SidebarItem
          icon={faTachometerAlt}
          label="Dashboard"
          to="/"
          expanded={isExpanded}
          active={location.pathname === "/"}
        />

        {/* REPORTS */}
        <div
          onClick={() => toggleMenu("report")}
          className="flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-100"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faChartBar} />
            {isExpanded && <span>Reports</span>}
          </div>
          {isExpanded && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform ${
                openMenu === "report" ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {openMenu === "report" && isExpanded && (
          <div className="ml-10 space-y-2 text-sm">
            <Link to="/salesReport" className="block hover:text-blue-600">
              Sales Report
            </Link>
            <Link to="/projectReport" className="block hover:text-blue-600">
              Project Report
            </Link>
          </div>
        )}

        {/* CUSTOMER */}
        <div
          onClick={() => toggleMenu("customer")}
          className="flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-100"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faUsers} />
            {isExpanded && <span>Customer</span>}
          </div>
          {isExpanded && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform ${
                openMenu === "customer" ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {openMenu === "customer" && isExpanded && (
          <div className="ml-10 space-y-2 text-sm">
            <Link to="/CustomerView" className="block hover:text-blue-600">
              View
            </Link>
            <Link to="/CustomerNew" className="block hover:text-blue-600">
              Create
            </Link>
          </div>
        )}

        {/* LEADS */}
        <div
          onClick={() => toggleMenu("leads")}
          className="flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-100"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faAddressCard} />
            {isExpanded && <span>Leads</span>}
          </div>

          {isExpanded && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform ${
                openMenu === "leads" ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {openMenu === "leads" && isExpanded && (
          <div className="ml-10 space-y-2 text-sm">
            <Link to="/LeadView" className="block hover:text-blue-600">
              View
            </Link>
            <Link to="/LeadCreate" className="block hover:text-blue-600">
              Create
            </Link>
          </div>
        )}

        {/* PROJECTS */}
        <div
          onClick={() => toggleMenu("projects")}
          className="flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-100"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faFolderOpen} />
            {isExpanded && <span>Projects</span>}
          </div>

          {isExpanded && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform ${
                openMenu === "projects" ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {openMenu === "projects" && isExpanded && (
          <div className="ml-10 space-y-2 text-sm">
            <Link to="/ProjectView" className="block hover:text-blue-600">
              View
            </Link>
            <Link to="/ProjectCreate" className="block hover:text-blue-600">
              Create
            </Link>
          </div>
        )}

        {/* APPLICATION - Now with separate icon */}
        <div
          onClick={() => toggleMenu("application")}
          className="flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-100"
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faFileAlt} /> {/* Changed icon */}
            {isExpanded && <span>Application</span>}
          </div>

          {isExpanded && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform ${
                openMenu === "application" ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {openMenu === "application" && isExpanded && (
          <div className="ml-10 space-y-2 text-sm">
            <Link to="/applicationNotes" className="block hover:text-blue-600">
              Notes
            </Link>
            <Link to="/applicationStorage" className="block hover:text-blue-600">
              Storage
            </Link>
          </div>
        )}

        {/* SETTINGS */}
        {/* <SidebarItem
          icon={faBullseye}
          label="Settings"
          to="/Setting"
          expanded={isExpanded}
          active={location.pathname === "/settings"}
        /> */}
      </div>
    </aside>
  );
}

export default Navbar;