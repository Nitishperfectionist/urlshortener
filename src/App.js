import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShortUrlHandler from "./pages/ShortUrlHandler.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<ShortUrlHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
