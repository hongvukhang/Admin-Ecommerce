import React, { useRef, useState } from "react";
import classes from "./AddProduct.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Alert from "../alert/Alert";
export default function AddProduct() {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const categoryRef = useRef("");
  const [price, setPrice] = useState(0);
  const shortDesRef = useRef("");
  const longDesRef = useRef("");

  const [file, setFile] = useState([]);

  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isAlert, setIsAlert] = useState(false);
  const validate = () => {
    if (
      nameRef.current.value === "" ||
      categoryRef.current.value === "" ||
      shortDesRef.current.value === "" ||
      longDesRef.current.value === "" ||
      price === 0 ||
      file.length !== 5
    ) {
      return false;
    }
    const valImgs = file.every(
      (img) => img.type === "image/jpeg" || img.type === "image/png"
    );

    if (!valImgs) return false;

    return true;
  };

  // function submit
  const submitHandler = (e) => {
    e.preventDefault();
    const isVal = validate();
    if (!isVal) {
      return setErr(true);
    }
    setErr(false);
    setIsLoading(true);

    const form = new FormData();
    file.forEach((file) => {
      form.append(file.name, file);
    });

    form.append("name", nameRef.current.value);
    form.append("category", categoryRef.current.value);
    form.append("short_desc", shortDesRef.current.value);
    form.append("long_desc", longDesRef.current.value);
    form.append("price", price);

    axios
      .post("/upload", form, { name: nameRef.current.value })
      .then((result) => {
        if (result.status === 201) {
          setIsLoading(false);
        }
      })
      .then(() => {
        setIsAlert(true);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && (
        <div
          className="spinner-border"
          style={{ position: "fixed", left: "50%", bottom: "300px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {isAlert && (
        <Alert
          alert={{
            status: "success",
            title: "Success",
            desc: "Create Product is Succes",
          }}
          handler={() => {
            setIsAlert(false);
            navigate("/product");
          }}
          close={() => {
            setIsAlert(false);
          }}
        />
      )}
      <form onSubmit={submitHandler} className={classes["form-container"]}>
        <label className={classes["form-element"]} htmlFor="name">
          Product Name
          <input
            type="text"
            placeholder="Enter Product Name"
            name="name"
            id="name"
            ref={nameRef}
          />
        </label>
        <label className={classes["form-element"]} htmlFor="category">
          Category
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter Category"
            ref={categoryRef}
          />
        </label>
        <label className={classes["form-element"]} htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className={classes["form-element"]} htmlFor="short-des">
          Short Description
          <textarea
            rows="3"
            id="short-des"
            name="short-des"
            placeholder="Enter Short Description"
            ref={shortDesRef}
          ></textarea>
        </label>
        <label className={classes["form-element"]} htmlFor="long-des">
          Long Description
          <textarea
            placeholder="Enter Long Description"
            name="long-des"
            id="long-des"
            rows="5"
            ref={longDesRef}
          ></textarea>
        </label>
        <label className={classes["input-file"]} htmlFor="name">
          Upload image (5 images)
          <input
            onChange={(e) => {
              setFile([...e.target.files]);
            }}
            type="file"
            name="name"
            id="name"
            multiple
          />
        </label>
        {err && (
          <p style={{ color: "red", marginTop: "10px" }}>Wrong information</p>
        )}
        <button className={classes["submit-btn"]}>Submit</button>
      </form>
    </>
  );
}
