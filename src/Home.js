import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaComment, FaLightbulb, FaTasks, FaUser } from "react-icons/fa"; // 引入react-icons中的图标
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
      {/* 右侧内容区域 */}
      <div className="content">
        <h1>大同大学課題交流プラットフォームへようこそ</h1>
        <Auth onLogin={onLogin} />
        <Link to="/create-assignment">发布新课题</Link>

        {/* 添加一个图标和文字描述 */}
        <div className="section">
          <h2>最近讨论</h2>
          <div className="section-item">
            <FaComment /> {/* 图标 */}
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

        <div className="section">
          <h2>最新话题</h2>
          <div className="section-item">
            <FaLightbulb /> {/* 图标 */}
            <h3>NOIP 代码出来了吗</h3>
            <p>OoHappyOo · 32分钟前</p>
          </div>
          <div className="section-item">
            <FaTasks /> {/* 图标 */}
            <h3>P1349 80分求助</h3>
            <p>WZZ_11 · 32分钟前</p>
          </div>
        </div>

        {/* 添加个人中心区域 */}
        <div className="section">
          <h2>个人中心</h2>
          <div className="section-item">
            <FaUser /> {/* 图标 */}
            <h3>查看个人资料</h3>
            <p>修改个人信息，查看发布的课题。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
