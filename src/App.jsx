import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Country from "./pages/Country";

const App = () => {
  return (
    <Router>
      <div className="max-w-900 mx-auto">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl">
            <a href="/" className="text-blue-500">
              Logo
            </a>
          </h1>
          <button className="text-white bg-blue-500 py-2 px-4 rounded">
            Tanlanganlar
          </button>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<Country />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
