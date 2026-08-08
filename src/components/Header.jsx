import { Link } from 'react-router-dom';
import { FaFilm, FaSearch, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
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
  );
};

export default Header;