import {format} from "timeago.js"

import './message.css';



function Message({message,own}) {  
  return (
    <div className={own?"message own":"message"}>
        <div className='messageTop' >
          
            {/* <img className='messageImg' src={message?.sender?.profilePic}/>  */}

        <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageButton'>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message