import React, { useState, useEffect } from 'react';
import '../../styles/components/shorts.css';

// Mock data for shorts - replace with actual API call
const mockShorts = [
    {
        id: 1,
        title: 'Life Hacks',
        creator: 'Its Divya',
        views: '1.2M',
        likes: '85K',
        videoUrl: 'https://www.youtube.com/shorts/AG9lPKc11WE',
        thumbnailUrl: 'https://templates.simplified.co/usetldr/296463/thumb/87b2ae41-7f4a-45a4-ba73-e20e69dc4eb3.jpg'
    },
    {
        id: 2,
        title: 'Quick Cooking Hack',
        creator: 'Chef Express',
        views: '500K',
        likes: '45K',
        videoUrl: 'path/to/video2',
        thumbnailUrl: 'path/to/thumbnail2'
    },
    // Add more shorts
];

const ShortsPage = () => {
    const [shorts, setShorts] = useState([]);
    const [currentShort, setCurrentShort] = useState(0);

    useEffect(() => {
        // Simulate fetching shorts
        setShorts(mockShorts);
    }, []);

    const handleNextShort = () => {
        setCurrentShort((prev) => 
            prev < shorts.length - 1 ? prev + 1 : 0
        );
    };

    const handlePreviousShort = () => {
        setCurrentShort((prev) => 
            prev > 0 ? prev - 1 : shorts.length - 1
        );
    };

    const handleLike = (shortId) => {
        // Implement like functionality
        console.log(`Liked short ${shortId}`);
    };

    const handleComment = (shortId) => {
        // Implement comment functionality
        console.log(`Comment on short ${shortId}`);
    };

    if (shorts.length === 0) {
        return <div>Loading shorts...</div>;
    }

    const currentShortData = shorts[currentShort];

    return (
        <div className="shorts-container">
            <div className="shorts-video-container">
                {/* Video Placeholder - Replace with actual video component */}
                <div className="shorts-video-placeholder">
                    <img 
                        src={currentShortData.thumbnailUrl} 
                        alt={currentShortData.title} 
                        className="shorts-video-thumbnail"
                    />
                </div>

                <div className="shorts-navigation">
                    <button 
                        className="shorts-nav-btn prev-btn"
                        onClick={handlePreviousShort}
                    >
                        ▲
                    </button>
                    <button 
                        className="shorts-nav-btn next-btn"
                        onClick={handleNextShort}
                    >
                        ▼
                    </button>
                </div>

                <div className="shorts-video-info">
                    <h3>{currentShortData.title}</h3>
                    <p>{currentShortData.creator}</p>
                </div>

                <div className="shorts-actions">
                    <button 
                        className="shorts-action-btn like-btn"
                        onClick={() => handleLike(currentShortData.id)}
                    >
                        👍 {currentShortData.likes}
                    </button>
                    <button 
                        className="shorts-action-btn comment-btn"
                        onClick={() => handleComment(currentShortData.id)}
                    >
                        💬
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShortsPage;