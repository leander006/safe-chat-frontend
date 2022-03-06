import React, { useEffect, useRef, useState } from 'react'
import Message from '../Message/Message';
import './chat.css';

const axios = require('axios')
function Chats() {
   
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const [close, setClose] = useState(false);
    const scroll = useRef();

//-----to get Message from DB-----//
    useEffect(() => {
        const getMessages = async() =>{
            try {
                const message = await axios.get("http://localhost:4000/api/message");
                console.log(message.data);
                setMessages(message.data);
            } catch (error) {
                
            }
        };
        getMessages();
        scroll?.current.scrollIntoView({behaviour:"smooth"});
    }, [])

    //-------to create message from frontend--------//
    const handleClose =(e)=>{
        e.preventDefault();
        setClose(true)

    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(newMessage==="")
        {
            return;
        }
        try {
            const message = await axios.post("http://localhost:4000/api/message",{
                sender:"6224e9f26a9468c255a6147f",
                text:newMessage,
            });
            setMessages([...messages,message.data])
            setMessages("");
        } catch (error) {
            console.log(error);
        }
        
    }
  return (
     
    <div className={close?"closemain":"main"}>
        
        <div className='close'>
        <i  onClick={handleClose} class="fa-solid fa-2xl  fa-xmark"></i>
        </div>
    <div className='content'>
    <div className='chatTop' >
        <div ref={scroll}>
        {messages.map(m=>(
            <Message message={m} admin={m.sender.admin}/>
        ))}
      </div>
    </div>
    <div className='chatButtom'>
    <textArea className='input' value={newMessage} onChange={(e) =>setNewMessage(e.target.value)} type="text"></textArea>
    <i onClick={handleSubmit} className="fa-solid fa-2xl fa-paper-plane" id='button'></i>
    </div>
    </div>
    </div>
  )
}

export default Chats