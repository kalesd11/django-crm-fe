import React from "react";

function DashboardFooter() {
  return (
    <footer className="mt-10 border-t glass-effect rounded-xl border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 text-sm text-gray-500">
        
        {/* Left */}
        <p>
          © {new Date().getFullYear()} <span className="font-medium text-gray-700">Duralux</span>. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-600 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Support
          </a>
        </div>

      </div>
    </footer>
  );
}

export default DashboardFooter;
