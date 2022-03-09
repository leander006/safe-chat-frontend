
import Navbar from "./components/navbar/Navbar";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";

import Chats from "./components/chats/Chats";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import {  Context } from "./context/ContextProvider";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";




function App() {
  const {user} = useContext( Context);


  return (
    <>
 

   <Router>
     <Routes> 
     <Route exact path="/" element={user?<Home/>:<Login/>}/>
     <Route exact path="/login" element={<Login/>}/>
     <Route exact path="/register" element={<Register/>}/> 
    <Route exact path="/about" element={<About/>}/> 
  
    </Routes>
   </Router>
     </>
    
  );
}

export default App;
