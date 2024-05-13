import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
import WarningIcon from '@mui/icons-material/Warning';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CategoryIcon from '@mui/icons-material/Category';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link,useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";




const Sidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);

  const handleLogout = () => {
    localStorage.removeItem("jwToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
  

    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Catium</span>
        </Link> 
      </div>
      <img
                src={require("../../pages/login/catium.png")}
                alt=""
                className="itemImg"
              />
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/">
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admins" style={{ textDecoration: "none" }}>
            <li>
              <EmojiEmotionsIcon className="icon" />
              <span>Admins</span>
            </li>
          </Link>
          <Link to="/superadmins" style={{ textDecoration: "none" }}>
            <li>
              <MilitaryTechIcon className="icon" />
              <span>SuperAdmins</span>
            </li>
          </Link>
          <Link to="/userreports" style={{ textDecoration: "none" }}>
            <li>
              <WarningIcon className="icon" />
              <span>User Reports</span>
            </li>
          </Link>
          <Link to="/articlereports" style={{ textDecoration: "none" }}>
            <li>
              <SdCardAlertIcon className="icon" />
              <span>Article Reports</span>
            </li>
          </Link>
          <Link to="/commentreports" style={{ textDecoration: "none" }}>
            <li>
              <SmsFailedIcon className="icon" />
              <span>Comment Reports</span>
            </li>
          </Link>
          <Link to="/category" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Category</span>
            </li>
          </Link>
          
          <p className="title">USER</p>
          <li onClick={handleLogout} >
            <ExitToAppIcon className="icon" />
            <span >Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
