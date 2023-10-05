import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const images = [
    {
      id: 1,
      image: "/images/home.png",
    },
    {
      id: 2,
      image: "/images/login.png",
    },
    {
      id: 3,
      image: "/images/register.png",
    },
  ];
  return (
    <div className="flex flex-col items-center h-screen text-white pt-12 space-y-12">
      <div className="flex flex-col items-center space-y-12">
        <h1 className=" md:text-5xl">Connect anywhere, anytime</h1>
        <Link
          className="hover:text-white bg-black/40 p-2 rounded-lg"
          to="/create"
        >
          Create your own meeting
        </Link>
        <img
          className="w-[300px] md:w-[500px] rounded-xl"
          src="images/home.png"
          alt="home"
        />
      </div>
      <div className="flex flex-col space-y-12 w-full bg-white text-[#4229cb] py-12">
        <h1 className="text-center">Check Out All Features</h1>
        <div className="grid md:grid-flow-col md:grid-cols-3 md:space-y-0 space-y-12">
          <div className=" flex flex-col items-center md:space-y-0 space-y-3">
            <i className="fa-solid fa-2xl fa-headphones "></i>
            <h1 className="mt-4">Audio and video calling</h1>
            <p className="text-center mx-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ex
              dicta inventore rerum quos fuga facere totam ducimus consectetur
              nihil.
            </p>
          </div>
          <div className=" flex flex-col items-center md:space-y-0 space-y-3">
            <i className="fa-solid fa-2xl fa-desktop"></i>
            <h1 className="mt-4">Screen sharing</h1>
            <p className="text-center mx-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ex
              dicta inventore rerum quos fuga facere totam ducimus consectetur
              nihil.
            </p>
          </div>
          <div className=" flex flex-col items-center md:space-y-0 space-y-3">
            <i className="fa-solid fa-2xl fa-message"></i>
            <h1 className="mt-4">Start Messaging</h1>
            <p className="text-center mx-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ex
              dicta inventore rerum quos fuga facere totam ducimus consectetur
              nihil.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center md:w-1/2 space-y-12 mx-2">
        <h1 className="flex justify-center">Why Choose Us</h1>
        <p className="text-center pb-12">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam,
          animi? Nisi, esse, fugit laudantium dolores perferendis iste quod
          minus officiis a sit cum repudiandae deleniti quibusdam quia non
          accusamus suscipit.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-12 w-full bg-white text-[#4229cb] py-12">
        <h1>Reviews</h1>
      </div>
    </div>
  );
}

export default Home;
