import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaStar, FaFilm, FaCalendarAlt } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';
import MovieCarousel from '../components/MovieCarousel';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const Home = ({ onMovieSelect }) => {
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularRes, trendingRes, topRes, upcomingRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`),
          fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`),
          fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`),
        ]);

        const popularData = await popularRes.json();
        const trendingData = await trendingRes.json();
        const topData = await topRes.json();
        const upcomingData = await upcomingRes.json();

        setPopular(popularData.results || []);
        setTrending(trendingData.results || []);
        setTopRated(topData.results || []);
        setUpcoming(upcomingData.results || []);

        // Hero movies: take top 5 from trending (or fallback to popular)
        const heroSource =
          trendingData.results?.length > 0
            ? trendingData.results
            : popularData.results;
        setHeroMovies(heroSource.slice(0, 5) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: '200px', marginBottom: '20px' }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Slideshow */}
      <HeroSection movies={heroMovies} onPlay={onMovieSelect} />

      {/* Movie Carousels with Icons */}
      <div className="container">
        <MovieCarousel
          title={
            <span>
              <FaFire style={{ color: '#e50914', marginRight: '8px' }} />
              Trending Now
            </span>
          }
          movies={trending}
          onMovieClick={onMovieSelect}
        />

        <MovieCarousel
          title={
            <span>
              <FaStar style={{ color: '#f5c518', marginRight: '8px' }} />
              Top Rated
            </span>
          }
          movies={topRated}
          onMovieClick={onMovieSelect}
        />

        <MovieCarousel
          title={
            <span>
              <FaFilm style={{ color: '#e50914', marginRight: '8px' }} />
              Popular
            </span>
          }
          movies={popular}
          onMovieClick={onMovieSelect}
        />

        <MovieCarousel
          title={
            <span>
              <FaCalendarAlt style={{ color: '#4fc3f7', marginRight: '8px' }} />
              Upcoming
            </span>
          }
          movies={upcoming}
          onMovieClick={onMovieSelect}
        />
      </div>
    </motion.div>
  );
};

export default Home;