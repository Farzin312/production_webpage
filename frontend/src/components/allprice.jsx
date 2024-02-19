import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './styling/allprice.css'; 

const AllPrices = () => {
    const [allPrices, setAllPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchAllPrices = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_ALL_GAS_URL);
                setAllPrices(response.data);
            } catch (error) {
                console.error('Error fetching all prices: ', error);
                setError('Failed to fetch all prices');
            } finally {
                setLoading(false);
            }
        };

        fetchAllPrices();
    }, []);

    if (loading) return <div className="allp-loading">Loading...</div>;
    if (error) return <div className="allp-error">Error: {error}</div>;

    return (
        <div className="allp-container">
            <button onClick={() => navigate('/')} className="allp-back-homepage-btn">
                Back to Homepage
            </button>
            <h2>All Fuel Prices</h2>
            <ul className="allp-prices-list">
                {allPrices.map((price, index) => (
                    <li key={index} className="allp-price-item">
                        Regular: ${price.Regular}, Premium: ${price.Premium}, Diesel: ${price.Diesel} - Date: {new Date(price.Date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllPrices;
