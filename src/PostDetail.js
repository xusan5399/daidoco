import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { auth, db } from "./firebase"; // 正确导入 Firebase 服务
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getDoc, getDocs, addDoc } from "firebase/firestore"; // Firestore 方法

const PostDetail = () => {
  const { postId } = useParams(); // 获取 URL 中的帖子 ID

  // 状态变量
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null); // 当前用户

  // 初始化 Firebase Google 登录提供商
  const provider = new GoogleAuthProvider();

  // 获取帖子数据
  const fetchPostData = async () => {
    try {
      const docRef = doc(db, "posts", postId); // 假设帖子保存在 "posts" 集合下
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };

  // 获取评论数据
  const fetchComments = async () => {
    try {
      // 假设评论存储在 "comments" 子集合中
      const commentsRef = collection(db, "posts", postId, "comments");
      const querySnapshot = await getDocs(commentsRef);
      const commentsList = querySnapshot.docs.map((doc) => doc.data());
      setComments(commentsList);
    } catch (error) {
      console.error("Error getting comments: ", error);
    }
  };

  // 处理评论输入框变化
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // 提交评论
  const handleCommentSubmit = async () => {
    if (newComment.trim() && user) {
      try {
        const newCommentData = {
          user: user.displayName,
          text: newComment,
          timestamp: new Date(),
        };

        // 将评论添加到 Firestore
        await addDoc(
          collection(db, "posts", postId, "comments"),
          newCommentData
        );
        setNewComment(""); // 清空输入框
        fetchComments(); // 刷新评论
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    } else {
      alert("请登录后发表评论！");
    }
  };

  // Google 登录
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user); // 保存登录的用户信息
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  };

  // 监听用户登录状态
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // 获取帖子和评论数据
    fetchPostData();
    fetchComments();

    // 清理监听
    return () => unsubscribe();
  }, [postId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
    >
      {/* 左侧帖子内容 */}
      <Box sx={{ flex: 0.7, marginRight: "20px" }}>
        {post ? (
          <Paper sx={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <FaUser style={{ marginRight: "10px" }} />
              <Typography variant="body1">
                {post.author} · {post.timeAgo}
              </Typography>
            </div>
            <Typography variant="body1" paragraph>
              {post.content}
            </Typography>
          </Paper>
        ) : (
          <Typography variant="h6">加载中...</Typography>
        )}

        {/* 评论区 */}
        <Box sx={{ marginTop: "40px" }}>
          <Typography variant="h5" gutterBottom>
            评论区
          </Typography>
          {comments.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              暂无评论，快来第一个评论吧！
            </Typography>
          ) : (
            comments.map((comment, index) => (
              <Paper key={index} sx={{ padding: "10px", marginBottom: "10px" }}>
                <Typography variant="body2" style={{ fontWeight: "bold" }}>
                  {comment.user}:
                </Typography>
                <Typography variant="body2">{comment.text}</Typography>
              </Paper>
            ))
          )}

          {/* 添加评论 */}
          <div style={{ marginTop: "20px" }}>
            <TextField
              fullWidth
              label="发表评论"
              multiline
              rows={4}
              value={newComment}
              onChange={handleCommentChange}
              variant="outlined"
            />
            <Button
              onClick={handleCommentSubmit}
              variant="contained"
              color="primary"
              sx={{ marginTop: "10px" }}
            >
              发布评论
            </Button>
          </div>
        </Box>
      </Box>

      {/* 右侧模块 */}
      <Box sx={{ flex: 0.3, padding: "20px", position: "sticky", top: "20px" }}>
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h6" gutterBottom>
            发布者信息
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <FaUser style={{ marginRight: "10px" }} />
            <Typography variant="body1">{post?.author}</Typography>
          </div>
          <Typography variant="body2" color="textSecondary">
            帖子发布时间：{post?.timeAgo}
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default PostDetail;
