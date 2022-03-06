import React, { useState } from 'react';
import './register.css';
const axios = require('axios')
function Register() {

  const [username, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pic, setPic] = useState("")

  const postDetails = async(pic)=>{
    if(pic===undefined)
    {
      console.log("error");
      //toast-----------------
    }
    if(pic.type==='image/jpeg' || pic.type==='image/jpg')
    {
      
    }
  }

  const handlSubmit = async(e) =>{

    e.preventDefault();

    try {
      const res= await axios.post('http://localhost:4000/api/auth/register',{
        username:username,
        email:email,
        password:password,

      });

      //toast
      setName("");
      setPassword("");
      setEmail("");

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='register'>
    <form className='form' onSubmit={handlSubmit}>
  <div className="mb-3">
    <label className="form-label" >Username</label>
    <input type="name" className="form-control" value={username} onChange={(e)=>setName(e.target.value)} placeholder='Enter a username' />
  </div>
  <div className="mb-3">
    <label className="form-label">Email</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter a email'/>
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter a valid password' />
  </div>
  <div className="mb-3">
    <label className="form-label">Profile Pic</label>
    <input type="file" className="form-control" accept='images'  onChange={(e)=>postDetails(e.target.files[0])} />
  </div>
  <button  type='submit' className="button">Submit</button>
</form>
</div>
  )
}

export default Register