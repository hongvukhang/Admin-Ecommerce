import { Fragment } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Product from "./components/product/Product";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import AddProduct from "./components/addProduct/AddProduct";
import Chat from "./components/room/Chat";
import UpdateProduct from "./components/update-product/UpdateProduct";
function App() {
  axios.defaults.baseURL = "https://web-ecommerce-xzk6.onrender.com/";
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" exact element={<Product />} />
        <Route path="/add-new" element={<AddProduct />} />
        <Route path="/chat/:email" element={<Chat />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
    </>
  );
}

export default App;
