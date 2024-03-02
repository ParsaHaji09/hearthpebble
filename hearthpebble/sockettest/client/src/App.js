import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import React from "react";
//import { HISTORY } from "../src/server/index";
var history = ["Entry 1", "Entry 2", "Entry 3"];

const socket = io.connect("http://localhost:4001");

const ScrollableList = ({ data }) => {
  return (
    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    history.push(message);
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      history.push(data.message);
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
      <ScrollableList data={history} />
    </div>
  );
}

export default App;