import React, { useEffect, useState } from "react";

import { useCookies } from "react-cookie";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { FcManager } from "react-icons/fc";

import classes from "./Chat.module.css";

export default function ListChat({ reload }) {
  const navigate = useNavigate();
  const [cookie] = useCookies();
  const [list, setList] = useState([]);
  useEffect(() => {
    const dataReq = {
      email: cookie.email,
      token: cookie.token,
    };
    axios
      .post("/getAdminChat", dataReq)
      .then((res) => {
        const data = [...res.data];
        data.sort((a, b) => {
          const aDate = new Date(a.dateSend);
          const bDate = new Date(b.dateSend);
          return bDate - aDate;
        });
        setList(data);
      })
      .catch((err) => console.log(err));
  }, [reload]);
  return (
    <div className={classes["list-chat"]}>
      <input type="text" placeholder="Search Contact" />
      <div className={classes["roomid-content"]}>
        {list.map((room) => {
          return (
            <div
              key={room._id}
              onClick={() => navigate(`/chat/${room.emailUser}`)}
              className={classes["room-id"]}
            >
              <FcManager />
              <p>{room.emailUser}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
