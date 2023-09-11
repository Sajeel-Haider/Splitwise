import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

export const PrivateRoute = () => {
  const authUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  });
  return <Outlet />;
};
