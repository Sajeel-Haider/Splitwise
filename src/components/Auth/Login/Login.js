import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

import {
  loginWithGoogleFunctionality,
  loginWithLocalCredFunctionality,
} from "../Functions/loginFunctions";
import { SharedInputFields } from "../SharedInputFields/SharedInputFields";
import "./Login.scss";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(!isValidEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(newPassword.length < 8);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();

    if (type === "google") {
      loginWithGoogleFunctionality(setloading, dispatch, navigate);
    } else if (type === "local") {
      loginWithLocalCredFunctionality(
        email,
        password,
        setloading,
        dispatch,
        navigate
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        {loading && (
          <HashLoader
            color="#FF6666"
            loading={loading}
            size={55}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        <h1>Log in</h1>
        <SharedInputFields
          label={"Email"}
          value={email}
          handleOnChange={handleEmailChange}
          handleError={emailError}
          errorMessage={"Invalid email format"}
          required
        />
        <SharedInputFields
          label={"Password"}
          value={password}
          handleOnChange={handlePasswordChange}
          handleError={passwordError}
          errorMessage={"Password must be at least 8 characters"}
          required
        />
        <button onClick={(e) => handleSubmit(e, "local")} type="submit">
          Login
        </button>
        <button
          className="google-btn"
          onClick={(e) => handleSubmit(e, "google")}
          type="submit"
        >
          Log In with Google
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};
