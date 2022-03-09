import React from 'react'
import Chats from '../../chats/Chats';
import Navbar from '../../navbar/Navbar';
import "./home.css";
function Home() {
  return (
    <div className='home'>
        <Navbar/>
        <Chats/>
    </div>


  )
}

export default Home