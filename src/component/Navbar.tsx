import { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from "../context/UserProvider";
import { useSocket} from "../context/socketProvider";
import axios from "axios";
import { BASE_URL } from "../utils/service";
import Cookies from "js-cookie";
const NavBar = () => {
  const links = [
    { id: 1, name:"room",links: "/room" },
    { id: 2, name:"profile",links: "/profile" },
    { id: 3, name:"call",links: "/call" },
  ];

  const [nav, setNav] = useState(false);
  const userContext = useContext(UserContext)
  const user = userContext?.user
  const navigate = useNavigate();
  const socket = useSocket();

  const logout = useCallback(async(e:any) => {
      e.preventDefault();
    try {
        await axios.get(`${BASE_URL}/api/auth/user/logout`, {
            withCredentials: true,
        });
    } catch (error) {
        console.error("Logout failed:", error);
    }
      socket.emit("logout",user)
      userContext?.setUser(null);
      navigate("/");
    }, []);

  return (
    <div className="flex justify-between items-center bg-[#5409DA] w-full shadow-xl z-50 fixed h-12">
      <div>
        <Link to={"/"} className="ml-2 text-[#8DD8FF] text-4xl font-Blaka">Holla</Link>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ links, id,name }) => (
          <li
            key={id}
            className="text-[#8DD8FF] mx-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300"
          >
            <Link to={links}>
              {name}
            </Link>
          </li>
        ))}
       {user && 
       <li onClick={logout} className="text-[#8DD8FF] mx-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300">
            <h1>logout</h1>
        </li>}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="flex text-white md:hidden mr-2"
      >
        {!nav && (
            <FaBars className=" cursor-pointer" fontSize={"20"} />
        )}
      </div>
      {nav && (
        <div className="left-0 top-0 fixed z-50 w-full h-screen bg-black/70 ">
          <ul className="flex flex-col p-2 top-0 left-0 w-[75%] sm:w-[60%] md:w-[45%] bg-[#5409DA] h-screen text-white">
            <div className=" mt-4 w-full items-center">
              <div className="flex justify-between">
                <h1 className="text-[#8DD8FF] text-4xl font-Blaka">
                  Holla
                </h1>
                <div
                  onClick={() => setNav(!nav)}
                  className="flex cursor-pointer text-[#8DD8FF] justify-center md:hidden"
                >
                  {nav && (
                    <RxCross2 fontSize={"25"} />
                  )}
                </div>
              </div>
              <div className="text-white text-xl border-b my-2 border-gray-400">
                <p>Chat with no hesitation</p>
              </div>
            </div>
            <div className="flex flex-col mt-16 items-center">
              {links.map(({ links, id,name }) => (
                <li
                  key={id}
                  className="text-[#8DD8FF] py-6 mx-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300"
                >
                  <Link
                    onClick={() => setNav(!nav)}
                    to={links}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            {user && 
                <li onClick={logout} className="text-[#8DD8FF] mx-4  py-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300">
                    <h1>logout</h1>
                </li>}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;