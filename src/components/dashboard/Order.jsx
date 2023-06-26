import React from "react";
import classes from "./Order.module.css";
export default function Order({ inforOrder }) {
  return (
    <div className={classes["table-container"]}>
      <table>
        <thead className={classes["table-header"]}>
          <tr>
            <td>ID User</td>
            <td>Name</td>
            <td>Phone</td>
            <td>Address</td>
            <td>Total</td>
            <td>Delivery</td>
            <td>Status</td>
            <td>Detail</td>
          </tr>
        </thead>
        <tbody>
          {inforOrder.map((prod) => {
            return (
              <tr key={prod._id} className={classes["table-body_item"]}>
                <td>{prod.userId}</td>
                <td>{prod.name}</td>
                <td>{prod.phone}</td>
                <td>
                  <p className={classes["address"]}>{prod.address}</p>{" "}
                </td>

                <td>{prod.total}</td>
                <td>{prod.delivery}</td>
                <td>{prod.status}</td>
                <td>
                  <button className={classes["view-btn"]}>View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
