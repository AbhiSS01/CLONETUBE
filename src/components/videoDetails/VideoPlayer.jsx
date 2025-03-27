import React from "react";

const VideoPlayer = ({ video }) => {
    return (
        <div className="video-player-container">
            <video 
                className="video-player" 
                controls 
                src={video.videoUrl}
                poster={video.image}>
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
export default VideoPlayer;