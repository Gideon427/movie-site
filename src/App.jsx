import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './styles/globals.css';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Player from './pages/Player';
import Search from './pages/Search';
import { FaFilm, FaSearch, FaUser } from 'react-icons/fa';
import './App.css';

// This is the main App component with navigation
function AppContent() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="app">
      {/* Sticky Header */}
      <header className="app-header">
            <div className="header-container">
              <div className="header-left">
                <Link to="/" className="logo">
                  <FaFilm /> MovieSite
                </Link>
                <nav className="header-nav">
                  <Link to="/">Home</Link>
                  <Link to="/movies">Movies</Link>
                  <Link to="/series">Series</Link>
                  <Link to="/genres">Genres</Link>
                </nav>
              </div>
              <div className="header-right">
                <Link to="/search" className="search-icon">
                  <FaSearch />
                </Link>
                <button className="profile-btn">
                  <FaUser />
                </button>
              </div>
            </div>
          </header>

      <main>
        <Routes>
          <Route path="/" element={<Home onMovieSelect={handleMovieSelect} />} />
          <Route path="/movie/:id" element={<MovieDetail movie={selectedMovie} />} />
          <Route path="/player/:id" element={<Player movie={selectedMovie} />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;