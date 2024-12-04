import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase"; // 引入 Firebase 配置
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Firestore API

export default function CreatePost() {
  const [postTitle, setPostTitle] = useState(""); // 帖子标题
  const [postContent, setPostContent] = useState(""); // 帖子内容
  const navigate = useNavigate(); // 用于页面跳转

  // 处理帖子标题输入
  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  // 处理帖子内容输入
  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  // 提交发布内容
  const handlePostSubmit = async () => {
    if (!postTitle || !postContent) {
      alert("标题和内容不能为空！");
      return;
    }

    try {
      // 提交数据到 Firestore
      await addDoc(collection(db, "posts"), {
        title: postTitle,
        content: postContent,
        author: "学生A", // 假设发布者为学生A
        timestamp: Timestamp.now(), // 使用当前时间戳
      });
      console.log("帖子已成功发布");

      // 清空输入框内容
      setPostTitle("");
      setPostContent("");

      // 跳转到首页
      navigate("/");
    } catch (e) {
      console.error("发布帖子失败:", e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "#fff",
          marginTop: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          创建新帖子
        </Typography>

        {/* 帖子标题输入框 */}
        <TextField
          label="帖子标题"
          variant="outlined"
          fullWidth
          value={postTitle}
          onChange={handleTitleChange}
          sx={{ marginBottom: 2 }}
        />

        {/* 帖子内容输入框 */}
        <TextField
          label="请输入帖子内容"
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          value={postContent}
          onChange={handleContentChange}
          sx={{ marginBottom: 2 }}
        />
        

        {/* 提交按钮 */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
            sx={{ width: "48%" }}
          >
            取消
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostSubmit}
            sx={{ width: "48%" }}
          >
            发布
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
