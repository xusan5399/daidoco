import React, { useState } from "react";
import { Link } from "react-router-dom";
import LeftDrawer from "./LeftDrawer";
import {
  FaComment,
  FaLightbulb,
  FaTasks,
  FaUser,
  FaRegFileAlt,
  FaUsers,
} from "react-icons/fa"; // 引入react-icons中的图标
import Auth from "./Auth";
import "./styles.css";

export default function Home({ onLogin }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 控制菜单栏的展开/收缩

  // 切换菜单栏显示/隐藏
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="container">
      {/* 左侧菜单栏 */}
      <div className="sidebar">
        {/* 第一个左侧小板块 */}
        <div className="sidebar-small">
          <div className="sidebar-item">
            <Link to="/home">
              <FaComment />
              <span>讨论区</span>
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to="/topics">
              <FaLightbulb />
              <span>最新话题</span>
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to="/tasks">
              <FaTasks />
              <span>任务管理</span>
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to="/profile">
              <FaUser />
              <span>个人资料</span>
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to="/files">
              <FaRegFileAlt />
              <span>资料上传</span>
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to="/users">
              <FaUsers />
              <span>用户管理</span>
            </Link>
          </div>
        </div>

        {/* 第二个左侧小板块 */}
        <div className="sidebar-small">
          <div className="sidebar-item">
            <Link to="/notifications">
              <FaComment />
              <span>通知</span>
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to="/messages">
              <FaLightbulb />
              <span>消息</span>
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to="/calendar">
              <FaTasks />
              <span>日历</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="content">
        <h1>大同大学課題交流プラットフォームへようこそ</h1>
        <Auth onLogin={onLogin} />
        <Link to="/create-assignment">发布新课题</Link>

        {/* 最近讨论区 */}
        <div className="section">
          <h2>最近讨论</h2>
          <div className="section-item">
            <FaComment />
            <h3>民间冬日绘画活动讨论帖</h3>
            <p>chen_zhe · 6天前</p>
          </div>
          <div className="section-item">
            <FaComment />
            <h3>洛谷学术（？）群</h3>
            <p>chen_zhe · 7天前</p>
          </div>
          <div className="section-item">
            <FaComment />
            <h3>求助</h3>
            <p>dreamhzz · 29分钟前</p>
          </div>
        </div>

        {/* 最新话题区 */}
        <div className="section">
          <h2>最新话题</h2>
          <div className="section-item">
            <FaLightbulb />
            <h3>NOIP 代码出来了吗</h3>
            <p>OoHappyOo · 32分钟前</p>
          </div>
          <div className="section-item">
            <FaTasks />
            <h3>P1349 80分求助</h3>
            <p>WZZ_11 · 32分钟前</p>
          </div>
        </div>

        {/* 个人中心区 */}
        <div className="section">
          <h2>个人中心</h2>
          <div className="section-item">
            <FaUser />
            <h3>查看个人资料</h3>
            <p>修改个人信息，查看发布的课题。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
