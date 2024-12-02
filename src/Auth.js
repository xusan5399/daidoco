import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Auth() {
  const [user, setUser] = useState(null);

  // 监听用户登录状态
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // 更新用户状态
    });
    return () => unsubscribe(); // 清理监听器
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("登录成功: ", result.user);
    } catch (error) {
      console.error("登录失败: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("登出成功");
    } catch (error) {
      console.error("登出失败: ", error);
    }
  };

  return (
    <div className="auth">
      {user ? (
        <div>
          <p>欢迎, {user.displayName}</p>
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>使用 Google 登录</button>
      )}
    </div>
  );
}
