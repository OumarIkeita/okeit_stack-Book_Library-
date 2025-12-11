import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navb from "./Navb";
import All_pages from "../pages/pages";
import Footer from "./Foot";
export default function NavRouter() {
  return (
    <>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navb />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<All_pages.Home />} />
              <Route path="/favorites" element={<All_pages.Favorites />} />
            </Routes>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </Router>
    </>
  );
}
