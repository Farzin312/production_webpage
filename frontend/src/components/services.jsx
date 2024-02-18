import React from 'react';
import './styling/services.css';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="services-container">
            <h2>Our Services</h2>
            <ul className="services-list">
                <li><span role="img" aria-label="ATM" className="emoji-icon">🏧</span> ATM</li>
                <li><span role="img" aria-label="Toilet" className="emoji-icon">🚻</span> Restrooms</li>
                <li><span role="img" aria-label="Mobile Payments" className="emoji-icon">📱</span> Mobile Payments</li>
                <li><span role="img" aria-label="Food" className="emoji-icon">🍔</span> Food</li>
            </ul>
            <Link to="/goods" className="more-details-button">See More Details</Link>
        </div>
    );
};

export default Services;
