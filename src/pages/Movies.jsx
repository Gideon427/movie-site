import { motion } from 'framer-motion';
import './PageStyles.css';

const Movies = () => {
  return (
    <motion.div
      className="page-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h1>Movies</h1>
        <p>
          Explore movies across all genres. Use the search button to find titles or click any movie card from the home page.
        </p>
      </div>
    </motion.div>
  );
};

export default Movies;
