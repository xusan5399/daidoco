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
import CreateAssignment from "./CreateAssignment";
import LeftDrawer from "./LeftDrawer"; // 引入左侧抽屉组件

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 控制抽屉的展开状态

  // 初始化时检查 localStorage 是否存储登录状态
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  // 登录成功的处理
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("user", "authenticated");
  };

  // 退出登录的处理
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // 控制左侧抽屉的打开与关闭
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="container">
        {/* 左侧抽屉 */}
        <LeftDrawer
          isOpen={isDrawerOpen}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to="/" /> // 登录后跳转到首页
                ) : (
                  <Auth onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />}
            />
            <Route
              path="/create-assignment"
              element={
                isAuthenticated ? <CreateAssignment /> : <Navigate to="/auth" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
