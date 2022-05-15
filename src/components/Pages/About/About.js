import React from 'react'
import Footer from '../../footer/Footer'
import Navbar from '../../Navbar /Navbar'
import './about.css'
function About() {
  return (
    <>
    <Navbar/>
    <div className='about'>
      <div className='about-upper'>
          <img src='profile.jpg'></img>
      </div>
      <div className='about-lower'>
      <h1>Hi i am LEANDER D'SILVA</h1>
      <p>I am MERN stack developer.</p>
      <p>I like to enchane my knowlegde and improve my skillset </p>
      </div>
      <div className='socials'>
        <p> This is my github account do check it</p>
     <a href='https://github.com/leander006' target="_blank"><i class="fa-brands fa-2xl fa-github"></i></a>
     </div>
    </div>

    <Footer/>
    </>
  )
}

export default About