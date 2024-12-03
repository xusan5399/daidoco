import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    // 处理发布逻辑（例如保存到服务器或本地存储）
    console.log("发布的内容:", postContent);

    // 重置内容并跳转到首页
    setPostContent("");
    // 可以在这里添加跳转到首页的逻辑
    // window.location.href = "/";
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <h2>发布新帖子</h2>
      <TextField
        label="请输入帖子内容"
        multiline
        rows={4}
        fullWidth
        value={postContent}
        onChange={handlePostChange}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePostSubmit}
        sx={{ marginRight: 2 }}
      >
        发布
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => window.history.back()}
      >
        取消
      </Button>
    </Box>
  );
}
