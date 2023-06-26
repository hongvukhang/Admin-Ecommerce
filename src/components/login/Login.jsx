import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Login() {
  const [loginInput, setLginInput] = useState({ email: "", password: "" });
  const [cookies, setCookie] = useCookies();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const changeInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setErrorMsg("");
    if (id === "form1") {
      setLginInput(() => ({ ...loginInput, email: value }));
    } else {
      setLginInput(() => ({ ...loginInput, password: value }));
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();

    axios
      .post("/loginAdmin", loginInput)
      .then((admin) => {
        if (admin.status === 202) {
          setCookie("email", loginInput.email, { path: "/" });
          setCookie("token", admin.data.token, {
            path: "/",
            maxAge: 2 * 60 * 60,
          });
          navigate("/");
        }
        if (admin.status === 203) {
          setErrorMsg(admin.data[0].msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
        onChange={changeInput}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
        onChange={changeInput}
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="Remember me"
        />
        <a href="!#">Forgot password?</a>
      </div>
      {errorMsg !== "" && (
        <div className="text-center">
          <p style={{ color: "rgb(202,105,122)", fontStyle: "italic" }}>
            {errorMsg}
          </p>
        </div>
      )}
      <MDBBtn onClick={submitLogin} className="mb-4">
        Sign in
      </MDBBtn>
    </MDBContainer>
  );
}
