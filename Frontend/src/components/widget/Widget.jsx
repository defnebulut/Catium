import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://catium.azurewebsites.net/api/v1/User?PageSize=50");
        const userData = response.data.data;
        setUserCount(userData.length);
        console.log("User data:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchOrderData = async () => {
      try {
        const response = await axios.get("https://catium.azurewebsites.net/api/v1/Article?PageSize=50");
        const orderData = response.data.data;
        setOrderCount(orderData.length);
        console.log("Order data:", orderData);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    if (type === "user") {
      fetchUserData();
    } else if (type === "order") {
      fetchOrderData();
    }
  }, [type]);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ARTICLES",
        isMoney: false,
        icon: (
          <NewspaperIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  const count = type === "user" ? userCount : orderCount;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{count}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;