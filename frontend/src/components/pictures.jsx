import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styling/pictures.css'; 

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_PICTURES_URL}`);
                const imageUrls = response.data.slice(0, 6).map(picture => picture.url);
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const openModal = (url) => {
        setSelectedImage(url);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="main-gallery-container">
            <div className="main-thumbnail-container">
                {images.map((url, index) => (
                    <img key={index} src={url} alt={`Thumbnail ${index}`} className="main-thumbnail" onClick={() => openModal(url)} />
                ))}
            </div>
            {isModalOpen && (
                <div className="main-modal" onClick={closeModal}>
                    <div className="main-modal-content" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage} alt="Selected" className="main-full-image" />
                        <span className="main-close-button" onClick={closeModal}>&times;</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
