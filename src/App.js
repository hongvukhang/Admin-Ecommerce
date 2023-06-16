import { Fragment } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Product from "./components/product/Product";
function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" exact element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
