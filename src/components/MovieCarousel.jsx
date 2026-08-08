import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';
import 'swiper/css';
import 'swiper/css/navigation';
import './MovieCarousel.css';

const MovieCarousel = ({ title, movies, onMovieClick }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-carousel">
      <div className="carousel-header">
        <h2>{title}</h2>
        <button className="carousel-view-all">
          View All <FaChevronRight />
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={2.5}
        breakpoints={{
          640: { slidesPerView: 3.5 },
          768: { slidesPerView: 4.5 },
          1024: { slidesPerView: 5.5 },
          1280: { slidesPerView: 6.5 },
        }}
        className="carousel-swiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} onClick={onMovieClick} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;