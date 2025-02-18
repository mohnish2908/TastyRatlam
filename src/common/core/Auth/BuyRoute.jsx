import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setRedirectPath } from "../../../slices/userSlice";

const BuyRoute = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.token) {
      // Set the current path as the redirect path
      navigate("/login");
    //   toast.error("Please log in to proceed.");
    }
  }, [user, navigate, dispatch]);

  // If user is logged in, render children
  return user?.token ? children : null;
};

export default BuyRoute;
