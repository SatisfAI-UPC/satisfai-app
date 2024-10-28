import {Navigate, Outlet} from "react-router-dom";

// @ts-ignore
export const ProtectedRoute = ({isAllowed, children, redirectTo="*"}) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
}