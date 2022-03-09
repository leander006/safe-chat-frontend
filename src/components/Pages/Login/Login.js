

import React, {  useState } from 'react'
import './login.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
const axios = require('axios')

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
      e.preventDefault();
     
      try {
        const {data} = await axios.post("http://localhost:4000/api/auth/login",{
          username:username,
          password:password
        })

       
        setUsername("");
        setPassword("");

        localStorage.setItem("userInfo",JSON.stringify(data));
        navigate("/")


        //toast---------
      } catch (error) {
        console.log(error);
              //toast---------
      }
  
     
  }
  return (
    <>
      <Navbar/>

    <div className='login'>
    
    <form className='loginform' onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label" >Username</label>
    <input type="name" className="form-control" placeholder='Enter a username' onChange={(e) =>setUsername(e.target.value)} />
  </div>

  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" onChange={(e) =>setPassword(e.target.value)}  className="form-control" placeholder='Enter a valid password' />
  </div>

  <button type="submit" className="loginbutton">Submit</button>
</form>
</div>
</>
  )
}

export default Login