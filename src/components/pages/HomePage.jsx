import React, { useEffect, useState } from "react";
import VideoGrid from "../../components/home/VideoGrid";
import { videos } from '../../data/dummyData';
import '../../styles/components/homepage.css';

const HomePage = () => {
    const [videoCategories, setVideoCategories] = useState({
        trending: [],
        subscriptions: [],
        // history: [],
        // music: [],
        // gaming: [],
        // news: [],
    });
    //console.log("Video Categories: ", videoCategories);

    
    const [trending, setTrending] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const [history, setHistory] = useState([])
    const [music, setMusic] = useState([])
    const [gaming, setGaming] = useState([])
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchVideos = async () => {
            setIsLoading(true);
            setTimeout(() => {
                setVideoCategories({
                    trending: videos,
                    subscriptions: videos,
                    // history: videos,
                    // music: videos,
                    // gaming: videos,
                    // news: videos,
                });
                setIsLoading(false);
            }, 1000);
        };
        fetchVideos();
    }, []);
    
    const SkeletonLoader = ({ count = 8 }) => (
        <div className="skeleton-loader">
            {Array(count).fill().map((_, index) => (
                <div key={index} className="skeleton-card">
                    <div className="skeleton-thumbnail"></div>
                    <div className="skeleton-info">
                        <div className="skeleton-avatar"></div>
                        <div className="skeleton-details">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-channel"></div>
                            <div className="skeleton-stats"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    const categoryTitles = {
        trending: "Trending",
        subscriptions: "Subscriptions",
        history: "History",
        music: "Music",
        gaming: "Gaming",
        news: "News",
    };
    

    return (
        <div className="home-page">
            {isLoading ? (
                <SkeletonLoader />
            ) : videoCategories && Object.keys(videoCategories).length > 0 ? ( // Ensure videoCategories is defined and not empty
                Object.entries(videoCategories).map(([key, videoList]) => (
                    <VideoGrid key={key} videos={videoList} title={categoryTitles[key]} />
                ))
            ) : (
                <div>No videos available</div> // Optional: display something when there are no videos
            )}
        </div>
    );
}
export default HomePage;