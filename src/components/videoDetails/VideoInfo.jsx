import React from "react";
import LikeDislikeButtons from "./LikeDislikeButton";
import SubscribeButton from "./SubscribeButton";
import { formatViewCount, formatTimeElapsed} from "../utils/formatter";
import '../../styles/components/videodetails.css';


const VideoInfo = ({ video }) => {
    const[showFullDescription, setShowFullDescription] = React.useState(false);

    const {toggleDescription} = () => {
        setShowFullDescription(!showFullDescription);
    }

    return (
        <div className="video-info-Container">
            <h1 className="video-title">{video.title}</h1>
            <div className="video-metadata">
                <div className="video-stats">
                    <span>{formatViewCount(video.views)} views</span>
                    <span className="dot-separator">•</span>
                    <span>{formatTimeElapsed(video.timestamp)}</span>
                </div>
                <div className="video-action">
                    <LikeDislikeButtons likes={video.likes} dislikes={video.dislikes} />
                </div>
            </div>
            <div className="channel-info">
                <img 
                    src={video.channel.avatar} 
                    alt={video.channel.name} 
                    className="channel-avatar"
                />
                <div className="channel-details">
                    <div className="channel-name">{video.channel.name}</div>
                    <div className="channel-subscribers">
                        {formatViewCount(video.channel.subscribers)} subscribers
                    </div>
                    <SubscribeButton channelName={video.channel.name} />
                </div>
            </div>

            <div className="video-description">
                <p>
                    {showFullDescription 
                        ? video.description 
                        : video.description.slice(0, 200) + (video.description.length > 200 ? '...' : '')
                    }
                </p>
                {video.description.length > 200 && (
                    <button 
                        className="show-more-btn" 
                        onClick={toggleDescription}
                    >
                        {showFullDescription ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>

        </div>
    );
}
export default VideoInfo;