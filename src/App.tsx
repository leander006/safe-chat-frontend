import { Route, Routes } from 'react-router-dom'
import Room from './component/room'
import VideoCallComponent from './component/VideoCallComponent'
import { GetUser } from './context/UserProvider'
import Profile from './Profile'
import History from './History'
import Call from './Call'
import Login from './Login'
function App() {

  const userContext = GetUser();
  const user = userContext ? userContext.user : null;
  
  return (
    <>
      <Routes>
        <Route path="/history" element={user?<History/>:<Login/>} />
        <Route path="/profile" element={user?<Profile/>:<Login/>} />
        <Route path="/room/:roomId" element={user?<VideoCallComponent/>:<Login/>} />
        <Route path="/call" element={user?<Call/>:<Login/>} />
        <Route path="/room" element={user?<Room/>:<Login/>} />
        <Route path="/" element={!user?<Login/>:<Room/>} />
      </Routes>
    </>
  )
}

export default App
