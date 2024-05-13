import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import Table from "../../components/table/Dynotable"

const Single = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [userpp, setUserpp] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://catium.azurewebsites.net/api/v1/User/${userId}`);
        console.log(response);
        if (response.data.succeeded && response.data.data) {
          setUser(response.data.data);
          setUserpp(response.data.data.pp);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
            {userpp ? (
  <img src={userpp} alt="" className="itemImg" />
) : (
  <img src={require("../login/catium.png")} alt="" className="itemImg" />
)}

              <div className="details">
                <h1 className="itemTitle">{user ? user.userName : ""}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user ? user.userEmail : ""}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">{user ? user.firstName : ""}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Surname:</span>
                  <span className="itemValue">{user ? user.lastName : ""}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Bio:</span>
                  <span className="itemValue">{user ? user.bio : ""}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Latest Interactions</h1>
          <Table/>
        </div>        
      </div>
    </div>
  );
};

export default Single;