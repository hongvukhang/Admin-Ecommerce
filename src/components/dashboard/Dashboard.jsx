import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import InforBoard from "./InforBoard";
import classes from "./Dashboard.module.css";
import Order from "./Order";
export default function Dashboard() {
  const [dataOrder, setDataOrder] = useState([]);
  const [cookie] = useCookies();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const dataReq = { email: cookie.email, token: cookie.token, admin: true };

    axios.post("/historyAdmin", dataReq).then((history) => {
      setDataOrder(history.data);
    });

    axios.post("/user", dataReq).then((user) => {
      setUser(user.data);
    });
  }, []);
  return (
    <div className={classes["dashboard-container"]}>
      <InforBoard infor={dataOrder} user={user} />
      <Order inforOrder={dataOrder} />
    </div>
  );
}
