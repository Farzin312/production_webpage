import React, { useState } from 'react';
import axios from 'axios';
import './styling/review.css'

const Review = () => {
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!review) {
            setError('Please enter your review.');
            return;
        }
        const reviewData = { email, content: review };

        axios.post(process.env.REACT_APP_REVIEWS_URL, reviewData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log('Review submitted successfully:', response.data);
            alert(`Thank you for your review, ${email}!`);
            setEmail('');
            setReview('');
            setError('');
        })
        .catch(error => {
            console.error('There was an error submitting the review:', error);
            setError('There was an error submitting your review. Please try again.');
        });
    };

    return (
        <div className="review-container">
            <h2>Leave a Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <div>
                    <input
                        className="review-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <textarea
                        className="review-input"
                        placeholder="Review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className="submit-button" type="submit">Submit Review</button>
            </form>
        </div>
    );
};
export default Review;


