import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Product.module.css";

export default function Product() {
  const [product, setProduct] = useState([]);

  const [searchKey, setSearchKey] = useState("all");
  // format money vnd
  function formatNumberToPrice(number) {
    const string = number.toString().split("");
    let dem = 1;
    const result = [];
    for (let i = string.length - 1; i >= 0; i--) {
      dem++;
      result.push(string[i]);
      if (dem === 4 && i !== 0) {
        result.push(".");
        dem = 1;
      }
    }
    return result.reverse().join("") + " VND";
  }

  const SearchHandler = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchKey("all");
    } else {
      setSearchKey(value);
    }
  };

  useEffect(() => {
    axios.get("/product/products/all").then((result) => {
      setProduct(result.data);
    });
  }, []);

  return (
    <div className={classes["product-container"]}>
      <h2>Products</h2>
      <input onClick={SearchHandler} placeholder="Enter Search!" />
      <div className={classes["table-container"]}>
        <table>
          <thead className={classes["table-header"]}>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Image</td>
              <td>Category</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {product.map((prod) => {
              return (
                <tr key={prod._id} className={classes["table-body_item"]}>
                  <td>{prod._id}</td>
                  <td>{prod.name}</td>
                  <td>{formatNumberToPrice(prod.price)}</td>
                  <td>
                    <img src={prod.img1} width="100px" alt={prod.name} />
                  </td>
                  <td>{prod.category}</td>
                  <td>
                    <button className={classes["update-btn"]}>Update</button>
                    <button className={classes["delete-btn"]}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
