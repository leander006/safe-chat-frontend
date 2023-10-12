import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/service";
import { GetUser } from "../context/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser,setConfig } = GetUser();
  const navigate =useNavigate()
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const data = JSON.parse(params.get("data"));

  const getUser = useCallback(
    () => {
      if (token && data) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(JSON.stringify(data))
      }
      
    },
    [data],
  )
  

  useEffect(() => {
    getUser();
  }, [data]);

  const handleSubmit= useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
          username: username,
          password: password,
        });
        localStorage.setItem("user", JSON.stringify(data.others));
        localStorage.setItem("token", data.token);
        setUser(data.others);
        setConfig({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        });
        navigate("/")
        toast.success("Login successfully")
      } catch (error) {
        toast.error(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Something went wrong"
        );
        console.log(error?.response?.data?.message);
      }
    },
    [username, password,setUser]
  );

  const google = async (e) => {
    e.preventDefault();
    window.open(`${BASE_URL}/api/auth/google`, "_self");
  };

  return (
    <div className="flex justify-center w-screen items-center h-screen">
      <div className="flex w-full justify-evenly ">  
      <div className="hidden md:flex justify-center items-center md:w-[60%] lg:w-1/2">
            <img className="h-[400px] flex justify-center " src="/images/login.png" alt="login"  />
        </div>  
      <div className="flex lg:w-1/2 md:w-[60%] justify-center items-center ">
          <div className="flex w-[91vw] bg-white rounded-lg lg:w-[400px]  md:w-[300px] md:justify-center">
            <div className="flex flex-col w-full p-5">
              <h1 className=" text-xl md:mb-3 text-[#4229cb]">Login</h1>
              <form
                className="flex justify-center flex-col item-center mt-4"
                onSubmit={handleSubmit}
              >
                <label className="mb-2 text-[#4229cb]">Username</label>
                <input
                  className="w-full mb-3 h-12 rounded-md p-3 md:mb-8  border border-black"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  required
                />
                <label className="mb-2 text-[#4229cb]">Password</label>
                <input
                  className="w-full h-12 mb-4 rounded-md p-3 md:mb-8  border border-black"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
                <div className="md:flex text-white lg:justify-around md:justify-between">
                  <input
                    type="submit"
                    className="bg-[#4229cb] mb-2 border cursor-pointer w-full md:w-fit md:px-4 h-10 hover:bg-[#6a4ef5]"
                    value="Login"
                  />
                  <Link to="/register">
                    <h1 className="bg-[#4229cb] flex items-center justify-center border w-full md:md:px-3 hover:text-white md:w-fit h-10 hover:bg-[#6a4ef5]">
                      Register
                    </h1>
                  </Link>
                </div>
              </form>
              <h1 className="text-center my-2 text-slate-500">
                --------or--------
              </h1>
              <div className=" bg-[#4229cb] text-white flex rounded-lg hover:bg-[#6a4ef5] hover:border ">
                <i className="fa-brands text-[#b4c1db] fa-2xl fa-google-plus-g m-auto pl-2"></i>
                <button onClick={google} className=" w-full h-10">
                  Login with google
                </button>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </div>
  );
}

export default Login;
