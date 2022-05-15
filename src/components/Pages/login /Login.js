import React, { useContext } from 'react'


import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import Navbar from '../../Navbar /Navbar';
import Footer from '../../footer/Footer';
import { Context } from '../../../context/ContextProvider';

function Login() {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [cpassword,setCPassword]=useState("");
  const {setUser} = useContext(Context)
  // const toast = useToast()

  const handleSubmit = async(e) =>{
    e.preventDefault();
   
    try {
      if(password === cpassword){
        const {data} = await axios.post("http://localhost:4000/api/auth/login",{
        username:username,
        password:password
      })
      setUsername("");
      setPassword("");

      localStorage.setItem("userInfo",JSON.stringify(data));

      setUser(data)
      console.log("login");
      navigate("/")

    }
      //toast---------
    } catch (error) {
      console.log(error);
            //toast---------
    }

   
}


  return (
    <>
    <Navbar/>
<div className="register">
            <div className="col-1">


                <form id='form' className='flex flex-col'onSubmit={handleSubmit} >
                <h2>Login In</h2>
                <span>And enrich your knowledge</span>
                <div className="input-box">
                  <i className="fas fa-2xl fa-user"></i>
                  <input type="text" placeholder="Enter your name" onChange={e=>setUsername(e.target.value)}   required/>
                </div>
                <div className="input-box">
                <i className="fas fa-2xl fa-lock"></i>
                <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} required/>
                </div>

                <div className="input-box">
                <i className="fas fa-2xl fa-lock"></i>
                <input type="password" placeholder="Confirm your password" onChange={e=>setCPassword(e.target.value)} required/>
                </div>
                    <button className='btn'>Login</button>
                    <p className="sign-up-text">Don't have a acocunt?<Link to='/register'><label >Register now</label></Link> </p>
                </form>
    
            </div>
            <div className="col-2">
            <h1 id='h1'>Shiiii... Be chilled</h1>
                 <h1 id='h1'>You are not been watched</h1>
                 <h1 id='h2'>Let's see what </h1>
                  <h1 id='h2'>you got to speak </h1>
            </div>
        </div>
    <Footer/>
    </>
  )
}

export default Login