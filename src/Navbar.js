import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import { auth } from "./firebase"; // 导入 Firebase 配置
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import "./styles.css"; // 样式文件

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  // Google 登录处理
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({
        name: result.user.displayName,
        avatarUrl: result.user.photoURL,
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // 退出登录处理
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // 清空用户信息
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // 获取登录用户信息
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          avatarUrl: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe; // 清理订阅
  }, []);

  // 点击头像，显示菜单
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 关闭菜单
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="./img/logo.png" alt="Logo" />
        <span>DAI DO EXCH</span>
      </div>

      {/* 登录用户信息 */}
      {user ? (
        <div className="avatar-menu">
          <Avatar
            alt={user.name}
            src={user.avatarUrl}
            sx={{ cursor: "pointer" }}
            onClick={handleClick} // 点击头像显示菜单
          />
          {/* 用户菜单 */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <Button onClick={handleLogin}>Login with Google</Button>
      )}
    </div>
  );
}
