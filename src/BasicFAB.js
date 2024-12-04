import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";  // 导入 useNavigate

export default function FloatingActionButtons() {
  const navigate = useNavigate();  // 创建 navigate 实例

  const handleClick = () => {
    navigate("/create-post");  // 点击按钮时跳转到 CreatePost 页面
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16, // 距离底部的距离
        right: 16, // 距离右侧的距离
        "& > :not(style)": { m: 1 },
      }}
    >
      <Fab color="secondary" aria-label="edit" onClick={handleClick}>
        <EditIcon />
      </Fab>
    </Box>
  );
}
