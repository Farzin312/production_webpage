import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {

    const phoneNumber = "1 912-576-1399";
    const address = "1371 GA-40, Kingsland, GA";

    const boxStyle = {
        backgroundColor: 'rgba(169, 169, 169, 0.0)',
        padding: '10px',
        textAlign: 'center',
        borderRadius: '5px',
        color: 'black',
        position: 'absolute',
        top: '82%',
        left: '5%',
        width: '30%',
    };

    const linkStyle = {
        color: 'black',
        textdecoration: 'none',

    }
    return (
        <div style={boxStyle}>
            <h2>Contact Info</h2>
            <a href={`http://maps.google.com/?q=${address}`} style={linkStyle}>
                <FontAwesomeIcon icon={faMapMarkerAlt}/> 1371 GA-40<br/>Kingsland, GA<br/>
            </a>
            <a href={`tel:${phoneNumber}`} style={linkStyle}>
                <FontAwesomeIcon icon={faPhone} /> {phoneNumber}
            </a>
        </div>
    );
}

export default Contact;