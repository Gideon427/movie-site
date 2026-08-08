import { motion } from 'framer-motion';
import './PageStyles.css';

const Genres = () => {
  return (
    <motion.div
      className="page-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h1>Genres</h1>
        <p>
          Explore movies and shows by genre. If a genre text is too long, it will break into a second line automatically.
        </p>
      </div>
    </motion.div>
  );
};

export default Genres;
