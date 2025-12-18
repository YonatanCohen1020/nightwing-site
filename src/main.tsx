import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./styles/index.css";
import "./i18n";

// Enable manual scroll restoration to preserve scroll position on refresh
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
