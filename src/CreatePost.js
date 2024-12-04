import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // 画笔图标
import { useNavigate } from "react-router-dom"; // 用于页面跳转

export default function Home() {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate(); // 用于页面跳转

  // 打开发布对话框
  const handleClickOpen = () => {
    navigate("/create-post"); // 跳转到发帖页面
  };

  // 关闭发布对话框
  const handleClose = () => {
    setOpen(false);
  };

  // 处理输入框内容
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  // 提交发布内容
  const handlePostSubmit = () => {
    console.log("发布的内容:", postContent);
    setPostContent(""); // 清空输入框内容
    setOpen(false); // 关闭弹窗
    navigate("/"); // 如果你希望跳转到主页（如果有需要）
  };

  return (
    <div>
      {/* 主页内容 */}
      <h1>欢迎来到首页</h1>

      {/* 发布新帖子对话框 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>发布新帖子</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="请输入帖子内容"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={postContent}
            onChange={handlePostChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handlePostSubmit} color="primary">
            发布
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
