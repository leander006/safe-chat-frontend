import React from 'react'

import './footer.css';
function Footer() {
  return (
<>
<footer >
    <ul>
      <li ><a href="https://www.facebook.com/profile.php?id=100076231103237" target='_blank' ><i className="fa-brands facebook fa-2xl  fa-facebook"></i></a></li>
      <li ><a href="https://www.linkedin.com/in/leander-dsilva-84b879229" target='_blank' ><i className="linkedin fa-2xl fab fa-linkedin"></i></a></li>
      <li ><a href="https://twitter.com/leanderdsilva06"  target='_blank' ><i className=" fa-2xl twitter fab fa-twitter"></i></a></li>
    </ul>
    {/* <p>Made by leander <i className="fa-solid a-2x fa-heart" style={{color:"red"}}></i></p> */}
  </footer>
  </>
  )
}

export default Footer