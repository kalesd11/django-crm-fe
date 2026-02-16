import React from "react";

function StatsCard({
  title,
  amount,
  description,
  color = "green",
}) {
  const colorMap = {
    green: {
      text: "text-green-600",
      border: "border-green-200",
      bg: "bg-green-50",
      line: "stroke-green-500",
    },
    red: {
      text: "text-red-600",
      border: "border-red-200",
      bg: "bg-red-50",
      line: "stroke-red-500",
    },
  };

  const styles = colorMap[color];

  return (
    <div
      className={`glass-effect border ${styles.border} rounded-2xl p-6`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className={`${styles.text} text-sm font-medium`}>
          {title}
        </p>
        <select className="text-xs border rounded px-2 py-1 bg-white">
          <option>2023</option>
          <option>2024</option>
        </select>
      </div>

      <p className={`text-2xl font-bold ${styles.text}`}>
        {amount}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        {description}
      </p>

      {/* Mini chart */}
      <div className="mt-4">
        <svg
          viewBox="0 0 100 30"
          className={`w-full h-20 ${styles.bg} rounded-xl`}
        >
          <path
            d="M0 20 C10 10, 20 30, 30 20
               S50 10, 60 20
               S80 30, 100 20"
            fill="none"
            strokeWidth="2"
            className={styles.line}
          />
        </svg>
      </div>
    </div>
  );
}

export default function SalesStats() {
  return (
    <div className="space-y-6">
      <StatsCard
        title="Earnings"
        amount="+ $55,236 USD"
        description="Earnings is 69% more than last month."
        color="green"
      />

      <StatsCard
        title="Expenses"
        amount="- $16,845 USD"
        description="Expenses is 47% more than last month."
        color="red"
      />
    </div>
  );
}
