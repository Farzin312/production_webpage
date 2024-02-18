import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './styling/contact.css';

const Contact = () => {
    const phoneNumber = "1 912-576-1399";
    const address = "1371 GA-40, Kingsland, GA";

    return (
        <div className="cont-container">
            <h2>Contact Info</h2>
            <a href={`http://maps.google.com/?q=${address}`} className="cont-link">
                <FontAwesomeIcon icon={faMapMarkerAlt}/> 1371 GA-40<br/>Kingsland, GA<br/>
            </a>
            <a href={`tel:${phoneNumber}`} className="cont-link">
                <FontAwesomeIcon icon={faPhone} /> {phoneNumber}
            </a>
        </div>
    );
}

export default Contact;
