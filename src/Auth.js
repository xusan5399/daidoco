import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase"; // 假设你已正确配置 Firebase

export default function Auth({ onLogin }) {
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`欢迎, ${result.user.displayName}`);
      onLogin(); // 登录成功后通知父组件更新状态
    } catch (err) {
      setError("登录失败，请重试");
      console.error("登录失败: ", err);
    }
  };

  return (
    <div className="auth">
      <button onClick={handleGoogleLogin}>使用 Google 登录</button>
      {error && <p>{error}</p>}
    </div>
  );
}
