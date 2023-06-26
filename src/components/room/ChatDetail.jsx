import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FcManager } from "react-icons/fc";
import { RiSendPlaneFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import classes from "./Chat.module.css";

export default function ChatDetail({ reload }) {
  const params = useParams();
  const [cookies] = useCookies();

  const msgRef = useRef();
  const [msgSend, setMsgSend] = useState("");
  const [msg, setMsg] = useState([]);
  const [nullMessage, setNullMessage] = useState(false);

  useEffect(() => {
    const dataReq = {
      email: cookies.email,
      token: cookies.token,
      emailChat: params.email,
    };
    axios
      .post("/getChats", dataReq)
      .then((res) => {
        if (res.data.length !== 0) {
          setMsg(res.data[0].msg);
          setNullMessage(true);
        }
      })
      .catch((err) => console.log(err));
  }, [params.email, reload]);

  const fetchMgs = (e) => {
    e.preventDefault();
    if (msgSend !== "") {
      const data = {
        msg: msgSend,
        email: params.email,
        sender: "admin",
      };

      axios
        .post("/room-chat", data)
        .then(() => {
          setMsgSend("");
        })
        .catch((err) => console.log(err));
    }
  };
  const scrollToBottom = () => {
    msgRef.current.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className={classes["chat-detail_container"]}>
      <div className={classes["msg-container"]}>
        {msg.map((message) => {
          if (message.sender === "admin") {
            return (
              <div key={message._id} className={classes["msg-admin"]}>
                <p>You: {message.message}</p>
              </div>
            );
          } else {
            return (
              <div key={message._id} className={classes["msg-user"]}>
                <FcManager />
                <p>Client: {message.message}</p>
              </div>
            );
          }
        })}
        <div ref={msgRef} />
      </div>
      {nullMessage && (
        <form onSubmit={fetchMgs} className={classes["fetch-msg"]}>
          <input
            type="text"
            value={msgSend}
            onChange={(e) => setMsgSend(e.target.value)}
            placeholder="Type and enter"
          />
          <button>
            <RiSendPlaneFill />
          </button>
        </form>
      )}
    </div>
  );
}
