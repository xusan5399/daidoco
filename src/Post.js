import React from "react";
import { FaUser, FaComment, FaThumbtack } from "react-icons/fa";
import "./styles.css"; // 引入样式

const Post = ({ title, user, time, commentsCount, onStick }) => {
  return (
    <div className="section-item">
      <div className="post-header">
        {/* 用户头像 */}
        <div className="avatar">
          <FaUser />
        </div>
        {/* 帖子标题和用户信息 */}
        <div className="post-info">
          <h3>{title}</h3>
          <p>
            发布者: {user} · {time}
          </p>
        </div>
        {/* 置顶按钮 */}
        <button className="stick-button" onClick={onStick}>
          <FaThumbtack />
        </button>
      </div>
      <div className="post-footer">
        <FaComment />
        <span>{commentsCount} 评论</span>
      </div>
    </div>
  );
};

export default Post;
