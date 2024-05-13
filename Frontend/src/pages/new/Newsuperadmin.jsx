import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Newsuperadmin = ({ inputs, title }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the API endpoint
      const response = await axios.post('https://catium.azurewebsites.net/api/Account/create-super-admin', formData);
      console.log('Response:', response.data);

      // Optionally, you can reset the form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: ""
      });
      setErrorMessage(""); // Clear any previous error message
      navigate("/superadmins");
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.Message) {
        setErrorMessage(error.response.data.Message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
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
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formData[input.id]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <button type="submit">Send</button>
              {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputs = [
  {
    id: "firstName",
    label: "Admin Name",
    type: "text",
    placeholder: "Admin Name",
  },
  {
    id: "lastName",
    label: "Admin Last Name",
    type: "text",
    placeholder: "Admin Last Name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
  },
  {
    id: "userName",
    label: "Username",
    type: "text",
    placeholder: "Username",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm Password",
  },
];

export default () => <Newsuperadmin inputs={inputs} title="Add New SuperAdmin" />;