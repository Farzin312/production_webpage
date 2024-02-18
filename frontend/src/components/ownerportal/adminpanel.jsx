import React, { useState } from 'react';
import LogoutButton from './logout';
import PictureManager from './managepics';
import ReviewManager from './managereviews';
import ManageGoods from './managegoods';
import '../styling/adminpanel.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('pictureManager');
    
    const getActiveContent = () => {
        switch (activeTab) {
            case 'pictureManager':
                return <PictureManager />;
            case 'manageReviews':
                return <ReviewManager />
            case 'manageGoods':
                return <ManageGoods />
            default:
                return <PictureManager />;
        }
    };

    return (
        <div className="admin-admin-panel-wrapper">
            <div className="admin-adminheader">
                <h1 className="title">Admin Panel</h1>
                <div className="logout-container">
                    <LogoutButton />
                </div>
            </div>
            <div className="admin-mainContainer">
                <div className="admin-sidebar">
                    <h3 className="admin-nav-title">Controls</h3>
                    <button 
                        className={`admin-nav-button ${activeTab === 'pictureManager' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pictureManager')}>
                        Manage Pictures
                    </button>
                    <button 
                        className={`admin-nav-button ${activeTab === 'manageReviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manageReviews')}>
                        Manage Reviews
                    </button>
                    <button 
                        className={`admin-nav-button ${activeTab === 'manageGoods' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manageGoods')}>
                         Manage Goods
                    </button>
                </div>
                <div className="admin-content">
                    {getActiveContent()}
                </div>
            </div>
    </div>
);
};

export default AdminPanel;
