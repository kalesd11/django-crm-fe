import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faCog,
  faSignOutAlt,
  faDollarSign,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png"

function AccountMenu({ user, onLogout }) {
  return (
    <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b">
        <img
          src={logo}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-900">
            {user?.username || "User Name"}
            <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
              PRO
            </span>
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <span className="text-sm font-medium">Active</span>
      </div>

      {/* Menu */}
      {/* <div className="py-2">
        <MenuItem icon={faDollarSign} label="Subscriptions" />
        <MenuItem icon={faUser} label="Profile Details" />
        <MenuItem icon={faWaveSquare} label="Activity Feed" />
        <MenuItem icon={faDollarSign} label="Billing Details" />
        <MenuItem icon={faBell} label="Notifications" />
        <MenuItem icon={faCog} label="Account Settings" />
      </div> */}

      {/* Logout */}
      <div
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer border-t"
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span className="text-sm font-medium">Logout</span>
      </div>
    </div>
  );
}

const MenuItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer">
    <FontAwesomeIcon icon={icon} className="text-gray-500" />
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

export default AccountMenu;
