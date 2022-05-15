import React, { useContext } from 'react'
import { Context } from '../../../context/ContextProvider'
import './main.css'
import Navbar from '../../Navbar /Navbar'
import Footer from '../../footer/Footer'
function Main() {
      const {user} = useContext(Context)
  return (
    <>
          <Navbar/>
          <div className='main'> 
          <h1>Welcome {user?.others?.username}</h1>
          <h2>All lying - you may think a lie is harmless,</h2>
          <h2> but you put them all together and there's a calamity.</h2>
          <p>ensure that your comments are free from racism and are not unhealthy </p>
          </div> 
          <Footer/>
    </>
  )
}

export default Main