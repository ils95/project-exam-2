import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../src/pages/Landing";
import Browse from "../src/pages/Browse";
import "./sass/Style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Layout/Nav";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Nav />

          <Routes>
            <Route path="/browse" element={<Browse />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
