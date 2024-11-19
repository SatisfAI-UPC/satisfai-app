// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";

function AppNavbar({ user, logout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const defaultHome = user?.role === "CUSTOMER" ? "/explore-companies" : "/company-surveys";

    const customerLinks = [
        { to: "/explore-companies", label: "Companies" },
        { to: "/customer-profile", label: "Profile" },
        { to: "/customer-reviews", label: "Reviews" },
        { to: "/customer-surveys", label: "Surveys" },
    ];

    const companyLinks = [
        { to: "/company-surveys", label: "Surveys" },
        { to: "/company-profile", label: "Profile" },
        { to: "/company-billing", label: "Billing" },
        { to: "/explore-companies", label: "Companies" },
    ];

    const renderLinks = (links) => (
        <ul className="flex flex-col md:flex-row list-none gap-4 md:gap-8 font-medium">
            {links.map((link) => (
                <li key={link.to}>
                    <Link to={link.to} className="link-primary" onClick={() => setIsMenuOpen(false)}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="bg-white p-2 md:p-4 rounded-2xl">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to={defaultHome}>
                            <img
                                className="h-8 md:h-10 w-auto"
                                src="/satisfai-logo.png"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex">
                        {user?.role === "CUSTOMER" && renderLinks(customerLinks)}
                        {user?.role === "COMPANY" && renderLinks(companyLinks)}
                    </div>
                    <div className={"flex gap-2"}>
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
                                        <DropdownItem onClick={logout}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                        </div>
                        <div className="md:hidden">
                            <Button
                                className={"button-primary"}
                                isIconOnly
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <i className={"pi pi-align-justify"}/>
                            </Button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden mt-2">
                        {user?.role === "CUSTOMER" && renderLinks(customerLinks)}
                        {user?.role === "COMPANY" && renderLinks(companyLinks)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppNavbar;
