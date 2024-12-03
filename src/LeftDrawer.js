import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaFolder,
  FaTasks,
  FaTrophy,
  FaComment,
  FaNewspaper,
  FaEllipsisH,
  FaImages,
  FaCode,
  FaClipboard,
  FaStoreAlt,
  FaChartLine,
  FaLink,
  FaQuestionCircle,
  FaPhoneAlt,
  FaGavel,
} from "react-icons/fa";

const LeftDrawer = ({ isOpen, openDrawer, closeDrawer }) => {
  return (
    <div
      className={`drawer ${isOpen ? "open" : ""}`}
      onMouseEnter={openDrawer} // 鼠标进入时打开抽屉
      onMouseLeave={closeDrawer} // 鼠标离开时关闭抽屉
    >
      <div className="drawer-content">
        <ul className="drawer-items">
          <li>
            <Link to="/home">
              <FaHome />
              <span className="drawer-text">主页</span>
            </Link>
          </li>
          <li>
            <Link to="/exam">
              <FaFolder />
              <span className="drawer-text">题库</span>
            </Link>
          </li>
          <li>
            <Link to="/training">
              <FaTasks />
              <span className="drawer-text">训练题单</span>
            </Link>
          </li>
          <li>
            <Link to="/competition">
              <FaTrophy />
              <span className="drawer-text">比赛</span>
            </Link>
          </li>
          <li>
            <Link to="/discussion">
              <FaComment />
              <span className="drawer-text">讨论区</span>
            </Link>
          </li>
          <li>
            <Link to="/articles">
              <FaNewspaper />
              <span className="drawer-text">文章广场</span>
            </Link>
          </li>
          <li>
            <Link to="/more">
              <FaEllipsisH />
              <span className="drawer-text">更多功能</span>
            </Link>
          </li>
          <li>
            <Link to="/images">
              <FaImages />
              <span className="drawer-text">图片上传</span>
            </Link>
          </li>
          <li>
            <Link to="/online-ide">
              <FaCode />
              <span className="drawer-text">在线 IDE</span>
            </Link>
          </li>
          <li>
            <Link to="/clipboard">
              <FaClipboard />
              <span className="drawer-text">云剪贴板</span>
            </Link>
          </li>
          <li>
            <Link to="/store">
              <FaStoreAlt />
              <span className="drawer-text">主题商店</span>
            </Link>
          </li>
          <li>
            <Link to="/rank">
              <FaChartLine />
              <span className="drawer-text">咕值排名</span>
            </Link>
          </li>
          <li>
            <Link to="/level-rank">
              <FaChartLine />
              <span className="drawer-text">等级分排名</span>
            </Link>
          </li>
          <li>
            <Link to="/links">
              <FaLink />
              <span className="drawer-text">相关链接</span>
            </Link>
          </li>
          <li>
            <Link to="/help">
              <FaQuestionCircle />
              <span className="drawer-text">帮助中心</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <FaPhoneAlt />
              <span className="drawer-text">联系我们</span>
            </Link>
          </li>
          <li>
            <Link to="/rules">
              <FaGavel />
              <span className="drawer-text">社区规则</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftDrawer;
