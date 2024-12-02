import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import { auth } from "./firebase"; // Firebaseの設定をインポート
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import "./styles.css"; // スタイルファイル

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  // Googleログイン処理
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user); // ログイン後のユーザ情報をログに出力
      setUser({
        name: result.user.displayName,
        avatarUrl: result.user.photoURL,
      });
    } catch (error) {
      console.error("Googleログインエラー:", error);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out"); // 退出后的日志
      setUser(null); // ユーザー情報をクリア
      setAnchorEl(null); // 清空菜单状态
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  // ログイン状態のユーザー情報を取得
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("Auth state changed:", currentUser); // 每次认证状态变化的日志
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          avatarUrl: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe; // 購読解除
  }, []);

  // アバタークリックでメニューを表示
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 点击时才设置 anchorEl
  };

  // メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null); // 关闭菜单时清空 anchorEl
  };

  console.log("Rendered user state:", user); // 渲染时输出用户状态

  return (
    <div className="navbar">
      <div className="logo">
        <img src="./img/logo.png" alt="Logo" />
        <span>DAI DO EXCH</span>
      </div>

      {/* ログインユーザー情報 */}
      {user ? (
        <div className="avatar-menu">
          <Avatar
            alt={user.name}
            src={user.avatarUrl}
            sx={{ cursor: "pointer" }}
            onClick={handleClick} // アバタークリックでメニュー表示
          />
          {/* ユーザーメニュー */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)} // 只有点击时 anchorEl 才会被设置，菜单才会显示
            onClose={handleClose} // 关闭菜单时清空 anchorEl
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem onClick={handleClose}>プロフィール</MenuItem>{" "}
            {/* プロフィール */}
            <MenuItem onClick={handleClose}>マイアカウント</MenuItem>{" "}
            {/* マイアカウント */}
            <MenuItem onClick={handleClose}>設定</MenuItem> {/* 設定 */}
            <MenuItem onClick={handleClose}>通知</MenuItem> {/* 通知 */}
            <MenuItem onClick={handleClose}>メッセージ</MenuItem>{" "}
            {/* メッセージ */}
            <MenuItem onClick={handleClose}>コミュニティ</MenuItem>{" "}
            {/* コミュニティ */}
            <MenuItem onClick={handleLogout}>ログアウト</MenuItem>{" "}
            {/* ログアウト */}
          </Menu>
        </div>
      ) : (
        <Button onClick={handleLogin}>Googleでログイン</Button>
      )}
    </div>
  );
}
