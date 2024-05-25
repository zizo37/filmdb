import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingPopup = ({ onRate }) => {
    const [rating, setRating] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const handleRating = (value) => {
        setRating(value);
        onRate(value);
    };

    const handlePopupShow = () => {
        setShowPopup(true);
    };

    const handlePopupHide = () => {
        setShowPopup(false);
    };

    return (
        <div
            onMouseEnter={handlePopupShow}
            onMouseLeave={handlePopupHide}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            <span style={{ color: 'orange', fontSize: '18px' }}>Rate</span>
            {showPopup && (
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    {[...Array(10)].map((_, index) => (
                        <FaStar
                            key={index}
                            color={index < rating ? 'orange' : 'grey'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRating(index + 1)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RatingPopup;