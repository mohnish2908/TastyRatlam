import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";
import { setLoading, setToken, setContactNumber } from "../../slices/userSlice";
import { isAdmin,setAdmin,clearAdmin } from "../../slices/adminSlice";

const { SENDOTP_API, LOGIN_API, CREATE_ADMIN_API, ADMIN_LOGIN_API } = endpoints;

export function sendOTP(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));
    if (data.contactNumber) {
      dispatch(setContactNumber(data.contactNumber));
    }
    try {
      const response = await apiConnector("POST", SENDOTP_API, data);
      console.log("response", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("otp send succesfully check your message");

      navigate("/verifyotp");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging In...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, data);
      console.log("response", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      localStorage.setItem("token", JSON.stringify(response.data.token));
      dispatch(setToken(response.data.token));
      toast.success("Login Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Could Not Login");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function adminLogin(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging In...");
    // dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", ADMIN_LOGIN_API, data);
      console.log("response", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // localStorage.setItem('token',JSON.stringify(response.data.token));
      // dispatch(setToken(response.data.token));
      const { adminData } = response.data;

      localStorage.setItem("isAdmin", JSON.stringify(true));
      localStorage.setItem("adminData", JSON.stringify(adminData));
      
      // Update Redux state
      dispatch(setAdmin({ isAdmin: true, adminData }));
      toast.success("Login Successfully");
      navigate("/admin-dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Could Not Login");
    }
    // dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setContactNumber(null));
    dispatch(clearAdmin());
    navigate("/");
  };
}

export function adminLogOut(navigate) {
  return async (dispatch) => {
    // localStorage.removeItem('token');
    dispatch(setAdmin({ isAdmin: false, adminData: null }));
    navigate("/admin-login-8989866833");
  };
}