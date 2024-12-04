import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaComment,
  FaTasks,
  FaRegFileAlt,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";
import { db } from "./firebase"; // 导入 Firebase 配置
import { collection, getDocs, doc, getDoc } from "firebase/firestore"; // Firebase Firestore 相关函数
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

export default function Home() {
  const [posts, setPosts] = useState([]); // 存储帖子数据
  const [avatars, setAvatars] = useState({}); // 存储用户头像数据
  const [error, setError] = useState(null); // 存储错误信息
  const [loading, setLoading] = useState(true); // 加载状态

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 将帖子按时间逆序排列，最新的帖子显示在最上面
        postsData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

        setPosts(postsData);

        // 获取用户头像
        const avatarPromises = postsData.map(async (post) => {
          const userRef = doc(db, "users", post.authorId); // 获取用户的 doc 引用
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            return { [post.authorId]: userDoc.data().avatarUrl }; // 获取头像 URL
          }
          return null;
        });

        // 批量获取所有用户头像
        const avatarsData = await Promise.all(avatarPromises);
        const avatarMap = avatarsData.reduce((acc, avatar) => {
          if (avatar) {
            acc = { ...acc, ...avatar };
          }
          return acc;
        }, {});
        setAvatars(avatarMap);
      } catch (error) {
        setError("获取帖子数据失败");
        console.error("获取帖子数据失败:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // 组件加载时调用

  return (
    <div className="container">
      {/* 左侧菜单栏 */}
      <div className="sidebar">
        {/* 主要功能菜单 */}
        <div className="sidebar-section">
          <SidebarItem to="/home" icon={FaComment} label="讨论区" />
          <SidebarItem to="/topics" icon={FaLightbulb} label="最新话题" />
          <SidebarItem to="/tasks" icon={FaTasks} label="任务管理" />
          <SidebarItem to="/profile" icon={FaUser} label="个人资料" />
          <SidebarItem to="/files" icon={FaRegFileAlt} label="资料上传" />
          <SidebarItem to="/users" icon={FaUsers} label="用户管理" />
        </div>

        {/* 次要功能菜单（通知、消息、日历等） */}
        <div className="sidebar-section">
          <SidebarItem to="/notifications" icon={FaComment} label="通知" />
          <SidebarItem to="/messages" icon={FaLightbulb} label="消息" />
          <SidebarItem to="/calendar" icon={FaTasks} label="日历" />
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="content">
        {/* 加载中 */}
        {loading && <p>加载中...</p>}

        {/* 显示错误信息 */}
        {error && <p>{error}</p>}

        {/* 显示帖子 */}
        <div className="section">
          {posts.length === 0 ? (
            <p>暂时没有帖子，稍后再试。</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="section-item">
                <div className="post-header">
                  {/* 用户头像 */}
                  <div className="avatar">
                    {avatars[post.authorId] ? (
                      <img
                        src={avatars[post.authorId]}
                        alt={post.authorId}
                        className="avatar-image"
                      />
                    ) : (
                      <FaUser /> // 如果没有头像，则显示默认的用户图标
                    )}
                  </div>
                  {/* 帖子标题和用户信息 */}
                  <div className="post-info">
                    <h3>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p>
                      发布者:{" "}
                      <Link to={`/profile/${post.authorId}`}>
                        {post.author}
                      </Link>{" "}
                      ·{" "}
                      {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 新增板块：最新话题 */}
        <div className="section">
          <h2>最新话题</h2>
          {/* 可在这里添加展示最新话题的组件或数据 */}
          <div className="section-item">
            <p>这里展示最新的话题内容...</p>
          </div>
        </div>

        {/* 新增板块：热门话题 */}
        <div className="section">
          <h2>热门话题</h2>
          {/* 可在这里添加展示热门话题的组件或数据 */}
          <div className="section-item">
            <p>这里展示最受欢迎的话题内容...</p>
          </div>
        </div>

        {/* 新增板块：任务管理 */}
        <div className="section">
          <h2>任务管理</h2>
          {/* 可在这里添加展示任务管理的组件或数据 */}
          <div className="section-item">
            <p>这里展示任务管理内容...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
