import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Newcat = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the inputData object with the required structure
    const inputData = {
      parentId: 0,
      name: document.getElementById('name').value
    };

    try {
      // Send a POST request to the API endpoint
      const response = await axios.post('https://catium.azurewebsites.net/api/v1/Category', inputData);
      console.log('Response:', response.data);
  
      // Optionally, you can reset the form field
      document.getElementById('name').value = '';
      navigate("/category");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Name</label>
                <input id="name" type="text" placeholder="Enter New Category" />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newcat;