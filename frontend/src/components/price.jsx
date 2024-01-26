import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';

const GasPrices = () => {
    const boxStyle = {
        backgroundColor: 'white',
        padding: '10px',
        textAlign: 'center',
        borderRadius: '5px',
        color: 'Black',
        position: 'absolute',
        top: '58%',
        left: '-5%',
        width: '50%',
        height: '20%'
    };

    const graphStyle = {
        padding: '10px',
        textAlign: 'left',
        borderRadius: '5px',
        color: 'Black',
        position: 'absolute',
        top: '0%',
        right: '-80%',
        width: '70%',
        height: '20%'
    }
    const [prices, setPrices] = useState({});
    const [plotUrl, setPlotUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchPrices = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:5000/gasprices');
                setPrices(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
    
        fetchPrices();
    }, []);
    useEffect(() => {
        const fetchPrices = async () => {
            try {
                setLoading(true);
                const pricesResponse = await axios.get('http://127.0.0.1:5000/gasprices');
                setPrices(pricesResponse.data);
    
                const plotResponse = await axios.get('http://127.0.0.1:5000/gasprices/plot', { responseType: 'blob' });
                setPlotUrl(URL.createObjectURL(plotResponse.data));
                
                setError(null);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
    
        fetchPrices();
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div style={boxStyle}>
            <h2 style={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faGasPump} /> Fuel
            </h2>
            {Object.entries(prices).map(([fuelType, price], index) => (
                <h3 key={index}>{fuelType}: {price}</h3>
            ))}
            <div style={graphStyle}>
            {plotUrl && <img src={plotUrl} alt="Gas Prices Plot" style={{ width: '100%', height: 'auto' }} />}
            </div>
        </div>
    );
};

export default GasPrices;
