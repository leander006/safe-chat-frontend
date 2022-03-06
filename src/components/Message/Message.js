import {format} from "timeago.js"
import { useEffect, useState } from 'react';
import './message.css';
const axios = require('axios');


function Message({message,admin}) {
   

    
  return (
    <div className={admin?"message admin":"message"}>
        <div className='messageTop' >
            <img className='messageImg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQMwq_mZ2I9qpXPhmIeJ5on2jZTavrF65Kw&usqp=CAU"/> 

        <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageButton'>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message