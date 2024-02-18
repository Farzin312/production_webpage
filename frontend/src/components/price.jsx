import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './styling/price.css'; 

const GasPrices = () => {
    const [allPrices, setAllPrices] = useState([]);
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const pricesResponse = await axios.get('http://127.0.0.1:5000/gasprices');
                setPrices(pricesResponse.data);
                const allPricesResponse = await axios.get('http://127.0.0.1:5000/all_gas_prices');
                setAllPrices(allPricesResponse.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    const calculatePercentageChange = (currentPrice, previousPrice) => {
        if (!previousPrice) return null;
        return ((currentPrice - previousPrice) / previousPrice) * 100;
    };

    const renderPriceWithChange = (fuelType, price, index) => {
        let previousPrice = null;
        for (let i = index + 1; i < allPrices.length; i++) {
            if (allPrices[i][fuelType] !== undefined) {
                previousPrice = allPrices[i][fuelType];
                console.log(`Previous price for ${fuelType}: ${previousPrice}`);
                break;
            }
        }
    
        const percentageChange = calculatePercentageChange(price, previousPrice);
        let priceChangeIcon = null;
        let priceChangeText = '';
    
        if (percentageChange !== null && percentageChange !== 0) {
            const isPriceUp = percentageChange > 0;
            priceChangeIcon = (
                <FontAwesomeIcon
                    icon={isPriceUp ? faArrowUp : faArrowDown}
                    style={{ color: isPriceUp ? 'green' : 'red', marginLeft: '5px' }}
                />
            );
            priceChangeText = `(${isPriceUp ? '+' : ''}${percentageChange.toFixed(2)}%)`;
        }
    
        return (
            <h3 key={index}>
                {fuelType}: ${price.toFixed(2)} {priceChangeIcon} {priceChangeText}
            </h3>
        );
    };
    
      
    const showAllPrices = () => {
        navigate('/all_prices'); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div className="gas-prices-container"> 
            <h2 className="gas-prices-title">
                <FontAwesomeIcon icon={faGasPump} /> Fuel Prices
            </h2>
            {Object.entries(prices).map(([fuelType, price], index) => 
                renderPriceWithChange(fuelType, price, index)
            )}
            <button onClick={showAllPrices} className="view-all-button">
                View All Prices 
            </button>
        </div>
    );
};

export default GasPrices;
