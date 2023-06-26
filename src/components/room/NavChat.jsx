import React from "react";
import classes from "./Chat.module.css";
import { useNavigate } from "react-router-dom";
export default function NavChat() {
  const naviagate = useNavigate();
  return (
    <div className={classes["title"]}>
      <h4>Chat</h4>
      <p>
        <span onClick={() => naviagate("/")}>Apps</span> / <span>Chat</span>
      </p>
    </div>
  );
}
