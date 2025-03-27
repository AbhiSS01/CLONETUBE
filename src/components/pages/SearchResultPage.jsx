import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoGrid from '../home/VideoGrid';
import { videos } from '../../data/dummyData';

const SearchResultsPage = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate search functionality with dummy data
        const performSearch = () => {
            setIsLoading(true);
            
            // Simple search logic: check if video title or channel name includes the query
            const results = videos.filter(video => 
                video.title.toLowerCase().includes(query.toLowerCase()) ||
                video.channel.name.toLowerCase().includes(query.toLowerCase())
            );

            setSearchResults(results);
            setIsLoading(false);
        };

        performSearch();
    }, [query]);

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

    return (
        <div className="search-results-page">
            <div className="search-results-header">
                <h2>Search Results for "{query}"</h2>
                <p>{searchResults.length} videos found</p>
            </div>

            {isLoading ? (
                <SkeletonLoader />
            ) : searchResults.length > 0 ? (
                <VideoGrid videos={searchResults} />
            ) : (
                <div className="no-results">
                    <p>No videos found matching your search.</p>
                    <p>Try different keywords or check your spelling.</p>
                </div>
            )}

            <div className="filters-section">
                <h3>Filters</h3>
                <div className="filter-options">
                    <button>Upload Date</button>
                    <button>Type</button>
                    <button>Duration</button>
                    <button>Features</button>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;