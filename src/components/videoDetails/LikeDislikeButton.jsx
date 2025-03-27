import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { formatViewCount } from '../utils/formatter';
import '../../styles/components/likedislikebutton.css';    

const LikeDislikeButtons = ({ likes, dislikes }) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [dislikeCount, setDislikeCount] = useState(dislikes);
    const [userAction, setUserAction] = useState(null);

    const handleLike = () => {
        if (userAction === 'like') {
            setLikeCount(likeCount - 1);
            setUserAction(null);
        } else if (userAction === 'dislike') {
            setDislikeCount(dislikeCount + 1);
            setLikeCount(likeCount + 1);
            setUserAction('like');
        } else {
            setLikeCount(likeCount + 1);
            setUserAction('like');
        }
    };

    const handleDislike = () => {
        if (userAction === 'dislike') {
            setDislikeCount(dislikeCount - 1);
            setUserAction(null);
        } else if (userAction === 'like') {
            setLikeCount(likeCount - 1);
            setDislikeCount(dislikeCount + 1);
            setUserAction('dislike');
        } else {
            setDislikeCount(dislikeCount + 1);
            setUserAction('dislike');
        }
    };

    return (
        <div className="like-dislike-buttons">
            <button 
                className={`like-btn ${userAction === 'like' ? 'active' : ''}`} 
                onClick={handleLike}
            >
                <FaThumbsUp />
                <span>{formatViewCount(likeCount)}</span>
            </button>
            <button 
                className={`dislike-btn ${userAction === 'dislike' ? 'active' : ''}`} 
                onClick={handleDislike}
            >
                <FaThumbsDown />
                <span>{formatViewCount(dislikeCount)}</span>
            </button>
        </div>
    );
};

export default LikeDislikeButtons;