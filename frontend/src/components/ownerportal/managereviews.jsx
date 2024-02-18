import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/managereviews.css'; 

const ReviewManager = () => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(4); 
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        return axios.get(`${process.env.REACT_APP_REVIEWS_URL}`) 
            .then(response => {
                const sortedReviews = response.data.sort((a, b) => b.id - a.id);
                setReviews(sortedReviews);
            })
            .catch(error => console.error("There was an error fetching the reviews: ", error));
    };
    

    const handleDeleteReview = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            axios.delete(`${process.env.REACT_APP_REVIEWS_URL}/${reviewId}`)
                .then(() => {
                    fetchReviews();
                })
                .catch(error => console.error("There was an error deleting the review: ", error));
        }
    };

    const renderFullReview = review => (
        <div className="full-review-section">
            <p><strong>Email:</strong> {review.email}</p>
            <p><strong>Review:</strong> {review.content}</p>
            <button onClick={() => setSelectedReviewId(null)} className="manage-close-button">Back</button>
        </div>
    );

    const renderReviewContent = (content, id) => {
        const contentPreview = content.substring(0, 20);
        return id === selectedReviewId ? content : `${contentPreview}${content.length > 20 ? '...' : ''}`;
    };

    const lastReviewIndex = currentPage * reviewsPerPage;
    const firstReviewIndex = lastReviewIndex - reviewsPerPage;
    const currentReviews = reviews.slice(firstReviewIndex, lastReviewIndex);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const changePage = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="rm-manager-container">
            <h2>Customer Reviews</h2>
            {selectedReviewId ? reviews.filter(review => review.id === selectedReviewId).map(review => (
                <div className="rm-full-section">
                    <p><strong>Email:</strong> {review.email}</p>
                    <p><strong>Review:</strong> {review.content}</p>
                    <button onClick={() => setSelectedReviewId(null)} className="rm-close-button">Back</button>
                </div>
            )) : (
                <div>
                    {currentReviews.map(review => (
                        <div key={review.id} className="rm-item">
                            <p><strong>Email:</strong> {review.email}</p>
                            <p onClick={() => setSelectedReviewId(review.id)} className="rm-item-preview">
                                <strong>Review:</strong> {renderReviewContent(review.content, review.id)}
                            </p>
                            <button onClick={() => handleDeleteReview(review.id)} className="rm-delete-button">Delete</button>
                        </div>
                    ))}
                </div>
            )}
            <div className="rm-pagination-controls">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => changePage(index + 1)} className={`rm-page-button ${currentPage === index + 1 ? 'active' : ''}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
    
};

export default ReviewManager;
