import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./shared/pages/NotFound.tsx";
import ExploreCompanies from "./explore/pages/ExploreCompanies.tsx";
import Navbar from "./shared/components/Navbar.tsx";
import CompanyProfile from "./company/pages/CompanyProfile.tsx";
import LoginCompany from "./authentication/pages/LoginCompany.tsx";
import LoginCustomer from "./authentication/pages/LoginCustomer.tsx";
import SignUpCompany from "./authentication/pages/SignUpCompany.tsx";
import SignUpCustomer from "./authentication/pages/SignUpCustomer.tsx";
import { useState } from "react";
import CompanySurveys from "./company/pages/CompanySurveys.tsx";
import CompanyBilling from "./company/pages/CompanyBilling.tsx";
import CustomerProfile from "./customer/pages/CustomerProfile.tsx";
import CustomerReviews from "./customer/pages/CustomerReviews.tsx";
import CustomerSurveys from "./customer/pages/CustomerSurveys.tsx";
import { ProtectedRoute } from "./shared/components/ProtectedRoute.tsx";

// @ts-ignore
function App() {
    const [user, setUser] = useState(null);

    const loginCompany = () => {
        setUser({
            name: "John Company",
            email: "company@gmail.com",
            role: "COMPANY"
        });
    };

    const loginCustomer = () => {
        setUser({
            name: "John Customer",
            email: "customer@gmail.com",
            role: "CUSTOMER"
        });
    };

    const logout = () => {
        setUser(null);
    };


    return (
        <BrowserRouter>
            <Navbar user={user} logout={logout}/>
            <div className="container mx-auto">
                <Routes>
                    {/* Auth Routes */}
                    <Route element={<ProtectedRoute isAllowed={user === null} redirectPath="/"/>}>
                        <Route path="/login-company" element={<LoginCompany loginCompany={loginCompany}/>}/>
                        <Route path="/login-customer" element={<LoginCustomer loginCustomer={loginCustomer}/>}/>
                        <Route path="/signup-company" element={<SignUpCompany/>}/>
                        <Route path="/signup-customer" element={<SignUpCustomer/>}/>
                    </Route>

                    {/* Customer Routes */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user?.role === "CUSTOMER"}
                                                    redirectPath="/login-customer"/>}>
                        <Route path="/customer-profile" element={<CustomerProfile/>}/>
                        <Route path="/customer-reviews" element={<CustomerReviews/>}/>
                        <Route path="/customer-surveys" element={<CustomerSurveys/>}/>
                    </Route>

                    {/* Company Routes */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user?.role === "COMPANY"}
                                                    redirectPath="/login-company"/>}>
                        <Route path="/company-profile" element={<CompanyProfile/>}/>
                        <Route path="/company-surveys" element={<CompanySurveys/>}/>
                        <Route path="/company-billing" element={<CompanyBilling/>}/>
                    </Route>

                    {/* DMZ Routes */}
                    <Route path="/explore-companies" element={<ExploreCompanies/>}/>
                    {user ? (
                        user.role === "CUSTOMER" ? (
                            <Route index element={<ExploreCompanies/>}/>
                        ) : (
                            <Route index element={<CompanySurveys/>}/>
                        )
                    ) : (
                        <Route index element={<ExploreCompanies/>}/>
                    )}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
