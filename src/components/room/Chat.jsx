import React, { useEffect, useState } from "react";

import axios from "axios";
import { useCookies } from "react-cookie";
import openSocket from "socket.io-client";

import { useParams } from "react-router-dom";

import NavChat from "./NavChat";
import ListChat from "./ListChat";
import ChatDetail from "./ChatDetail";

import classes from "./Chat.module.css";

export default function Chat() {
  const [reloadMessage, setReloadMessage] = useState(0);
  const [reloadListChat, setReloadListChat] = useState(0);

  useEffect(() => {
    const socket = openSocket("https://web-ecommerce-xzk6.onrender.com");
    socket.on("msg", (data) => {
      if (data.action === "Created") {
        setReloadListChat(() => (reloadMessage === 0 ? 1 : 0));
      } else if (data.action === "updated") {
        setReloadMessage(() => (reloadMessage === 0 ? 1 : 0));
        setReloadListChat(() => (reloadMessage === 0 ? 1 : 0));
      }
    });
  });

  return (
    <div className={classes["room-container"]}>
      <NavChat />
      <div className={classes["room-content"]}>
        <ListChat reload={reloadListChat} />
        <ChatDetail reload={reloadMessage} />
      </div>
    </div>
  );
}
