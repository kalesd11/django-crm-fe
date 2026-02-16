import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes.jsx";

import { Provider } from "react-redux";
import { store } from "./Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);
