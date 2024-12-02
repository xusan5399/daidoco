import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase"; // 假设你已正确配置 Firebase

export default function Auth({ onLogin }) {
  const [error, setError] = useState(""); // 用于显示错误消息

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // 弹出 Google 登录窗口
      const result = await signInWithPopup(auth, provider);
      alert(`ようこそ, ${result.user.displayName}さん！`);
      onLogin(); // 通知父组件登录成功
    } catch (err) {
      // 针对不同错误设置消息
      setError("ログインに失敗しました。もう一度試してください。");
      console.error("ログインエラー：", err); // 控制台记录错误信息
    }
  };

  return (
    <div className="auth">
      {/* 登录按钮 */}
      <button onClick={handleGoogleLogin}>Googleでログイン</button>

      {/* 显示错误消息 */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
