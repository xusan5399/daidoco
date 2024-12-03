// PostDetail.js
import React from "react";
import { useParams } from "react-router-dom"; // 用来获取 URL 参数
import { FaUser } from "react-icons/fa";

const PostDetail = () => {
  // 获取 URL 中的帖子 ID
  const { postId } = useParams();

  // 这里假设你通过某种方式获取到具体的帖子内容
  // 假设我们只是展示帖子的 ID 和一些假数据
  const post = {
    id: postId,
    title: "帖子标题",
    content: "这是帖子的详细内容，讨论了一些技术问题...",
    author: "学生A",
    timeAgo: "1小时前",
  };

  return (
    <div className="post-detail">
      <div className="post-header">
        {/* 用户头像 */}
        <div className="avatar">
          <FaUser />
        </div>
        {/* 帖子标题和用户信息 */}
        <h2>{post.title}</h2>
        <p>
          发布者: {post.author} · {post.timeAgo}
        </p>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;
