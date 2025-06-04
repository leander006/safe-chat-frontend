import type { User } from "../utils/types";

const AudioCallAnimation = ({ user1, user2 }:{ user1:User, user2:User }) => {    
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex items-center justify-center text-[#8DD8FF]">
        <div className="animate-bounce">
          <div className="relative w-32 h-32 rounded-full p-2 flex justify-center items-center flex-col">
            <img
              src={user1.profile}
              alt="User 1"
              className="w-full h-full rounded-full object-cover bg-[#4E71FF]"
            />
            <h1>You</h1>
          </div>
        </div>
        {user2 &&<div className="animate-bounce">
          <div className="relative w-32 h-32 rounded-full p-2 flex justify-center items-center flex-col">
            <img
              src={user2.profile}
              alt="User 2"
              className="w-full h-full rounded-full object-cover bg-[#4E71FF]"
            />
            <h1>{user2.username.split(" ")[0]}</h1>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default AudioCallAnimation;
