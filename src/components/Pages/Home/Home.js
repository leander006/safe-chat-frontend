import React from 'react'
import Chats from '../../chats/Chats';
import Footer from '../../footer/Footer';
import Navbar from '../../Navbar /Navbar';
import "./home.css";
function Home() {
  return (
    <div className='home'>
        <Navbar/>
        <Chats/>
        <Footer/>
    </div>


  )
}

export default Home