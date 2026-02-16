import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Utility/Header";
import Navbar from "./Utility/Navbar";
// import backgroundImage from "./assets/bgImage/bg-13.png";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./Features/authSlice";
import DashboardHome from "./DashboardHome";
import Login from "./Login";


function App() {
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [showLoginPage, setShowLoginPage] = useState(false);

  useEffect(() => {
    // Load user from localStorage on app start
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
      setShowLoginPage(false);
    } else {
      setShowLoginPage(true);
    }
  }, [dispatch]);
 
  if (showLoginPage) {
    return <Login />;
  }

  return (
    <div
      className="flex h-full glass-effect bg-blue-50 bg-cover bg-center bg-no-repeat"
      
    >
      <Navbar />
      <div className="flex-1 trtransition">
        <Header title="Dashboard" subtitle="Admin/Dashboard" user={user} />

        <div
          className="pt-[100px] trtransition"
          style={{ paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem" }}
        >
          <DashboardHome />

        </div>
      </div>
    </div>
  );
}

export default App;
