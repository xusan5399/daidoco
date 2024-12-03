import React from "react";
import { FaUser, FaComment, FaThumbtack } from "react-icons/fa";
import { Link } from "react-router-dom"; // 用于跳转
import "./styles.css"; // 引入样式

const Post = ({ id, title, user, time, commentsCount, onStick }) => {
  return (
    <div className="section-item">
      <div className="post-header">
        {/* 用户头像 */}
        <div className="avatar">
          <FaUser />
        </div>
        <h3>
          {/* 帖子标题，点击跳转到帖子详情页 */}
          <Link to={`/post/${id}`}>{title}</Link>
        </h3>
        <p>
          {/* 发布者名字，点击跳转到用户的个人资料页 */}
          发布者: <Link to={`/profile/${user}`}>{user}</Link> · {time}
        </p>
      </div>
    </div>
  );
};

export default Post;
