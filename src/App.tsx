import { Route, Routes } from 'react-router-dom'
import Room from './component/room'
import Demo from './component/demo'
import Home from './Home'
import { GetUser } from './context/UserProvider'
function App() {

  const userContext = GetUser();
  const user = userContext ? userContext.user : null;

  console.log(user);
  
  return (
    <>
      <Routes>
        <Route path="/room/:roomId" element={<Demo/>} />
        <Route path="/room" element={<Room/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  )
}

export default App
