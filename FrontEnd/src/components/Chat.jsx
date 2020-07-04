import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { recieveMsg, sendMsg } from "../api/socket/index";
import { ScrollView } from "@cantonjs/react-scroll-view";
import { isMobile } from "react-device-detect";

function Chat({ playerId, roomId }) {
  const chat = useRef();
  const messagesEndRef = useRef(null);
  const [msgs, setMsgs] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

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

  useEffect(scrollToBottom, [msgs]);
  return (
    <div className="chat-room">
      <ol className="pages">
        <li className="chat page">
          <div className="chatArea">
            <div className="messages overflow-auto" style={{ height: "90vh" }}>
              {msgs.map(({ system, Msg }, i) =>
                system ? (
                  <li className="system-msg" key={i}>
                    {Msg}
                  </li>
                ) : (
                  <li key={i}>{Msg}</li>
                )
              )}
              <div ref={messagesEndRef} />
            </div>
            <input
              ref={chat}
              className="inputMessage"
              placeholder="Type here..."
            />
          </div>
        </li>
      </ol>
    </div>
  );
}

export default Chat;
