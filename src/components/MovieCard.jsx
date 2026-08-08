import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPlay, FaStar } from 'react-icons/fa';
import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <motion.div
      className="movie-card"
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(movie)}
    >
      <div className="movie-card-poster">
        <img
          src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : '/no-poster.jpg'}
          alt={movie.title}
          loading="lazy"
        />
        {isHovered && (
          <motion.div
            className="movie-card-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="movie-card-info">
              <span className="movie-rating"><FaStar /> {movie.vote_average?.toFixed(1)}</span>
              <span className="movie-year">{movie.release_date?.substring(0, 4)}</span>
            </div>
            <button className="movie-play-btn"><FaPlay /> Play</button>
          </motion.div>
        )}
      </div>
      <h3 className="movie-card-title">{movie.title}</h3>
    </motion.div>
  );
};

export default MovieCard;