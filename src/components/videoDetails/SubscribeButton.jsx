import React, { useState } from 'react';

const SubscribeButton = ({ channelName }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    };

    return (
        <button 
            className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`} 
            onClick={handleSubscribe}
        >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    );
};

export default SubscribeButton;