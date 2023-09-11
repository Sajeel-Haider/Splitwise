import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

import { BlockButton } from "../StyledComponents/Button-styles";
import { setAuthUser } from "../../store/slices/authUser-slice";

import logo from "../../../src/assets/logo.png";
import "./Navbar.scss";

export const Navbar = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  const userSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => dispatch(setAuthUser(null)))
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="navbar-container">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>Splitwise</h1>
      </div>
      <div className="lg-sign-btn">
        {authUser ? (
          <>
            <h3 className="user-name">
              Hi ! <span>{authUser.name}</span>
            </h3>
            <BlockButton to={`/dashboard/${authUser.u_id}`} variant="block">
              Dashboard
            </BlockButton>
            <BlockButton onClick={userSignOut} to="/" variant="orange">
              Logout
            </BlockButton>
          </>
        ) : (
          <>
            <BlockButton to="/login">Login</BlockButton>
            <BlockButton to="/signup" variant="block">
              Sign up
            </BlockButton>
          </>
        )}
      </div>
    </div>
  );
};
