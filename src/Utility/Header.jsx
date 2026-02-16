import React, { useEffect, useState , useRef} from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import AccountMenu from "./AccountMenu";
import logo from "../assets/logo.png"
import axios from "axios";

function Header({ title, subtitle, user }) {
  const isExpanded = useSelector((state) => state.ui.isSidebarExpanded);
  const [showMenu, setShowMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

const setTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  setShowThemeMenu(false);
};
const menuRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

useEffect(() => {
  const savedTheme = localStorage.getItem("theme") || "white";
  document.body.setAttribute("data-theme", savedTheme);
}, []);


  const logout = async () => {
    const res = await axios.get(`http://localhost:8000/crm/logout/?username=${user.username}/`,)
    localStorage.removeItem("user");
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-[72px]
      backdrop-blur-xl   
      flex items-center justify-between px-6
      ${isExpanded ? "left-64" : "left-20"}`}
    >
      {/* Left */}
      <div>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        {/* Notification */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100">
          <FontAwesomeIcon icon={faBell} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Theme btn */}
        <div className="relative">
  {/* Theme trigger */}
  <button
    onClick={() => setShowThemeMenu(!showThemeMenu)}
    className="px-3 py-1 rounded-lg border border-gray-300 glass-effect flex items-center gap-2 hover:shadow-md"
  >
     <span className="text-sm">Theme</span>
  </button>

  {/* Dropdown */}
  {showThemeMenu && (
    <div className="absolute right-0 mt-2 w-40 rounded-xl glass-effect shadow-xl z-50">
      <button
        onClick={() => setTheme("white")}
        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-t-xl"
      >
        <span className="w-3 h-3 rounded-full bg-white border"></span>
        <span className="text-sm">White</span>
      </button>

      <button
        onClick={() => setTheme("dark")}
        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-blue-50"
      >
        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
        <span className="text-sm">Dark Blue</span>
      </button>

      <button
        onClick={() => setTheme("green")}
        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-green-50 rounded-b-xl"
      >
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="text-sm">Green</span>
      </button>
    </div>
  )}
</div>


        {/* Account */}
    {/* Account */}
<div className="relative" ref={menuRef}>
  <img
    src={logo}
    alt="user"
    className="w-9 h-9 rounded-full cursor-pointer"
    onClick={() => setShowMenu((prev) => !prev)}
  />

  {showMenu && <AccountMenu user={user} onLogout={logout} />}
</div>

      </div>
    </header>
  );
}

export default Header;
