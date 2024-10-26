import { Link } from "react-router-dom";

// @ts-ignore
function Navbar({ user, logout }) {
    return (
        <div className="bg-white p-2 md:p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to="/">
                            <img
                                className="h-9 w-auto"
                                src="/src/assets/satisfai-logo.png" alt="logo"/>
                        </Link>
                    </div>
                    <div>
                        {user?.role === "CUSTOMER" && (
                            <ul className="flex list-none gap-4">
                                <li><Link to={"/explore-companies"}>Companies</Link></li>
                                <li><Link to={"/customer-reviews"}>Reviews</Link></li>
                                <li><Link to={"/customer-surveys"}>Surveys</Link></li>
                            </ul>
                        )}
                        {user?.role === "COMPANY" && (
                            <ul className="flex list-none gap-4">
                                <li><Link to={"/company-surveys"}>Surveys</Link></li>
                                <li><Link to={"/company-profile"}>Profile</Link></li>
                                <li><Link to={"/company-billing"}>Billing</Link></li>
                                <li><Link to={"/explore-companies"}>Companies</Link></li>
                            </ul>
                        )}
                    </div>
                    <div>
                        {!user && (
                            <ul className="flex list-none gap-4">
                                <li><Link to={"/login-customer"}>Customer</Link></li>
                                <li><Link to={"/login-company"}>Company</Link></li>
                            </ul>
                        )}
                        {user && (
                            <button onClick={logout}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
