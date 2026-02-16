import React from "react";

function ActivityCard() {
  return (
    <div className="glass-effect backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-100 h-[320px]">
      <h3 className="font-semibold mb-4">Recent Activity</h3>

      <ul className="space-y-4 text-sm">
        <li>✅ Goal “Q4 Sales” completed</li>
        <li>📌 New goal assigned</li>
        <li>👤 User added to project</li>
        <li>📊 Performance reviewed</li>
      </ul>
    </div>
  );
}

export default ActivityCard;
