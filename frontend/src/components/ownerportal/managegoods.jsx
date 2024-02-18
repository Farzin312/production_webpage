import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/managegoods.css';

const ManageGoods = () => {
    const [goods, setGoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newGood, setNewGood] = useState({ name: '', price: '' });
    const [suggestions, setSuggestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;


    useEffect(() => {
        fetchGoods();
    }, []);

    const fetchGoods = async () => {
        const response = await axios.get(process.env.REACT_APP_GOODS_URL);
        setGoods(response.data);
    };

    const handleAddGood = async (e) => {
        e.preventDefault();
        await axios.post(process.env.REACT_APP_GOODS_URL, newGood);
        fetchGoods();
        setNewGood({ name: '', price: '' });
    };

    const handleDeleteGood = async (goodId) => {
        await axios.delete(`${process.env.REACT_APP_GOODS_URL}/${goodId}`);
        fetchGoods();
    };

    const handleEditGood = async (e, goodId) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await axios.put(`${process.env.REACT_APP_GOODS_URL}/${goodId}`, {
            name: formData.get('name'),
            price: formData.get('price'),
        });
        fetchGoods();
    };

    const filteredGoods = goods.filter(good =>
        good.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

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
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredGoods.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPageNumbers = Math.ceil(filteredGoods.length / itemsPerPage);


    return (
        <div className="mg-container">
            <h2>Manage Goods</h2>
            <form onSubmit={handleAddGood} className="mg-add-form">
                <input 
                    type="text" 
                    placeholder="Item Name" 
                    value={newGood.name}
                    onChange={(e) => setNewGood({ ...newGood, name: e.target.value })}
                    className="mg-input-field"
                    required
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={newGood.price}
                    onChange={(e) => setNewGood({ ...newGood, price: e.target.value })}
                    className="mg-input-field"
                    required
                />
                <button type="submit" className="mg-submit-btn">Add Item</button>
            </form>
            <div className="mg-search-container">
                <input 
                    type="text" 
                    placeholder="Search items..." 
                    value={searchTerm}
                    onChange={updateSearchTermAndSuggestions}
                    className="mg-search-input"
                />
                {suggestions.length > 0 && (
                    <ul className="mg-suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => {
                                setSearchTerm(suggestion);
                                setSuggestions([]);
                            }}>{suggestion}</li>
                        ))}
                    </ul>
                )}
            </div>
            <ul className="mg-goods-list">
                {currentItems.map(good => (
                    <li key={good.id} className="mg-good-item">
                        <form onSubmit={(e) => handleEditGood(e, good.id)} className="mg-edit-form">
                            <input 
                                type="text" 
                                defaultValue={good.name} 
                                name="name" 
                                className="mg-input-field"
                                required
                            />
                            <input 
                                type="number" 
                                defaultValue={good.price} 
                                name="price" 
                                className="mg-input-field"
                                required
                            />
                                                        <button type="submit" className="mg-update-btn">Update</button>
                        </form>
                        <button onClick={() => handleDeleteGood(good.id)} className="mg-delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
            <div className="mg-pagination">
                {[...Array(totalPageNumbers)].map((_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => paginate(index + 1)} 
                        className={`mg-page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ManageGoods;
