import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import UserForm from "./components/UserForm";
import "./styles/App.css";
import Home from "./components/Home";
import ImageItem from "./components/ImageItem";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserForm />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/image/:name/:handle/:address" element={<ImageItem />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
