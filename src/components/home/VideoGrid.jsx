import React from "react";
import VideoCard from "./VideoCard";
import { videos } from "../../data/dummyData";
import '../../styles/components/videogrid.css';

const VideoGrid = ({ videos, title }) => {
    //console.log("Videos in VideoGrid: ", videos);
    console.log("timestamp: ", videos.timestamp);


    return (
        <div className="video-grid-container">
            {/* {title && <h2 className="section-title">{title}</h2>} */}
            <div className="video-grid">
                {videos.map(videos => (
                <VideoCard key={videos.id} video={videos} />
                ))}
            </div>
        </div>
    );
}
export default VideoGrid;