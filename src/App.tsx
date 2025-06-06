import { Route, Routes } from 'react-router-dom'
import VideoCallComponent from './component/VideoCallComponent'
import { GetUser } from './context/UserProvider'
import Profile from './Profile'
import Call from './Call'
import Login from './Login'
import Room from './Room'
import IncomingCall from './IncomingCall'
import AudioCallComponent from './component/AudioCallComponent'
import type { User } from './utils/types'
import { useConnectionStatus } from './context/socketProvider'
import ErrorPage from './component/ErrorPage'
import OutgoingCall from './OutgoingCall'; // Correct

function App() {
  const user :User|any = GetUser();
  const { isConnected } = useConnectionStatus();
  return (
    <>
      {!isConnected?(
        <ErrorPage onRetry={() => window.location.reload()} />
      ):
      <Routes>
        <Route path="/profile" element={user?<Profile/>:<Login/>} />
        <Route path="/video/:roomId" element={user?<VideoCallComponent/>:<Login/>} />
        <Route path="/audio/:roomId" element={user?<AudioCallComponent/>:<Login/>} />
        <Route path="/call" element={user?<Call/>:<Login/>} />
        <Route path="/room" element={user?<Room/>:<Login/>} />
        <Route path="/incomingCall/:roomId" element={user?<IncomingCall/>:<Login/>} />
        <Route path="/outgoingCall/:roomId" element={user?<OutgoingCall/>:<Login/>} />
        <Route path="/" element={!user?<Login/>:<Room/>} />
      </Routes>
    }
    </>
  )
}

export default App
