// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./shared/pages/NotFound.tsx";
import ExploreCompanies from "./explore/pages/ExploreCompanies.tsx";
import CompanyProfile from "./company/pages/CompanyProfile.tsx";
import LoginForm from "./authentication/pages/LoginForm.tsx";
import SignUpForm from "./authentication/pages/SignUpForm.tsx";
import CompanySurveys from "./survey/pages/CompanySurveys.tsx";
import CompanyBilling from "./company/pages/CompanyBilling.tsx";
import CustomerProfile from "./customer/pages/CustomerProfile.tsx";
import CustomerReviews from "./customer/pages/CustomerReviews.tsx";
import CustomerSurveys from "./customer/pages/CustomerSurveys.tsx";
import { ProtectedRoute } from "./shared/components/ProtectedRoute.tsx";
import Layout from "./shared/components/Layout.tsx";
import ExploreCompanyDetails from "./explore/pages/ExploreCompanyDetails.tsx";
import {clearToken} from "./authentication/services/AuthSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import CompanySurveysDashboard from "./survey/pages/CompanySurveysDashboard.tsx";
import PublicSurvey from "./survey/pages/PublicSurvey.tsx";

function App() {

    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(clearToken());
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout user={user} logout={logout} />}>
                    <Route
                        path=""
                        element={
                            user ? (
                                user.role === "CUSTOMER" ? (
                                    <Navigate to="/explore-companies" />
                                ) : (
                                    <Navigate to="/company-surveys" />
                                )
                            ) : (
                                <Navigate to="/explore-companies" />
                            )
                        }
                    />

                    {/* Auth Routes */}
                    <Route element={<ProtectedRoute isAllowed={user == null} redirectTo="/" />}>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignUpForm />} />
                    </Route>

                    {/* Customer Routes */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user?.role === "CUSTOMER"} redirectTo="/login" />}>
                        <Route path="/customer-profile" element={<CustomerProfile />} />
                        <Route path="/customer-reviews" element={<CustomerReviews />} />
                        <Route path="/customer-surveys" element={<CustomerSurveys />} />
                    </Route>

                    {/* Company Routes */}
                    <Route element={<ProtectedRoute isAllowed={!!user && user?.role === "COMPANY"} redirectTo="/login" />}>
                        <Route path="/company-profile" element={<CompanyProfile />} />
                        <Route path="/company-surveys" element={<CompanySurveys />} />
                        <Route path="/company-surveys/:id/edit" element={<CompanySurveysDashboard />} />
                        <Route path="/company-billing" element={<CompanyBilling />} />
                    </Route>

                    {/* DMZ Routes */}
                    <Route path="/explore-companies" element={<ExploreCompanies />} />
                    <Route path="/company/:id" element={<ExploreCompanyDetails />} />
                    <Route path="/public-survey/:id" element={<PublicSurvey />} />
                    {user ? (
                        user.role === "CUSTOMER" ? (
                            <Route index element={<ExploreCompanies />} />
                        ) : (
                            <Route index element={<CompanySurveys />} />
                        )
                    ) : (
                        <Route index element={<ExploreCompanies />} />
                    )}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
