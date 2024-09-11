import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GeneratePage from "./components/GeneratePage";
import PasswordProtectionPage from "./components/PasswordProtectionPage";
import RedirectHandler from "./components/RedirectHandler";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route to Generate Short URL */}
        <Route path="/" element={<GeneratePage />} />

        {/* Route to handle redirection and password logic */}
        <Route path="/:code" element={<RedirectHandler />} />

        {/* Password Protection page */}
        <Route path="/password-protection/:code" element={<PasswordProtectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
