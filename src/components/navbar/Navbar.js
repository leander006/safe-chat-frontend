import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./navbar.css";

import {Context} from '../../context/ContextProvider';

function Navbar() {

    const[display,setDisplay]=useState(false);
    const navigate = useNavigate();

   const handleClick =(e)=>{
    e.preventDefault();
       setDisplay(true);
   }
   
   const handleLogout =()=>{
    
    localStorage.removeItem("userInfo");
    navigate("/login");
}
   const handleClose =(e)=>{
    e.preventDefault();
    setDisplay(false);
}
const {user} = useContext( Context);

  return (
 
         
    <nav className={display?"navbar":""}>
    {display?<i className="fa-solid  fa-xl fa-xmark"  id="closeicon" onClick={handleClose} ></i>: <i className="fa-solid fa-xl fa-bars " id={!display?"icon":""} onClick={handleClick}></i> }
        <div className='itemLeft' id="left">
       
            <h1>Confession Room</h1>
        </div>
        <div className='itemCenter' id="center">
            <div className='item' id={display?"it":""}>
            <Link to="/">HOME</Link>
            </div>
       
            <div className='item'  id={display?"it":""}>
            <Link to="/about">ABOUT</Link>
            </div>
            {user && <div className='itemR' id={display?"it":""} onClick={handleLogout}>LOGOUT</div>}
          
        
        </div>  
    <div className='itemRight'>
           {user && <div>
            <img className='image' src={user?.others?.profilePic} ></img>

            <span className='text' id={display?"txt":""}>{user?.others?.username}</span>
            </div>}
        </div>

    </nav>
   
  )
}

export default Navbar