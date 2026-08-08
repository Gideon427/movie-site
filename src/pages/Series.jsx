import { motion } from 'framer-motion';
import './PageStyles.css';

const Series = () => {
  return (
    <motion.div
      className="page-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h1>Series</h1>
        <p>
          Browse popular series and discover new shows. Use the search page to explore more titles.
        </p>
      </div>
    </motion.div>
  );
};

export default Series;
