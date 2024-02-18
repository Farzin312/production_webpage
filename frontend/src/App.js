import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AuthProvider, AuthContext, ProtectedRoute } from './components/ownerportal/authcontext';
import Login from './components/authpages/login';
import Register from './components/authpages/register';
import ResetPasswordRequest from './components/authpages/resetrequest';
import ResetPassword from './components/authpages/resetpage';
import AdminPanel from './components/ownerportal/adminpanel';
import NotFound from './components/authpages/notfound';
import Goods from './components/goods';
import Header from './components/header';
import Gallery from './components/pictures';
import GasPrices from './components/price';
import Contact from './components/contact';
import Hours from './components/hours';
import Services from './components/services';
import Review from './components/review';
import AllPrices from './components/allprice';

import './components/styling/App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app-app-container">
                    <Header />
                    <AdminPanelLink />
                    <div className="app-route-container">
                        <Routes>
                            <Route path="/" element={
                               <div className="main-content">
                               <div className="top-row">
                                   <Gallery />
                                   <GasPrices />
                                    <Hours />
                                   <Services />
                                    <Contact />  
                                    
                               </div>
                               <div className="bottom-row"> 
                                   <Review />
                               </div>
                           </div>
                        } />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/reset_request" element={<ResetPasswordRequest />} />
                            <Route path="/reset_password/:token" element={<ResetPassword />} />
                            <Route path="/goods" element={<Goods />} />
                            <Route path="/all_prices" element={<AllPrices />} />
                            <Route path="*" element={<NotFound />} />
                            <Route 
                                path="/admin" 
                                element={
                                    <ProtectedRoute>
                                        <AdminPanel />
                                    </ProtectedRoute>
                                } 
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
};

const AdminPanelLink = () => {
    const { isAuthenticated } = React.useContext(AuthContext);
    const location = useLocation();

    if (!isAuthenticated) return null;

    if (location.pathname === '/admin') {
        return (
            <div className="app-admin-panel-link">
                <Link to="/">Back to Homepage</Link>
            </div>
        );
    }

    if (location.pathname !== '/admin') {
        return (
            <div className="app-admin-panel-link">
                <Link to="/admin">Admin Panel</Link>
            </div>
        );
    }

    return null;
};

export default App;
