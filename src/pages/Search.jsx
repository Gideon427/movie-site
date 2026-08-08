import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes, FaStar, FaClock } from 'react-icons/fa';
import './Search.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`
      );
      const data = await res.json();
      setResults(data.results || []);

      // Save to recent searches
      if (searchQuery.trim()) {
        const updated = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <motion.div
      className="search-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="search-container">
        <h1 className="search-title">What do you want to watch?</h1>

        {/* Big Search Bar */}
        <div className="search-bar-wrapper">
  <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search movies, TV shows, actors..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
            autoFocus
          />
          {query && (
    <button className="search-clear" onClick={clearSearch}>
      <FaTimes />
    </button>
  )}
</div>

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <div className="recent-searches">
            <h3>Recent Searches</h3>
            <div className="recent-tags">
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  className="recent-tag"
                  onClick={() => {
                    setQuery(term);
                    handleSearch(term);
                  }}
                >
                 <FaSearch /> {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {loading && (
          <div className="search-loading">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '280px', borderRadius: '10px' }} />
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="search-results">
            <p className="results-count">Found {results.length} results</p>
            <div className="results-grid">
              {results.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="result-card"
                  onClick={() => handleMovieClick(movie)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {movie.poster_path ? (
                    <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
                  ) : (
                    <div className="no-poster">No poster</div>
                  )}
                  <div className="result-info">
                    <h4>{movie.title}</h4>
                    <p>{movie.release_date?.substring(0, 4) || 'N/A'}</p>
                    <span><FaStar />{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="no-results">
            <h2>😕 No results found</h2>
            <p>Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;