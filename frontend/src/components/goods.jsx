import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './styling/goods.css'; 

const Goods = () => {
    const [goods, setGoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        fetchGoods();
    }, []);

    const fetchGoods = async () => {
        const response = await axios.get(process.env.REACT_APP_GOODS_URL);
        setGoods(response.data);
    };

    const updateSearchTermAndSuggestions = (e) => {
        const input = e.target.value;
        setSearchTerm(input);
    
        if (input.trim().length > 0) {
            const matchedSuggestions = goods.filter(good =>
                good.name.toLowerCase().includes(input.trim().toLowerCase())
            ).map(good => good.name); 
            setSuggestions(matchedSuggestions.slice(0, 5)); 
        } else {
            setSuggestions([]); 
        }
    };

    const selectSuggestion = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = goods
        .filter(good => good.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
        .slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(goods.length / itemsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="goods-actual-container">
            <h2>Our Products</h2>
            <div className="goods-search-container">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={updateSearchTermAndSuggestions}
                    className="goods-search-input"
                />
                {suggestions.length > 0 && (
                    <ul className="goods-suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => selectSuggestion(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ul className="goods-list">
                {currentItems.map(good => (
                    <li key={good.id} className="goods-item">
                        <span>{good.name}</span> - <span>${good.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <button className="goods-back-btn" onClick={() => navigate('/')}>
                Back to Homepage
            </button>
        </div>
    );
};

export default Goods;
