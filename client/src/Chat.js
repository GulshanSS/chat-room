import React, { useEffect, useState } from "react";
import "./App.css";
import { RiRadioButtonLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, room, username }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chatRoom__box">
      <div className="header">
        <span>
          <RiRadioButtonLine /> Live Chat
        </span>
      </div>
      <ScrollToBottom className="message__box">
        {messageList.map((msg) => {
          return (
            <div
              id={username === msg.author ? "right" : "left"}
              className="message-content"
            >
              <div className="author">{msg.author}</div>
              <p className="message">{msg.message}.</p>
              <div className="time">{msg.time}</div>
            </div>
          );
        })}
      </ScrollToBottom>
      <div className="footer">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Message..."
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>
          <FiSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
