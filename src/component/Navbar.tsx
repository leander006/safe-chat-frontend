import { Link, useNavigate } from "react-router";
import { GetUser } from "../context/UserProvider";
import { useCallback } from "react";
import Cookies from "js-cookie";

export const NavBar = () => {
    const userContext = GetUser();
    const user = userContext ? userContext.user : null;
    const navigate = useNavigate();
    const logout = useCallback((e:any) => {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        Cookies.remove("user");
        Cookies.remove("authToken");
        userContext?.setUser(null);
        navigate("/");
      }, []);

    return (
        <nav className=" bg-[#5409DA] p-4 w-full h-[10%] text-white flex items-center justify-center">
        <div className="container mx-auto flex justify-between items-center space-x-1">
            <Link to={"/"} className="text-white md:text-lg font-bold">Video </Link>
            <div className="space-x-4 text-white flex ">
                <Link to={"/"}>Home</Link>
                <Link to={"/room"}>Room</Link>
                <Link to={"/profile"}>Profile</Link>
                <Link to={"/history"}>History</Link>
                {user && (
                    <div className=" cursor-pointer" onClick={logout}>Logout</div>
                )}
            </div>
        </div>
        </nav>
    );
}