import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import Navbar from "./Navbar";
import Profile from "./Profile";
import CreateAssignment from "./CreateAssignment"; // 新增的发布课题组件

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 模拟从 localStorage 获取登录状态
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("user", "authenticated");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/create-assignment"
            element={
              isAuthenticated ? <CreateAssignment /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
