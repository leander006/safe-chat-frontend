import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSocket } from "../context/SocketProvider";
import { GetUser } from "../context/UserProvider";

function Home() {
  const { socket } = useSocket();
  const { user } = GetUser();
  useEffect(() => {
    socket?.emit("join-socket", { userId: user?._id });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen text-white pt-12 space-y-12">
        <div className="flex flex-col items-center mt-2 space-y-12">
          <img
            className="w-[300px] h-[300px] rounded-sm"
            src="/images/image1.jpg"
            alt="home"
          />
          <h1 className=" md:text-5xl">Nurture trust with a loyal companion</h1>
          <Link
            className="hover:text-white bg-black/40 p-2 rounded-lg"
            to="/user"
          >
            Find your companion
          </Link>
        </div>
        <div className="flex flex-col space-y-12 w-full bg-white text-[#4229cb] py-12">
          <h1 className="text-center">Check Out All Features</h1>
          <div className="grid md:grid-flow-col md:grid-cols-3 md:space-y-0 space-y-12">
            <div className=" flex flex-col items-center md:space-y-0 space-y-3">
              <i className="fa-solid fa-2xl fa-lock"></i>
              <h1 className="mt-4">End-to-End Encryption</h1>
            </div>
            <div className=" flex flex-col items-center md:space-y-0 space-y-3">
              <i className="fa-solid fa-2xl fa-box-archive"></i>
              <h1 className="mt-4">No Data Storage</h1>
            </div>
            <div className=" flex flex-col items-center md:space-y-0 space-y-3">
              <i className="fa-solid fa-2xl fa-message"></i>
              <h1 className="mt-4">Secure Verification Process</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center md:w-1/2 space-y-12 mx-2">
          <h1 className="flex justify-center">Why Choose Us</h1>
          <p className="text-center pb-12">
            Choose us because we prioritize your privacy above all else. With
            robust end-to-end encryption, we ensure that your conversations
            remain secure and private. We never store your messages or videos,
            guaranteeing your data remains yours alone. Plus, our user-friendly
            features empower you with control over your digital interactions,
            offering unmatched peace of mind in an increasingly connected world.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
