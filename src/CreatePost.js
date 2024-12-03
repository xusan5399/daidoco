import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // 画笔图标
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate(); // 用于页面跳转

  // 打开弹窗
  const handleClickOpen = () => {
    setOpen(true);
  };

  // 关闭弹窗
  const handleClose = () => {
    setOpen(false);
  };

  // 处理输入框内容
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  // 发布内容
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

      {/* 画笔按钮，点击弹出发布对话框 */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 20, // 右下角位置
          right: 20, // 右下角位置
          zIndex: 1000, // 确保按钮在其他元素之上
        }}
        onClick={handleClickOpen} // 点击弹出对话框
      >
        <EditIcon />
      </Fab>

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
