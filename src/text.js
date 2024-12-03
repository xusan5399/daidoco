import React from "react";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // 导入画笔图标
import { useNavigate } from "react-router-dom";

export default function FloatingActionButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-post"); // 跳转到发帖页面
  };

  return (
    <Fab
      color="primary"
      aria-label="edit" // 将aria-label改为"edit"
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
      onClick={handleClick}
    >
      <EditIcon /> {/* 使用画笔图标 */}
    </Fab>
  );
}
