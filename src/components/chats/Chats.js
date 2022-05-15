
import React, { useContext, useEffect, useRef, useState } from 'react'
import Footer from '../footer/Footer';

import Message from '../Message/Message';
import Navbar from '../Navbar /Navbar';
import './chat.css';
const {io} = require('socket.io-client')
const axios = require('axios');
const {Context} = require("../../context/ContextProvider")
function Chats() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null)

    const scrollRef = useRef();

    const socket = useRef()

    const {user} = useContext(Context)
    const config ={
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
        }
      }
    
useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data =>{
        setArrivalMessage({
            sender:data.senderId,
            text: data.text,
            createdAt:Date.now()
          
          }); 
    })
},[])

useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);

}, [arrivalMessage])



    useEffect(() => {
        socket.current.emit("addUser",user.others?._id);
        socket.current.on('getUser', users =>{})
},[user.others?._id])
    
    


//-----to get Message from DB-----//
    useEffect(() => {
        const getMessages = async() =>{
      
            try {
                
                const res= await axios.get("http://localhost:4000/api/message",config);
             
              setMessages(res.data);
                
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
     
    },[user,newMessage])
   
    //-------to create message from frontend--------//
 
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(newMessage===" ")
        {
            return;
        }
        
        try 
           {
            const res= await axios.post("http://localhost:4000/api/message",{
                text:newMessage,
           },config);
     
            socket.current.emit("sendMessage",{
                sender:user.others?._id,
                text:newMessage,
            });
            console.log(messages);
            // setMessages([...messages, res.data])
            setNewMessage(""); 
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    },[messages])
  return (
<>

    <div className="center">
    <div className='content'>
    <div className='chatTop' >

        { messages?.map((m) => (
           <div ref={scrollRef}>
            <Message message={m} key={m._id} own={m?.sender === user.others?._id}/>
           </div>
        ))}

    </div>
    
    <div className='chatButtom'>
    <textarea className='input' value={newMessage} onChange={(e) =>setNewMessage(e.target.value)} type="text"></textarea>
    <i onClick={handleSubmit} className="fa-solid fa-2xl fa-paper-plane" id='button'></i>
    </div>
    </div>
    </div>

    </>
  )
}

export default Chats