import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExpand } from 'react-icons/fa';
import './Player.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [id]);

  // Fullscreen handler
  const handleFullscreen = () => {
    const elem = playerRef.current;
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  if (!movie) {
    return <div className="player-loading">Loading...</div>;
  }

  return (
    <div className="player-page">
      {/* Minimal header */}
      <header className="player-header">
        <button className="player-back" onClick={() => navigate(`/movie/${id}`)}>
          <FaArrowLeft />
        </button>
        <h2>{movie.title}</h2>
        <button className="player-fullscreen" onClick={handleFullscreen}>
          <FaExpand />
        </button>
      </header>

      {/* Video Player */}
      <div className="player-container" ref={playerRef}>
        <iframe
          src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title={movie.title}
          referrerPolicy="origin"
          allow="downloads"
        />
      </div>

      {/* Up Next placeholder */}
      <div className="player-upnext">
        <h3>Up Next</h3>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default Player;