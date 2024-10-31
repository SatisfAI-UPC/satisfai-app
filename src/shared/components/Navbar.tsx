import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";

function Navbar({ user, logout }) {
    const defaultHome = user?.role === "CUSTOMER" ? "/explore-companies" : "/company-surveys";

    return (
        <div className="bg-white p-2 md:p-4 rounded-2xl">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to={defaultHome}>
                            <img
                                className="h-8 md:h-10 w-auto"
                                src="/src/assets/satisfai-logo.png"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div>
                        {user?.role === "CUSTOMER" && (
                            <ul className="flex list-none gap-8 font-medium">
                                <li><Link to="/explore-companies" className="link-primary">Companies</Link></li>
                                <li><Link to="/customer-reviews" className="link-primary">Reviews</Link></li>
                                <li><Link to="/customer-surveys" className="link-primary">Surveys</Link></li>
                            </ul>
                        )}
                        {user?.role === "COMPANY" && (
                            <ul className="flex list-none gap-8 font-medium">
                                <li><Link to="/company-surveys" className="link-primary">Surveys</Link></li>
                                <li><Link to="/company-profile" className="link-primary">Profile</Link></li>
                                <li><Link to="/company-billing" className="link-primary">Billing</Link></li>
                                <li><Link to="/explore-companies" className="link-primary">Companies</Link></li>
                            </ul>
                        )}
                    </div>
                    <div>
                        {!user ? (
                            <ul className="flex list-none gap-4">
                                <li>
                                    <Link to="/login">
                                        <Button className="font-medium">Log in</Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup">
                                        <Button className="button-primary">Sign up</Button>
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Avatar
                                        className="cursor-pointer"
                                        alt={user?.name}
                                        src={user?.avatar}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Menu">
                                    <DropdownItem>
                                        <Link to={user?.role === "CUSTOMER" ? "/customer-profile" : "/company-profile"}>
                                            Profile
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem onClick={logout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
