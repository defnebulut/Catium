import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./pages/login/AuthProvider";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { BrowserRouter,Route,Routes } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
