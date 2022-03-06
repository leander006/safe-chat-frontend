import React from 'react'
import "./videos.css"
const Video = require("../Video/Video")
function Videos(videos) {
  return (
    <div className='row'>
        {
          videos.map((v) =>(
           <Video video={v}/>
          ))
        }
    </div>
  )
}

export default Videos