import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./styles.css"; // 导入上面的 CSS

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="./img/logo.png" alt="Logo" /> {/* Logo 图片 */}
        <span>DAI DO EXCH</span>
      </div>

      {/* 在导航栏末尾添加一个菜单按钮 */}
      <Button
        id="basic-button"
        aria-controls={menuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>

        {/* 下面是将原先的链接嵌套到下拉菜单中的部分 */}
        <MenuItem onClick={handleClose}>
          <a href="#">Decarbonisation</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href="#">Human Sustainability</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href="#">Library</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href="#">Annual Summit</a>
        </MenuItem>
      </Menu>
    </div>
  );
}
