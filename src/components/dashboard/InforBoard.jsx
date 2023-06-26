import React, { useState, useEffect } from "react";
import {
  BsFillPersonPlusFill,
  BsCurrencyDollar,
  BsFileEarmarkPlusFill,
  BsFillCalendarEventFill,
} from "react-icons/bs";
import classes from "./InforBoard.module.css";
export default function InforBoard({ infor, user }) {
  const [total, setTotal] = useState("");

  function num(str) {
    const arr = str.split(".");
    arr.pop();
    const result = arr.join("");
    return Number(result);
  }

  useEffect(() => {
    let tol = 0;

    infor.forEach((element) => {
      tol += num(element.total);
    });

    let thousands = (tol - Math.floor(tol / 1000) * 1000).toString();
    thousands =
      thousands.length === 3
        ? thousands
        : thousands.length === 2
        ? "0" + thousands
        : "00" + thousands;

    const price =
      Math.floor(tol / 1000).toString() + "." + thousands + ".000 VND";

    setTotal(price);
  }, [infor]);

  const Element = ({ title, icon }) => (
    <div className={classes["inforbard-element"]}>
      <div className={classes["inforbard-element-title"]}>
        <h2>{title.h2}</h2>
        <p>{title.p}</p>
      </div>
      {icon}
    </div>
  );

  return (
    <div className={classes["inforboard-container"]}>
      <Element
        title={{ h2: user.length, p: "Client" }}
        icon={<BsFillPersonPlusFill />}
      />
      <Element
        title={{ h2: total, p: "Earning of Month" }}
        icon={<BsCurrencyDollar />}
      />
      <Element
        title={{ h2: infor.length, p: "New Order" }}
        icon={<BsFileEarmarkPlusFill />}
      />
      <Element
        title={{ h2: total, p: "Total Revenue " }}
        icon={<BsFillCalendarEventFill />}
      />
    </div>
  );
}
