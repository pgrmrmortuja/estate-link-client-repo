import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Shared/Loading";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading></Loading> ;

    return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
