import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";

import Home from './pages/Home'
import Project from './pages/Projects'
import Contact from './pages/Contact'

import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/PreLoader"
import ScrollToTop from "./components/ScrollToTop"

import "./App.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ScrollToSection() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // Slight delay to ensure the page has loaded
    const timeoutId = setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (pathname === '/') {
        window.scrollTo(0, 0);
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [hash, pathname]);  

  return null;
}

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <ScrollToSection />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;