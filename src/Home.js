import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaComment,
  FaLightbulb,
  FaTasks,
  FaUser,
  FaRegFileAlt,
  FaUsers,
} from "react-icons/fa";
import Auth from "./Auth";
import Post from "./Post";
import "./styles.css";

// 左侧菜单项组件
const SidebarItem = ({ to, icon: Icon, label }) => (
  <div className="sidebar-item">
    <Link to={to}>
      <Icon />
      <span>{label}</span>
    </Link>
  </div>
);

export default function Home({ onLogin }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 控制菜单栏的展开/收缩

  // 切换菜单栏显示/隐藏
  const toggleSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  return (
    <div className="container">
      {/* 左侧菜单栏 */}
      <div className="sidebar">
        {/* 第一个左侧小板块 */}
        <div className="sidebar-small">
          <SidebarItem to="/home" icon={FaComment} label="讨论区" />
          <SidebarItem to="/topics" icon={FaLightbulb} label="最新话题" />
          <SidebarItem to="/tasks" icon={FaTasks} label="任务管理" />
          <SidebarItem to="/profile" icon={FaUser} label="个人资料" />
          <SidebarItem to="/files" icon={FaRegFileAlt} label="资料上传" />
          <SidebarItem to="/users" icon={FaUsers} label="用户管理" />
        </div>

        {/* 第三个左侧小板块（通知、消息、日历） */}
        <div className="sidebar-small">
          <SidebarItem to="/notifications" icon={FaComment} label="通知" />
          <SidebarItem to="/messages" icon={FaLightbulb} label="消息" />
          <SidebarItem to="/calendar" icon={FaTasks} label="日历" />
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="content">
        {/* 右侧帖子展示区 */}
        <div className="section">
          <div className="section-item">
            <div className="post-header">
              {/* 用户头像 */}
              <div className="avatar">
                <FaUser />
              </div>
              {/* 帖子标题与发布者信息 */}
              <div className="post-info">
                <h3>大家有遇到相同的编程问题吗？</h3>
                <p>
                  发布者: <Link to="/profile/username">学生A</Link> · 1小时前
                </p>
              </div>
              {/* 置顶按钮 */}
              <button className="stick-button">
                <FaComment />
              </button>
            </div>
            {/* 帖子评论区 */}
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}
