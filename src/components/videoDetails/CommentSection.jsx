import React, { useState } from 'react';
import { comments } from '../../data/dummyComments';
import { FaThumbsUp, FaReply, FaUserCircle } from 'react-icons/fa';
import { formatTimeElapsed } from '../utils/formatter';
import '../../styles/components/commentsection.css';

const CommentSection = ({ videoId }) => {
    const [newComment, setNewComment] = useState('');
    const [videoComments, setVideoComments] = useState(comments[videoId] || []);
    const [activeCommentId, setActiveCommentId] = useState(null);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const comment = {
                id: Date.now().toString(),
                user: {
                    name: 'Abhijit Sahoo',
                    avatar: 'https://yt3.ggpht.com/yti/ANjgQV8rV5BrlAiiqVcBySmk1VyP3W0m9V-sixQqvp0SDnlrFKY=s108-c-k-c0x00ffffff-no-rj'
                },
                text: newComment,
                likes: 0,
                replies: [],
                timestamp: new Date().toISOString()
            };
            setVideoComments([comment, ...videoComments]);
            setNewComment('');
        }
    };

    const CommentItem = ({ comment, isReply = false }) => {
        const [likes, setLikes] = useState(comment.likes);
        const [userAction, setUserAction] = useState(null);
        const [showReplyInput, setShowReplyInput] = useState(false);
        const [replyText, setReplyText] = useState('');

        const handleLike = () => {
            if (userAction === 'like') {
                setLikes(likes - 1);
                setUserAction(null);
            } else {
                setLikes(likes + 1);
                setUserAction('like');
            }
        };

        const handleReplySubmit = (e) => {
            e.preventDefault();
            if (replyText.trim()) {
                const reply = {
                    id: Date.now().toString(),
                    user: {
                        name: 'Abhijit Sahoo',
                        avatar: 'https://yt3.ggpht.com/yti/ANjgQV8rV5BrlAiiqVcBySmk1VyP3W0m9V-sixQqvp0SDnlrFKY=s108-c-k-c0x00ffffff-no-rj'
                    },
                    text: replyText,
                    likes: 0,
                    timestamp: new Date().toISOString()
                };
                
                // Update the comment with the new reply
                const updatedComments = videoComments.map(c => 
                    c.id === comment.id 
                    ? { ...c, replies: c.replies ? [reply, ...c.replies] : [reply] }
                    : c
                );
                
                setVideoComments(updatedComments);
                setReplyText('');
                setShowReplyInput(false);
            }
        };

        return (
            <div className={`comment-wrapper ${isReply ? 'reply-comment' : ''}`}>
                <div className="comment-content-wrapper">
                    {comment.user.avatar ? (
                        <img 
                            src={comment.user.avatar} 
                            alt={comment.user.name} 
                            className="comment-avatar"
                        />
                    ) : (
                        <FaUserCircle className="comment-avatar-icon" />
                    )}
                    <div className="comment-content">
                        <div className="comment-header">
                            <span className="comment-username">{comment.user.name}</span>
                            <span className="comment-timestamp">
                                {formatTimeElapsed(comment.timestamp)}
                            </span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <div className="comment-actions">
                            <button 
                                className={`btn-like ${userAction === 'like' ? 'active' : ''}`}
                                onClick={handleLike}
                            >
                                <FaThumbsUp />
                                <span>{likes > 0 ? likes : ''}</span>
                            </button>
                            <button 
                                className="btn-reply"
                                onClick={() => setShowReplyInput(!showReplyInput)}
                            >
                                <FaReply /> Reply
                            </button>
                        </div>
                        
                        {/* Reply Input */}
                        {showReplyInput && (
                            <form 
                                className="reply-form" 
                                onSubmit={handleReplySubmit}
                            >
                                <input 
                                    type="text"
                                    placeholder="Add a reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="form-control"
                                />
                                <div className="reply-form-actions">
                                    <button 
                                        type="button" 
                                        className="btn btn-link"
                                        onClick={() => setShowReplyInput(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={!replyText.trim()}
                                    >
                                        Reply
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="comment-replies">
                        {comment.replies.map(reply => (
                            <CommentItem 
                                key={reply.id} 
                                comment={reply} 
                                isReply={true} 
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="comments-section">
            <div className="comments-header">
                <h3>{videoComments.length} Comments</h3>
                <div className="comments-sort-dropdown">
                    <select className="form-select">
                        <option>Sort by Top comments</option>
                        <option>Newest first</option>
                    </select>
                </div>
            </div>
            
            {/* Comment Input */}
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <div className="comment-input-wrapper">
                    {/* User Avatar */}
                    <img 
                        src="https://yt3.ggpht.com/yti/ANjgQV8rV5BrlAiiqVcBySmk1VyP3W0m9V-sixQqvp0SDnlrFKY=s108-c-k-c0x00ffffff-no-rj" 
                        alt="Abhijit Sahoo" 
                        className="user-avatar"
                    />
                    
                    {/* Comment Input */}
                    <input 
                        type="text" 
                        className="form-control comment-input"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </div>
                
                {/* Comment Form Actions */}
                <div className="comment-form-actions">
                    <button 
                        type="button" 
                        className="btn btn-link cancel-btn"
                        onClick={() => setNewComment('')}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary submit-btn" 
                        disabled={!newComment.trim()}
                    >
                        Comment
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="comments-list">
                {videoComments && videoComments.length > 0 ? (
                    videoComments.map(comment => (
                        comment && comment.id ? (
                            <CommentItem 
                                key={comment.id} 
                                comment={comment} 
                            />
                        ) : null
                    ))
                ) : (
                    <p>No comments yet</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;