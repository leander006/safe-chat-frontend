import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Room() {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();
  return (
    <main className="main-container">
    <section className="flex flex-col items-center">
      <div className="username-input mb-4">
        <input
          className="bg-gray-200 p-2 rounded-md"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="bg-gray-200 p-2 rounded-md"
          type="text"
          placeholder="Enter roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md ml-2"
            onClick={() => {
                if (!username) {
                    return
                } else {
                localStorage.setItem("username", username);
                navigate("/room/" + roomId);
                }
            } }
        >
          Join Room
        </button>
      </div>
    </section>
  </main>
  )
}

export default Room