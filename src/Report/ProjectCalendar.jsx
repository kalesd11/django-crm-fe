import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProjectCalendar = () => {
  const today = new Date();

  //  STATE (THIS WAS MISSING)
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0–11
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  /* ================= CALCULATIONS ================= */

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const startIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];

  // Prev month
  for (let i = startIndex; i > 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i + 1,
      type: "prev",
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      type: "current",
    });
  }

  // Next month
  while (calendarDays.length < 42) {
    calendarDays.push({
      day: calendarDays.length - (startIndex + daysInMonth) + 1,
      type: "next",
    });
  }

  /* ================= HANDLERS ================= */

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  /* ================= UI ================= */

  return (
    <div className="bg-white rounded-xl shadow p-5 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full border">
          <ChevronLeft size={18} />
        </button>

        <div className="text-center">
          <h2 className="font-semibold text-lg uppercase">
            {monthNames[currentMonth]}
          </h2>
          <p className="text-sm text-gray-500">{currentYear}</p>
        </div>

        <button onClick={nextMonth} className="p-2 rounded-full border">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-xs text-gray-500 mb-3">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
          <div key={d} className="text-center font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-6 text-center">
        {calendarDays.map((d, i) => (
          <div
            key={i}
            className={`text-sm font-medium ${
              d.type === "current"
                ? "text-gray-900"
                : "text-gray-400"
            }`}
          >
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCalendar;
