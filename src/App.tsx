import { Route, Routes } from 'react-router-dom'
import Room from './component/room'
import Demo from './component/demo'
import Home from './Home'
import { GetUser } from './context/UserProvider'
import Profile from './Profile'
import History from './History'
function App() {

  const userContext = GetUser();
  const user = userContext ? userContext.user : null;
  
  return (
    <>
      <Routes>
        <Route path="/history" element={user?<History/>:<Home/>} />
        <Route path="/profile" element={user?<Profile/>:<Home/>} />
        <Route path="/room/:roomId" element={<Demo/>} />
        {/* <Route path="/room/:roomId" element={user?<Demo/>:<Home/>} /> */}
        <Route path="/room" element={user?<Room/>:<Home/>} />
        <Route path="/" element={!user?<Home/>:<Room/>} />
      </Routes>
    </>
  )
}

export default App
