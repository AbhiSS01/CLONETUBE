import React from 'react';
import { Link } from 'react-router-dom';
import { videos } from '../../data/dummyData';
import { formatTimeElapsed, formatViewCount } from '../utils/formatter';

const RelatedVideos = ({ currentVideoId }) => {
    const relatedVideos = videos
        .filter(video => video.id !== currentVideoId)
        .slice(0, 10);

    return (
        <div className="related-videos-container">
            {relatedVideos.map(video => (
                <Link 
                    to={`/video/${video.id}`} 
                    key={video.id} 
                    className="related-video-item"
                >
                    <div className="related-video-thumbnail">
                        <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="related-video-image"
                        />
                        <span className="video-duration">{video.duration}</span>
                    </div>
                    <div className="related-video-details">
                        <h4 className="related-video-title">{video.title}</h4>
                        <div className="related-video-metadata">
                            <span>{video.channel.name}</span>
                            <span className="dot-separator">•</span>
                            <span>{formatViewCount(video.views)} views</span>
                            <span className="dot-separator">•</span>
                            <span>{formatTimeElapsed(video.timestamp)}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RelatedVideos;