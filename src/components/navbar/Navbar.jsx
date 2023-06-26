import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const naviagte = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!cookie.token) {
      naviagte("/login");
    }
  }, [location.pathname]);

  return (
    <div className={classes["nav-container"]}>
      <p>Admin Page</p>
      <ul className={classes["nav-element"]}>
        <li>
          <Link className={classes["link"]} to={"/"}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link className={classes.link} to={"/product"}>
            Product
          </Link>
        </li>
        <li>
          <Link className={classes.link} to={"/chat/null"}>
            Chat Room
          </Link>
        </li>
        <li>
          <Link className={classes["link"]} to={"/add-new"}>
            Add Product
          </Link>
        </li>
      </ul>
      {location.pathname !== "/login" && (
        <button
          onClick={() => {
            removeCookie("token", { path: "/" });
            naviagte("/login");
          }}
          className={classes["login-btn"]}
        >
          Logout
        </button>
      )}
    </div>
  );
}
