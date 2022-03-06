import React, { useState } from 'react'
import "./navbar.css";

function Navbar() {

    const[display,setDisplay]=useState(false);

   const handleClick =()=>{
       setDisplay(true);
   }
   const handleClose =()=>{
    setDisplay(false);
}
  return (
   
         
    <nav className={display?"navbar":""}>
    {display?<i className="fa-solid  fa-xl fa-xmark"  id="closeicon" onClick={handleClose} ></i>: <i className="fa-solid fa-xl fa-bars " id={!display?"icon":""} onClick={handleClick}></i> }
        <div className='itemLeft' id="left">
       
            <h1>Fitness Hub</h1>
        </div>
        <div className='itemCenter' id="center">
            <div className='item' id={display?"it":""}>
            <a href="/">HOME</a>
            </div>
            <div className='item' id={display?"it":""} >
            <a href="/">VIDEO</a>
            </div>
            <div className='item'  id={display?"it":""}>
            <a href="/">ENROLL</a>
            </div>
            <div className='item'  id={display?"it":""}>
            <a href="/">ABOUT</a>
            </div>
            <div className='item' id={display?"it":""}>
            <a href="/">WRITE</a>
            </div>
        </div>
        {/* https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fA%3D%3D&w=1000&q=80 */}

        {/* https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fA%3D%3D&w=1000&q=80 */}

        <div className='itemRight'>

           
            <img className='image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz86dVC8nNqS7NzLYt9dj9qZi0UBwHIZSRHQ&usqp=CAU' id=""></img>

            <span className='text' id={display?"txt":""}>Username</span>

        </div>

    </nav>
   
  )
}

export default Navbar