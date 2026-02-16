import React from "react";
  import { useNavigate } from 'react-router-dom';

export default function Dialog({ isOpen, onAction, button , dialogHeading, dialogSubHeading }) {
  if (!isOpen) return null;

 const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] h-[200px] flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">{dialogHeading}</h2>
          <p className="text-center text-gray-700">{dialogSubHeading}</p>
        </div>

        <div className="flex justify-around mt-6">
            {button == "done" && (
          <button
            onClick={() => {onAction("done");
              //  navigate("/notificationOFgoal");
           }}
            className="buttonCSS"
          >
            Done
          </button>
          )}
          {button == "yes" && (
          <button
            onClick={() => onAction("Yes")}
            className="buttonCSS"
          >
            Yes
          </button>
           )}
            {button == "no" && (
          <button
            onClick={() => onAction("No")}
            className="buttonCSS"
          >
            No
          </button>
             )}
            {button == "yes-no" && (
                <div className="flex gap-5">
          <button
            onClick={() => onAction("Yes")}
            className="buttonCSS"
          >
            Yes
          </button>
          <button
            onClick={() => onAction("No")}
            className="buttonCSS"
          >
            No
          </button>
          </div>
          
             )}
        </div>
      </div>
    </div>
  );
}
