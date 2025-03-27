import React from 'react';
import { Link } from 'react-router-dom';
import { videos } from '../../data/dummyData';
import '../../styles/components/searchsuggestion.css';


const SearchSuggestions = ({ query, onSuggestionClick }) => {
    // Filter suggestions based on the query
    const suggestions = videos
        .filter(video => 
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.channel.name.toLowerCase().includes(query.toLowerCase())
        )
        // Limit to top 5 suggestions
        .slice(0, 5);

    if (query.trim() === '' || suggestions.length === 0) {
        return null;
    }

    return (
        <div className="search-suggestions">
            {suggestions.map(video => (
                <Link 
                    key={video.id} 
                    to={`/video/${video.id}`} 
                    className="suggestion-item"
                    onClick={() => onSuggestionClick(video.title)}
                >
                    <div className="suggestion-thumbnail">
                        <img src={video.thumbnail} alt={video.title} />
                    </div>
                    <div className="suggestion-details">
                        <p className="suggestion-title">{video.title}</p>
                        <p className="suggestion-channel">{video.channel.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SearchSuggestions;