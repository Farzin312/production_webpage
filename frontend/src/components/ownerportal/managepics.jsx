import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styling/managepics.css'; 

const PictureManager = () => {
    const [pictures, setPictures] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetch(process.env.REACT_APP_PICTURES_URL)
            .then(response => response.json())
            .then(data => setPictures(data));
    }, []);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAddPicture = () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post(process.env.REACT_APP_PICTURES_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            setPictures([...pictures, response.data]);
            setSelectedFile(null);
            setErrorMessage('');
        })
        .catch(error => {
            setErrorMessage('An error occurred. Please try again.');
            console.error('Error:', error);
        });
    };

    const handleDeletePicture = (pictureId) => {
        axios.delete(`${process.env.REACT_APP_PICTURES_URL}/${pictureId}`)
        .then(() => {
            setPictures(pictures.filter(picture => picture.id !== pictureId));
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="mp-manager">
            <h2>Add or Remove Pictures</h2>
            {errorMessage && <div className="mp-error-message">{errorMessage}</div>}
            <div className="mp-list">
                {pictures.map(picture => (
                    <div key={picture.id} className="mp-item">
                        <img src={picture.url} alt="Uploaded" />
                        <button onClick={() => handleDeletePicture(picture.id)} className="mp-delete-button">Delete</button>
                    </div>
                ))}
            </div>
            <div className="mp-upload-container">
                <input type="file" onChange={handleFileSelect} className="mp-input" disabled={pictures.length >= 6} />
                <div className="mp-file-info">{selectedFile ? selectedFile.name : "No file chosen"}</div>
                {pictures.length < 6 && <button onClick={handleAddPicture} className="mp-add-button">Add Picture</button>}
            </div>
        </div>
    );
};

export default PictureManager;
