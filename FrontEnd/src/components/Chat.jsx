import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { recieveMsg, sendMsg } from "../api/socket/index";
import {isMobile} from "react-device-detect";
function Chat({ playerId, roomId }) {
  const chat = useRef();
  const [msgs, setMsgs] = useState([]);

  const sendChat = () => {
    const Msg = chat.current.value;
    sendMsg({ playerId, Msg, roomId });
    chat.current.value = "";
  };

  useEffect(() => {
    chat.current.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        sendChat();
      }
    });
    recieveMsg({ playerId, setMsgs, isMobile });
  }, []);
  return (
    <div className="chat-room">
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
    </div>
  );
}

export default Chat;
