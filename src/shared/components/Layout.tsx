import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./AppNavbar.tsx";

const Layout = ({ user, logout }) => {
    const location = useLocation();
    const authPaths = [
        "/login",
        "/signup",
    ];

    return (
        <>
            {
                !authPaths.includes(location.pathname) &&
                <Navbar user={user} logout={logout} />
            }
            <div className="container mx-auto">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
