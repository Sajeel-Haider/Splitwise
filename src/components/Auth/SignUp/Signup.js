import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch } from "react-redux";

import { SharedInputFields } from "../SharedInputFields/SharedInputFields";
import {
  signupWithGoogleFunctionality,
  signupWithLocalCredFunctionality,
} from "../Functions/signupFunctions";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.scss";

export const Signup = () => {
  const [loading, setloading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValid = (value, type) => {
    if (type === "email") {
      const emailRegex =
        /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(value);
    } else {
      const nameRegex = /[a-zA-Z]/;
      return nameRegex.test(value);
    }
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(!isValid(newEmail, "email"));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(newPassword.length < 8);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(!isValid(newName));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (type === "google") {
      signupWithGoogleFunctionality(
        setloading,
        dispatch,
        navigate,
        email,
        name,
        password
      );
    } else if (type === "local") {
      signupWithLocalCredFunctionality(setloading, dispatch, navigate);
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
        <h1>Sign Up</h1>
        <SharedInputFields
          label={"Name"}
          value={name}
          handleOnChange={handleNameChange}
          handleError={nameError}
          errorMessage={"Invalid Name"}
        />
        <SharedInputFields
          label={"Email"}
          value={email}
          handleOnChange={handleEmailChange}
          handleError={emailError}
          errorMessage={"Invalid email format"}
        />
        <SharedInputFields
          label={"Password"}
          value={password}
          handleOnChange={handlePasswordChange}
          handleError={passwordError}
          errorMessage={"Password must be at least 8 characters"}
        />
        <button onClick={(e) => handleSubmit(e, "local")} type="submit">
          Sign up
        </button>
        <button onClick={(e) => handleSubmit(e, "google")} type="submit">
          Sign Up with Google
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
