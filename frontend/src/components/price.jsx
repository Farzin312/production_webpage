import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';

const GasPrices = () => {
    const boxStyle = {
        backgroundColor: 'grey',
        padding: '10px',
        textAlign: 'left',
        borderRadius: '5px',
        color: 'Black',
        position: 'absolute',
        top: '58%',
        left: '1%',
        width: '60%',
        height: '35%'
    };
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/gasprices');
                setPrices(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchPrices();
    }, []);

    return (
        <div style={boxStyle}>
            <h2 style={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faGasPump} /> Fuel
            </h2>
            {Object.entries(prices).map(([fuelType, price], index) => (
                <p key={index}>{fuelType}: {price}</p>
            ))}
        </div>
    );
};

export default GasPrices;
