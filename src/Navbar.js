import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { auth } from "./firebase"; // Firebaseの設定をインポート
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import SearchIcon from "@mui/icons-material/Search"; // 导入搜索图标
import "./styles.css"; // スタイルファイル

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // 搜索框的状态

  // Google登录处理
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      setUser({
        name: result.user.displayName,
        avatarUrl: result.user.photoURL,
      });
    } catch (error) {
      console.error("Google登录错误:", error);
    }
  };

  // 登录状态切换
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setUser(null);
      setAnchorEl(null); // 清空菜单状态
    } catch (error) {
      console.error("登出错误:", error);
    }
  };

  // 获取用户登录状态
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("Auth state changed:", currentUser);
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          avatarUrl: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe; // 订阅解除
  }, []);

  // 搜索框输入变化处理函数
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 搜索提交函数
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("搜索内容:", searchQuery);
    // 你可以在这里处理搜索逻辑，例如跳转到搜索结果页或发送API请求
  };

  // 用户头像点击菜单显示
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 点击时设置anchorEl
  };

  // 菜单关闭
  const handleClose = () => {
    setAnchorEl(null); // 关闭菜单时清空anchorEl
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="./img/logo.png" alt="Logo" />
        <span>DAI DO EXCH</span>
      </div>

      {/* 搜索框部分 */}
      <div className="search-box">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <TextField
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon /> {/* 搜索图标 */}
                </InputAdornment>
              ),
            }}
            style={{
              marginRight: "10px",
              borderRadius: "25px", // 圆角处理
              backgroundColor: "#f5f5f5", // 背景色设置为浅灰色
            }}
          />
        </form>
      </div>

      {/* 用户信息菜单 */}
      {user ? (
        <div className="avatar-menu">
          <Avatar
            alt={user.name}
            src={user.avatarUrl}
            sx={{ cursor: "pointer" }}
            onClick={handleClick} // 点击头像时显示菜单
          />
          {/* 用户菜单 */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)} // 只有点击时anchorEl才会被设置，菜单才会显示
            onClose={handleClose} // 关闭菜单时清空anchorEl
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose}>プロフィール</MenuItem>
            <MenuItem onClick={handleClose}>マイアカウント</MenuItem>
            <MenuItem onClick={handleClose}>設定</MenuItem>
            <MenuItem onClick={handleClose}>通知</MenuItem>
            <MenuItem onClick={handleClose}>メッセージ</MenuItem>
            <MenuItem onClick={handleClose}>コミュニティ</MenuItem>
            <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
          </Menu>
        </div>
      ) : (
        <Button onClick={handleLogin}>ログイン</Button>
      )}
    </div>
  );
}
