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

  // 假设帖子数据
  const posts = [
    {
      id: 1,
      title: "大家有遇到相同的编程问题吗？",
      author: "学生A",
      timeAgo: "1小时前",
      avatarUrl: "path/to/avatar1.jpg",
    },
    {
      id: 2,
      title: "如何高效学习 React？",
      author: "学生B",
      timeAgo: "2小时前",
      avatarUrl: "path/to/avatar2.jpg",
    },
    // 更多帖子
  ];

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
          {posts.map((post) => (
            <div key={post.id} className="section-item">
              <div className="post-header">
                {/* 用户头像 */}
                <div className="avatar">
                  <FaUser />
                </div>
                {/* 帖子标题和用户信息 */}
                <div className="post-info">
                  <h3>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>
                    发布者:{" "}
                    <Link to={`/profile/${post.author}`}>{post.author}</Link> ·{" "}
                    {post.timeAgo}
                  </p>
                </div>
                {/* 置顶按钮 */}
                <button className="stick-button">
                  <FaComment />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
