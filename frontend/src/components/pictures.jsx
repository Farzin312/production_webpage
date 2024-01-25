import React, {useState} from 'react';
import { myImage, myImage1, myImage2, myImage3, myImage4, myImage5, myImage6, myImage7, myImage8, myImage9 } from '../assets/images.js';

const ToggleImages = () => {
    
    const images = [myImage, myImage1, myImage2, myImage3, myImage4, myImage5, myImage6, myImage7, myImage8, myImage9];
    const [currentImage, setCurrentImage] = useState(images[0]);
    
    const [showArrows, setShowArrows] = useState(false);

    const handleMouseEnter = () => setShowArrows(true);
    const handleMouseLeave = () => setShowArrows(false);
    
    const picture = {
        position: 'relative',
        backgroundImage: `url(${currentImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        width: '100%', 
        height: '45vh', 
        display: 'top-left', 
        justifyContent: 'center', 
        alignItems: 'center', 
    };

    const changeImage = (direction) => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex = direction === 'right'
            ? (currentIndex + 1) % images.length
            : (currentIndex - 1 + images.length) % images.length;
        setCurrentImage(images[nextIndex]);
    };
    
    const Arrow = ({ direction, onClick }) => (
        <div onClick={onClick} style={direction === 'left' ? leftArrowStyle : rightArrowStyle}>
            {direction === 'left' ? '<' : '>'}
        </div>
    );
    
    const Indicator = ({ isActive }) => (
        <span style={{ ...indicatorStyle, opacity: isActive ? 1 : 0.5 }}></span>
    );
    
    const arrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '24px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: '10px',
        borderRadius: '50%',
        zIndex: 15, 
        opacity: showArrows ? 1 : 0,
        transition: 'opacity 0.3s',
    };

    const leftArrowStyle = {
        ...arrowStyle,
        left: '10px',
    };

    const rightArrowStyle = {
        ...arrowStyle,
        right: '10px'
    };

    const indicatorStyle = {
        height: '15px',
        width: '15px',
        borderRadius: '50%',
        display: 'inline-block',
        margin: '5px',
        backgroundColor: 'white',
        zIndex: 15,
    };

    const indicatorContainerStyle = {
        position: 'absolute',
        bottom: '20px',
        right: '20px',
    };

    return (
        <div style={picture} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Arrow direction="left" onClick={() => changeImage('left')} />
            <Arrow direction="right" onClick={() => changeImage('right')} />

            <div style={indicatorContainerStyle}>
                {images.map((img, index) => (
                    <Indicator key={index} isActive={img === currentImage} />
                ))}
            </div>
        </div>
    );
};

export default ToggleImages;
