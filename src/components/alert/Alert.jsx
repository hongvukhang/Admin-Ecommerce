import React from "react";
import ReactDOM from "react-dom";
import { AiOutlineQuestionCircle, AiOutlineCheckCircle } from "react-icons/ai";

import classes from "./Alert.module.css";
export default function Alert({ alert, close, handler }) {
  const backgroundColor =
    alert.status === "update"
      ? { backgroundColor: "rgb(119, 158, 203)" }
      : alert.status === "delete"
      ? { backgroundColor: "rgb(184, 74, 74)" }
      : { backgroundColor: "rgb(71,201,162)" };
  const IconAlert = () => {
    if (alert.status === "update" || alert.status === "delete")
      return <AiOutlineQuestionCircle />;

    return <AiOutlineCheckCircle />;
  };

  return ReactDOM.createPortal(
    <div className={classes.box}>
      <div className={classes["alert-container"]}>
        <div
          className={`${classes["alert-title"]} ${classes["alert-background"]}`}
          style={backgroundColor}
        >
          <button
            onClick={alert.status === "success" ? handler : close}
            className={"btn-close_alert"}
          >
            X
          </button>
          <IconAlert />
        </div>
        <div className={classes["alert-content"]}>
          <h3>{alert.title}</h3>
          <p>{alert.desc}</p>
          <div className={"alert-btn_container"}>
            <button onClick={handler}>Okey</button>
            {alert.status !== "success" && (
              <button onClick={close}> Cancel</button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
}
