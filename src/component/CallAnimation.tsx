import type { User } from "../utils/types";

const CallAnimation = ({ user1 }:{ user1:User}) => {  

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
            <h1>{user1.username.split(" ")[0]}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallAnimation;
