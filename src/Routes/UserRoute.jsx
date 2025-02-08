import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import Loading from "../Shared/Loading";

const UserRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading></Loading> ;

    const token = localStorage.getItem("jwt");
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.role === "User") {
            return children;
        }
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default UserRoute;
