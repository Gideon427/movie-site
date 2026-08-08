import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MovieCarousel from '../components/MovieCarousel';
import './MovieDetail.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const [detailsRes, creditsRes, similarRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
          fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`),
        ]);

        const details = await detailsRes.json();
        const credits = await creditsRes.json();
        const similarData = await similarRes.json();

        setMovie(details);
        setCast(credits.cast?.slice(0, 8) || []);
        setSimilar(similarData.results?.slice(0, 10) || []);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  // Format runtime
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  // Get trailer key
  const getTrailerKey = () => {
    if (movie?.videos?.results) {
      const trailer = movie.videos.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      return trailer?.key;
    }
    return null;
  };

  const handleWatch = () => {
    navigate(`/player/${movie.id}`);
  };

  if (loading) {
    return (
      <div className="movie-detail-loading">
        <div className="skeleton" style={{ height: '70vh' }} />
      </div>
    );
  }

  if (!movie) {
    return <div className="movie-detail-error">Movie not found</div>;
  }

  return (
    <motion.div
      className="movie-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Backdrop background (blurred) */}
      <div
        className="movie-detail-backdrop"
        style={{ backgroundImage: `url(${BACKDROP_URL}${movie.backdrop_path})` }}
      />

      <div className="movie-detail-container">
        <div className="movie-detail-grid">
          {/* Left: Poster + Watch Button */}
          <div className="movie-poster-section">
            <img
              src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : '/no-poster.jpg'}
              alt={movie.title}
              className="movie-poster"
            />
            <button className="btn-primary watch-btn" onClick={handleWatch}>
              ▶ Watch Now
            </button>
            {getTrailerKey() && (
              <button
                className="btn-secondary trailer-btn"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${getTrailerKey()}`, '_blank')}
              >
                📺 Watch Trailer
              </button>
            )}
          </div>

          {/* Right: Details */}
          <div className="movie-info-section">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-meta">
              <span>{movie.release_date?.substring(0, 4)}</span>
              <span>⭐ {movie.vote_average?.toFixed(1)} / 10</span>
              <span>🕐 {formatRuntime(movie.runtime)}</span>
            </div>

            <div className="movie-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>

            <p className="movie-overview">{movie.overview}</p>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="movie-cast">
                <h3>Cast</h3>
                <div className="cast-list">
                  {cast.map((actor) => (
                    <div key={actor.id} className="cast-item">
                      <img
                        src={actor.profile_path ? `${IMG_URL}${actor.profile_path}` : '/no-avatar.jpg'}
                        alt={actor.name}
                      />
                      <span className="cast-name">{actor.name}</span>
                      <span className="cast-character">{actor.character}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You Might Also Like */}
        {similar.length > 0 && (
          <div className="movie-similar">
            <MovieCarousel
              title="🎬 You Might Also Like"
              movies={similar}
              onMovieClick={(movie) => navigate(`/movie/${movie.id}`)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieDetail;