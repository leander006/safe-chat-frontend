import { Route, Routes } from 'react-router-dom'
import VideoCallComponent from './component/VideoCallComponent'
import { GetUser } from './context/UserProvider'
import Profile from './Profile'
import Call from './Call'
import Login from './Login'
import Room from './Room'
import IncomingCall from './IncomingCall'
import OutgoingCall from './OutGoingCall'
import AudioCallComponent from './component/AudioCallComponent'
import type { User } from './utils/types'
function App() {

  const userContext = GetUser();
  const user = (userContext?.user && typeof userContext.user === 'object') ? userContext.user as User : null;
  
  return (
    <>
      <Routes>
        <Route path="/history" element={user?<History/>:<Login/>} />
        <Route path="/profile" element={user?<Profile/>:<Login/>} />
        <Route path="/video/:roomId" element={user?<VideoCallComponent/>:<Login/>} />
        <Route path="/audio/:roomId" element={user?<AudioCallComponent/>:<Login/>} />
        <Route path="/call" element={user?<Call/>:<Login/>} />
        <Route path="/room" element={user?<Room/>:<Login/>} />
        <Route path="/incomingCall/:roomId" element={user?<IncomingCall/>:<Login/>} />
        <Route path="/outgoingCall/:roomId" element={user?<OutgoingCall/>:<Login/>} />
        <Route path="/" element={!user?<Login/>:<Room/>} />
      </Routes>
    </>
  )
}

export default App
