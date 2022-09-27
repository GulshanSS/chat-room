import "./App.css";
import io from "socket.io-client";
import { BsChatSquareDots } from "react-icons/bs";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="chatRoom__form">
          <span>
            Create Room <BsChatSquareDots />
          </span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Display name"
          />
          <input
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter Room name"
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={name} />
      )}
    </div>
  );
}

export default App;
