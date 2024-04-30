import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { GetUser } from "../context/UserProvider";
import toast from "react-hot-toast";
import Messages from "../components/Messages";
import { v4 as uuidv4} from 'uuid';

function Chat() {

      const { socket, messages, setMessages } = useSocket();
      const [room, setRoom] = useState("")
      const { user } = GetUser();
      const [message, setMessage] = useState("");
      const [data, setData] = useState({
            user:0,
            message:"",
            room:""
      })
      const join = useCallback(async ({ roomId }) => {
            setRoom(roomId)
            // console.log("joined ",roomId);
            toast.success("User joined room");
      }, [room]);

      const created = useCallback(async ({ roomId }) => {
            setRoom(roomId)
            // console.log("created ",roomId);
            toast.success("User created room");
      }, [room]);

      const sendMessage = useCallback(
            (e) => {
              e.preventDefault();

              setData(user,message,room)
            //   console.log("datass ",user,message,room);
              setMessages([...messages,{user,message,room,id:uuidv4()}]);
              socket.emit("send-message", {user,message,room});
              setMessage("");
            },
            [message]
          );

  const handleMessage = useCallback(async (data) => {

    console.log("data", data);
    setMessages(data);

  }, []);

      useEffect(() => {
            socket?.emit("join-room",user);
      },[]);

      useEffect(() => {
            socket.on("user-created",created);
            socket.on("user-joined",join);
            socket.on("message-recieved", handleMessage);
        return () => {
            socket.off("user-created",created);
            socket.off("user-joined",join);
            socket.off("message-recieved", handleMessage);
        };
      });
      
  return (
    <div className="flex flex-col md:mx-24 p-2 mt-6 h-[50%]">
      {/* <div className=" flex justify-center mx-auto w-full"> */}
      <h1 className="text-xl flex justify-center">Room id is {room}</h1>
      <form
          onSubmit={sendMessage}
          className="mx-auto w-full  bg-black/60"
        >
          <div className="md:h-[calc(100vh-7.2rem)] h-[calc(100vh-17rem)] overflow-y-scroll">
            {messages?.map((u) => (
              <Messages key={u.id} u={u} />
            ))}
          </div>
          <div className="flex h-fit items-center m-1">
            <input
              type="text"
              className="border w-full p-1 focus:outline-none rounded-sm"
              placeholder="Enter message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-xl ml-1 text-white cursor-pointer fa-paper-plane"></i>
            </button>
          </div>
        </form>
      {/* </div> */}
    </div>
  )
}

export default Chat