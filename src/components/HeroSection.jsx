import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaInfoCircle } from 'react-icons/fa'; // We'll install react-icons later
import './HeroSection.css';

const HeroSection = ({ movies = [], onPlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [movies.length]);

  // If no movies, show placeholder
  if (!movies.length) return null;

  const movie = movies[currentIndex];
  const IMG_URL = 'https://image.tmdb.org/t/p/original';

  return (
    <div className="hero-section">
      {/* Background image with blur and gradient overlay */}
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${IMG_URL}${movie.backdrop_path})` }}
      />

      {/* Slide content with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">{movie.title}</h1>
          <div className="hero-meta">
            <span>{movie.release_date?.substring(0, 4)}</span>
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          </div>
          <p className="hero-overview">{movie.overview?.slice(0, 160)}...</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => onPlay(movie)}>
              <FaPlay /> Watch Now
            </button>
            <button className="btn-secondary" onClick={() => onPlay(movie)}>
              <FaInfoCircle /> More Info
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators (dots) */}
      <div className="hero-indicators">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;