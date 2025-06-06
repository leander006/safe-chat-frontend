import { useCallback } from "react";
import { IoVideocam } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { useConnectionStatus, useSocket } from "../context/socketProvider";
import { GetUser } from "../context/UserProvider";
import { useNavigate } from "react-router";
import type { User } from "../utils/types";


function UserInfo({ user }: { user: User }) {
    const userDetails :User|any = GetUser();   
    const socket = useSocket();
    const { setTo} = useConnectionStatus();
    const navigate = useNavigate();

    const handleAudioCall = useCallback(() => {
        const newRoomId = Math.random().toString(36).substring(2, 15);
        socket.emit("audio-call", {from:userDetails, to: user, roomId: newRoomId });
        setTo(user);
        navigate(`/outgoingCall/${newRoomId}`);
    }, []);

    const handleVideoCall = useCallback(() => {
        const newRoomId = Math.random().toString(36).substring(2, 15);
        socket.emit("video-call",{from:userDetails, to: user, roomId: newRoomId });        
        setTo(user);
        navigate(`/outgoingCall/${newRoomId}`);
        console.log("Video call initiated with user:", user.username);
    }, []);
    return (
        <div className="flex items-center justify-between w-full bg-[#8DD8FF] rounded-lg">
            <div className="flex items-center space-x-2 mx-1 p-2">
                <img className="rounded-full border bg-white w-9 h-9" src={user.profile} alt={user.username} />
                <h1 className="text-[#4E71FF]">{user.username}</h1>
            </div>
            <div className="flex items-center space-x-1 md:space-x-4 text-[#4E71FF] mr-2">
                <div onClick={handleVideoCall} className="cursor-pointer">
                    <IoVideocam fontSize={"32"} />
                </div>
                <div onClick={handleAudioCall} className="cursor-pointer">
                    <IoCall fontSize={"25"} />
                </div>
            </div>
        </div>
    )

    
}

export default UserInfo;