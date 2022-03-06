import React, { useState } from 'react'
import "./write.css";

function Write() {
const[file,setFile] =useState("");
const[title,setTitle] =useState("");
const[desc,setDesc] =useState("");

  const handleSubmit = () =>{

  };
  return (
    <div className='write'>
    
    <form className='wform' onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label" >Select Video or Image</label>
    <input type="file" className="form-control" value={file} onChange={e =>setFile(e.target.value)} />
  </div>
  <div className="mb-3">
    <label className="form-label">Topic</label>
    <input type="text" className="form-control" value={title} placeholder='Enter a title' onChange={e=>setTitle(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Description about Exercise</label>
    <textarea type="text" style= {{height: "100px" }} value={desc} className="form-control"  onChange={e=>setDesc(e.target.value)}/>
  </div>

  <button type="submit" className="wbutton">Upload</button>
</form>
</div>
  )
}

export default Write