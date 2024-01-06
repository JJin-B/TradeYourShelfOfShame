import App from "./App.tsx";
import { AuthProvider } from "./Wrapper/AuthContext.tsx";

import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

// import { applyMode, Mode } from "@cloudscape-design/global-styles";
// applyMode(Mode.Dark);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);
