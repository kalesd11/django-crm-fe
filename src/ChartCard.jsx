import React from "react";

function ChartCard() {
  return (
    <div className="glass -effect backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-100 h-[320px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Goal Performance</h3>
        <select className="text-sm bg-gray-100 rounded-lg px-3 py-1">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      {/* Fake Chart */}
      <div className="h-full flex items-end gap-4">
        {[40, 60, 30, 80, 55, 90].map((v, i) => (
          <div key={i} className="flex-1">
            <div
              className="bg-blue-500 rounded-xl"
              style={{ height: `${v}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartCard;
