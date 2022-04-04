

import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
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
  console.log(user);

  return (
    <>
 

   <Router>
     <Routes> 
     <Route exact path="/" element={user?<Home/>:<Login/>}/>
     <Route exact path="/login" element={<Login/>}/>
     <Route exact path="/register" element={<Register/>}/> 
    <Route exact path="/about" element={user?<About/>:<Login/>}/> 
  
    </Routes>
   </Router>
     </>
    
  );
}

export default App;
