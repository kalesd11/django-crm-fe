import React from "react";

function StatCard({ title, value, change }) {
  return (
    <div className=" glass-effect backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500">{title}</p>
      <div className="flex items-end justify-between mt-3">
        <h2 className="text-3xl font-semibold">{value}</h2>
        {change && (
          <span className="text-sm text-green-600 font-medium">
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatCard;
