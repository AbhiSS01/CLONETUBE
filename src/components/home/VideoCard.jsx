import React from "react";
import { Link } from "react-router-dom";
import '../../styles/components/videocard.css';
import { formatTimeElapsed, formatViewCount } from "../utils/formatter";
import '../../styles/components/videocard.css';



function VideoCard({ video }) {
    const { id, title, channel, thumbnail, views, timestamp, duration } = video;
    return (
        <div className="video-card">
            <Link to={`/video/${id}`} className="video-thumbnail-container">
                <img src={thumbnail || 'https://upload.wikimedia.org/wikipedia/commons/0/08/Ori_crop_320_x_180_looking_SW.JPG'} alt={title} className="video-thumbnail" width="320" height="180" />
                <span className="video-duration">{duration}</span>
            </Link>
            <div className="video-info">
                <Link to={`/channel/${channel.name}`} className="channel-avatar">
                    <img src={channel.avatar} alt={channel.name} />
                </Link>
                <div className="video-details">
                    <Link to={`/video/${id}`} className="video-title">
                        {title}
                    </Link>
                    <Link to={`/channel/${channel.name}`} className="channel-name">
                        {channel.name}
                    </Link>
                    <div className="video-stats">
                        <span>{formatViewCount(views)} views</span>
                        <span className="dot-separator">•</span>
                        <span>{formatTimeElapsed(timestamp)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default VideoCard;