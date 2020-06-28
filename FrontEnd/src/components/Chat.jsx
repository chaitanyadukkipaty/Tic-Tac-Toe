import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { recieveMsg, sendMsg } from "../api/socket/index";

function Chat({ playerId, roomId }) {
  const chat = useRef();
  const [msgs, setMsgs] = useState([]);

  const sendChat = () => {
    const Msg = `${playerId}: ${chat.current.value}`;
    sendMsg({ Msg, roomId });
    chat.current.value = "";
  };

  useEffect(() => {
    chat.current.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        sendChat();
      }
    });
    recieveMsg({ setMsgs });
  }, []);
  return (
    <ul className="pages">
      <li className="chat page">
        <div className="chatArea">
          <ul className="messages">
            {msgs.map(({ system, Msg }, i) =>
              system ? (
                <li className="system-msg" key={i}>
                  {Msg}
                </li>
              ) : (
                <li key={i}>{Msg}</li>
              )
            )}
          </ul>
        </div>
        <input ref={chat} className="inputMessage" placeholder="Type here..." />
      </li>
    </ul>
  );
}

export default Chat;
