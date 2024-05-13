import React, { useState, useEffect } from 'react';
import "./login.scss";
import Card from "./Card";
import useAuth from '../../components/auth/useAuth';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z\.]+$/;
const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const { setAuth } = useAuth();
  const location= useLocation();
  const from=location.state?.from?.pathname || "/login"


  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const errors = {
    general: "Wrong Email or Password",
    username: "Invalid Email",
    password: "Invalid Password",
    noUsername: "Please enter your Email",
    noPassword: "Please enter your Password",
    usernameRegex: "Invalid Email form please use a valid form"
  };

  useEffect(() => {
    if (isLogged) {
      setIsLoggedIn(true); 
      navigate('/'); 
    }
  }, [isLogged, setIsLoggedIn, navigate]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://catium.azurewebsites.net/api/Account/portal-login', { email, password });
      console.log(response); // Log the response data to the console
      setIsLogged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email) {
      setErrorMessages({ name: 'noUsername', message: errors.noUsername });
      return;
    }
    if (!password) {
      setErrorMessages({ name: 'noPassword', message: errors.noPassword });
      return;
    }
  
    if (!USER_REGEX.test(email)) {
      setErrorMessages({ name: 'username', message: errors.usernameRegex });
    } else {
      try {
        const response = await axios.post('https://catium.azurewebsites.net/api/Account/portal-login', { email, password });
        console.log(response.data);
        console.log(response.data.data.firtName)
        const roles = response.data.data.roles;
        const token = response.data.data.jwToken;
        const fname = response.data.data.firstName;
        const lname = response.data.data.lastName;
        localStorage.setItem("fname",fname);
        localStorage.setItem("lname",lname);
        localStorage.setItem('jwToken', token);
        navigate(from,{replace:true});
        setAuth({email,password,roles,token});
        navigate("/home")
      } catch (error) {
        setErrorMessages({ name: 'password', message: errors.password });
      }
    }
  };

const renderErrorMessages = (name) => name === errorMessages.name && (<p className="error_message">{errorMessages.message}</p>)



return <div className='fullbody'><Card>
<div className='logo_container'>
<img src={require('./catium.png')} alt="Logo"/>
</div>
<h1 className="title">Catium Admin Portal</h1>
<p className='subtitle'>Please login with your Email and Password</p>
<form onSubmit={handleSubmit}>
    <div className='inputs_container'>
        <input type="text" placeholder='Email' value={email} 
        onChange={(input) => setEmail(input.target.value)}/>
        {renderErrorMessages("username")}
        {renderErrorMessages("noUsername")}
        <input type="password" placeholder='Password' value={password}
         onChange={(input) => setPassword(input.target.value)}/>
        {renderErrorMessages("password")}
        {renderErrorMessages("noPassword")}
    </div>
    <input className='login_button' type="submit" value="Log In"/>
</form>
</Card>
</div>
};

export default LoginForm 