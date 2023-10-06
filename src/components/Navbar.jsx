import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const links = [
    { id: 1, links: "/", name: "home" },
    { id: 2, links: "/about", name: "About" },
    { id: 3, links: "/user", name: "User" }
  ];
  const [nav, setNav] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center text-[#4229cb] bg-white w-full shadow-xl z-50 fixed h-12">
      <div>
        <Link to="/" className="ml-2 text-4xl font-Lora ">
        SafeChat
        </Link>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ links, id, name }) => (
          <li
            key={id}
            className="mx-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300"
          >
            <Link to={links} smooth="true" duration={500}>
              {name}
            </Link>
          </li>
        ))}
        <li
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            navigate("/login");
          }}
          className="mx-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300"
        >
          Logout
        </li>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="flex text-black/60 md:hidden"
      >
        {!nav && (
          <i className="cursor-pointer z-20 bg-[#4229cb] fa-2xl mr-4 fa-solid fa-bars"></i>
        )}
      </div>
      {nav && (
        <div className="left-0 top-0 fixed  z-50 w-full h-screen bg-black/70 ">
          <ul className="flex flex-col p-2 top-0 left-0 w-[75%] sm:w-[60%] md:w-[45%] text-[#4229cb] bg-white h-screen">
            <div className=" mt-4 w-full items-center">
              <div className="flex justify-between">
                <Link to="/" className="ml-2 text-4xl font-Blaka">
                  Streamify
                </Link>
                <div
                  onClick={() => setNav(!nav)}
                  className="flex cursor-pointer text-black/60 justify-center md:hidden"
                >
                  {nav && (
                    <i className="z-20 fa-2xl mr-4 fa-solid fa-xmark"></i>
                  )}
                </div>
              </div>
              <div className="text-xl border-b my-2 border-gray-400">
                <p>Let's build something new</p>
              </div>
            </div>
            <div className="flex flex-col mt-16 items-center">
              {links.map(({ links, id, name }) => (
                <li
                  key={id}
                  className="py-9 mx-4 font-medium capitalize cursor-pointer hover:scale-125 duration-300"
                >
                  <Link
                    onClick={() => setNav(!nav)}
                    to={links}
                    smooth="true"
                    duration={500}
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className="py-9 font-medium capitalize cursor-pointer hover:scale-125 duration-300"
              >
                Logout
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;