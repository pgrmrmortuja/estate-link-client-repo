import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import Loading from "../Shared/Loading";

const AgentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading></Loading>;

    const token = localStorage.getItem("jwt");
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.role === "Agent") {
            return children;
        }
    }

    return <Navigate to="/dashboard/user/profile" state={{ from: location }} replace />;
};

export default AgentRoute;
