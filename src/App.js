import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home"; // 引入主页
import PostDetail from "./PostDetail"; // 引入帖子详情页组件
import Navbar from "./Navbar";
import Profile from "./Profile";
import CreateAssignment from "./CreateAssignment";
import LeftDrawer from "./LeftDrawer"; // 引入左侧抽屉组件
import BasicFAB from "./BasicFAB"; // pen

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
      {/* 顶部导航栏 */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <div className="container">
        {/* 左侧抽屉 */}
        <LeftDrawer
          isOpen={isDrawerOpen}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />

        <div className="content">
          {/* 路由配置 */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 登录路由 */}
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
            {/* 个人资料 */}
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />}
            />
            {/* 创建作业 */}
            <Route
              path="/create-assignment"
              element={
                isAuthenticated ? <CreateAssignment /> : <Navigate to="/auth" />
              }
            />
            {/* 帖子详情页面 */}
            <Route path="/post/:postId" element={<PostDetail />} />
            {/* 如果没有匹配的路由，重定向到首页 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <BasicFAB />
        </div>
      </div>
    </Router>
  );
}
