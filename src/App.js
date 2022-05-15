

import Login from "./components/Pages/login /Login";
import Register from "./components/Pages/register /Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import {  Context } from "./context/ContextProvider";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/about/About";
// import Chats from "./components/chats/Chats";
import Main from './components/Pages/main/Main'



function App() {
  const {user} = useContext( Context);
  console.log(user);

  return (
    <>
 

   <Router>
     <Routes> 
       
     <Route exact path="/" element={user?<Main/>:<Login/>}/>
     <Route exact path="/login" element={<Login/>}/>
     <Route exact path="/register" element={<Register/>}/> 
     <Route exact path="/chat" element={user?<Home/>:<Login/>}/> 
     <Route exact path="/about" element={user?<About/>:<Register/>}/> 
  
    </Routes>
   </Router>
     </>
    
  );
}

export default App;
