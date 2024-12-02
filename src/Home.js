import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import "./styles.css";

export default function Home({ onLogin }) {
  return (
    <div className="home">
      <h1>大同大学課題交流プラットフォームへようこそ</h1>
      <Auth onLogin={onLogin} />
      <Link to="/create-assignment">发布新课题</Link>
    </div>
  );
}
