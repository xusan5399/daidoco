import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import "./styles.css";

export default function Home({ onLogin }) {
  return (
    <div className="home">
      <h1>欢迎来到大学作业课题交流平台</h1>
      <Auth onLogin={onLogin} />
      <Link to="/create-assignment">发布新课题</Link>
    </div>
  );
}
