import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useSelector } from "react-redux";
import Navbar from "../Utility/Navbar";
import Header from "../Utility/Header";
import DashboardFooter from "../Utility/Footer";
import data from "../Store/Data.json"

function Notes() {
  const user = useSelector((state) => state.auth.user);
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
  const [filter, setFilter] = useState("all");
  const notes = data.Application.notesData

  const filteredNotes =
    filter === "all" ? notes : notes.filter(n => n.tag === filter);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-1">
        <Header title="Notes" subtitle="Applications / Notes" user={user} />

        <div
          className="pt-[100px] px-6 pb-6"
          style={{ paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem" }}
        >
          <div className="grid grid-cols-12 gap-6">

            {/* Left Filter Panel */}
            <div className="col-span-12 lg:col-span-3 bg-white rounded-xl shadow p-4 space-y-2">
              {["all", "work", "important", "business"].map(item => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`w-full text-left px-4 py-2 rounded-lg capitalize ${
                    filter === item ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Notes Grid */}
            <div className="col-span-12 lg:col-span-9 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Notes</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={16} /> Add Notes
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredNotes.map(note => (
                  <div key={note.id} className="bg-white rounded-xl shadow p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className={`w-1.5 h-12 rounded ${note.color}`} />
                      <span className="text-xs text-gray-400">{note.date}</span>
                    </div>

                    <h3 className="font-semibold text-gray-800">{note.title}</h3>
                    <p className="text-sm text-gray-600">{note.description}</p>

                    <div className="flex justify-end gap-2 text-gray-400 text-sm">
                      <button className="hover:text-blue-500">Edit</button>
                      <button className="hover:text-red-500">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default Notes;
