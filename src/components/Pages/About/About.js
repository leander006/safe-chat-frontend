import React from 'react'

import Navbar from '../../navbar/Navbar'
import "./about.css"
function About() {
  return (
    <div className='about'>
        <Navbar/>
        <div className='head'>
        <img className='img' src='/profile.jpeg' alt='leander'></img>
        </div>
    <div className='main'>
      <p>Hi! i am Leander D'silva. I am a MERN stack developer. </p>
    
    </div>
    <div className='contact'>
      <p>Follow me on Linkedin and do check my Github </p>
    </div>
<div className='socials'>
<i className="fa-brands fa-2xl fa-linkedin socialLinkedin" ></i>
<i className="fa-brands fa-2xl  fa-github socialGithub"></i>
</div>
    </div>
  )
}

export default About