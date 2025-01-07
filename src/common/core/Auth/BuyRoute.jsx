import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const BuyRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        if (!user.token) {
            setRedirectPath(window.location.pathname);
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user.token && redirectPath) {
            navigate(redirectPath);
        }
    }, [user, redirectPath, navigate]);

    if (user.token) {
        return children;
    } else {
        return null;
    }
};

export default BuyRoute;