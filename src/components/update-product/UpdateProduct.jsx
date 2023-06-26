import React, { useRef, useState, useEffect } from "react";
import classes from "../addProduct/AddProduct.module.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../alert/Alert";
export default function UpdateProduct() {
  const param = useParams();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const [dataProduct, setDataProduct] = useState({});
  const nameRef = useRef("");
  const categoryRef = useRef("");
  const [price, setPrice] = useState(0);
  const shortDesRef = useRef("");
  const longDesRef = useRef("");

  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  useEffect(() => {
    axios.get(`/product/products/${param.id}`).then((product) => {
      setDataProduct(product.data[0]);
      setPrice(product.data[0].price);
    });
  }, [param.id]);
  const validate = () => {
    if (
      nameRef.current.value === "" ||
      categoryRef.current.value === "" ||
      shortDesRef.current.value === "" ||
      longDesRef.current.value === "" ||
      price === 0
    ) {
      return false;
    }

    return true;
  };

  // function submit
  const submitHandler = (e) => {
    e.preventDefault();
    const dataReq = {
      id: param.id,
      email: cookies.email,
      token: cookies.token,
      name: nameRef.current.value,
      category: categoryRef.current.value,
      price: price,
      short_desc: shortDesRef.current.value,
      long_desc: longDesRef.current.value,
    };

    const isVal = validate();
    if (!isVal) {
      return setErr(true);
    }
    setErr(false);
    setIsLoading(true);

    axios
      .post("/product/updated-product", dataReq)
      .then((result) => {
        if (result.status === 204) {
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
            desc: "Updated is success",
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
            id="name"
            name="name"
            type="text"
            ref={nameRef}
            placeholder="Enter Product Name"
            defaultValue={dataProduct.name}
          />
        </label>
        <label className={classes["form-element"]} htmlFor="category">
          Category
          <input
            id="category"
            name="category"
            type="text"
            ref={categoryRef}
            placeholder="Enter Category"
            defaultValue={dataProduct.category}
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
            defaultValue={dataProduct.price}
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
            defaultValue={dataProduct.short_desc}
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
            defaultValue={dataProduct.long_desc}
          ></textarea>
        </label>
        <label className={classes["input-file"]} htmlFor="name">
          Upload image (5 images)
          <input type="file" name="name" id="name" multiple disabled />
        </label>
        {err && (
          <p style={{ color: "red", marginTop: "10px" }}>Wrong information</p>
        )}
        <button className={classes["submit-btn"]}>Submit</button>
      </form>
    </>
  );
}
