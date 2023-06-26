import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import classes from "./Product.module.css";
import Alert from "../alert/Alert";

export default function Product() {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [product, setProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [alert, setAlert] = useState({ isAlert: false, title: "", id: "" });
  const [reset, setReset] = useState(0);
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

  const Searchkey = (e) => {
    const value = e.target.value;

    setSearchKey(value);
  };

  const searchHandler = () => {
    const dataSearch = product.filter((prod) => {
      const name = prod.name.toLowerCase();
      return name.includes(searchKey.toLowerCase());
    });
    setSearchProduct(dataSearch);
  };

  useEffect(() => {
    axios.get("/product/products/all").then((result) => {
      setProduct(result.data);
      setSearchProduct(result.data);
    });
  }, [reset]);
  const closeAlert = () => {
    setAlert({ isAlert: false, title: "", id: "" });
  };
  const updateHandler = () => {
    navigate(`/update-product/${alert.id}`);
  };
  const deleteHandler = () => {
    setAlert({ isAlert: false, title: "", id: "" });
    const dataReq = {
      email: cookies.email,
      token: cookies.token,
      id: alert.id,
    };
    axios
      .delete("/product/delete-product", {
        headers: {
          Authorization: "authorizationToken",
        },
        data: dataReq,
      })
      .then((result) => {
        if (result.status === 200) {
          setAlert({
            isAlert: true,
            status: "success",
            title: "Success",
            desc: `Delete Product Success`,
            id: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successHandler = () => {
    setAlert({ isAlert: false, title: "", id: "" });
    setReset(() => (reset === 0 ? 1 : 0));
  };

  return (
    <div className={classes["product-container"]}>
      <h2>Products</h2>
      <input onChange={Searchkey} placeholder="Enter Search!" />
      <button onClick={searchHandler} className={classes["search-btn"]}>
        Search
      </button>
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
            {searchProduct.map((prod) => {
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
                    <button
                      onClick={() =>
                        setAlert({
                          isAlert: true,
                          status: "update",
                          title: "Update Product",
                          desc: `Comfirm Update Product ${prod.name}`,
                          id: prod._id,
                        })
                      }
                      className={classes["update-btn"]}
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        setAlert({
                          isAlert: true,
                          status: "delete",
                          title: "Delete Product",
                          desc: `Comfirm Delete Product ${prod.name}`,
                          id: prod._id,
                        })
                      }
                      className={classes["delete-btn"]}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {alert.isAlert && (
        <Alert
          alert={alert}
          close={closeAlert}
          handler={
            alert.status === "update"
              ? updateHandler
              : alert.status === "delete"
              ? deleteHandler
              : successHandler
          }
        />
      )}
    </div>
  );
}
