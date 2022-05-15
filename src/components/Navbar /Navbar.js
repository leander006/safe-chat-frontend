
import React, { useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Context } from '../../context/ContextProvider'

import './navbar.css'

function Navbar() {
    const [display, setDisplay] = useState(true)
    const {user,setUser} = useContext(Context);
    const [close, setClose] = useState(true)
    const navigate = useNavigate()
    const closed = () =>{
        setClose(!close);
    }
    const navOpen = () =>{
        setDisplay(!display)
    } 
    const logout = async(e)=>{
        e.preventDefault();
        localStorage.removeItem("userInfo");
        setUser(null);  
    }


  return (
      <>

    {display ?<div className='navbar-active' >
       <div onClick={closed}>{close?<i className="fa-solid open fa-2xl fa-bars" onClick={navOpen}></i>:<i className="fa-solid close fa-2xl fa-xmark" onClick={navOpen} ></i>}</div> 
        <div className='left'>
            <ul>
                <Link className='li' to='/' >Home</Link>
                <Link className='li'  to='/about'  >About</Link>
                <Link className='li'  to='/chat'  >Chats</Link>
            </ul>
        </div>
 <div className='right'>
       { user && <button className='right-btn1' onClick={logout} ><i className="fa-solid  fa-arrow-right-from-bracket">Logout</i></button>}
 

        </div>
    </div>:


    <div className='navbar'>
               <div onClick={closed}>{close?<i className="fa-solid open fa-2xl fa-bars" onClick={navOpen}></i>:<i className="fa-solid close fa-2xl fa-xmark" onClick={navOpen} ></i>}</div> 
        <div className='left1'>
            <ul>
                <Link className='li' to='/' >Home</Link>
                <Link className='li'  to='/about'  >About</Link>
                <Link className='li'  to='/chat'  >Chats</Link>
            </ul>
        </div>
        <div className='right'>
        { user && <span className='right-btn2' onClick={logout} ><i className="fa-solid fa-arrow-right-from-bracket">Logout</i></span>}
        </div>
    </div>

}
    </>
  )
}

export default Navbar