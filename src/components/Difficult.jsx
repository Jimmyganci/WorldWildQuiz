import PropTypes from 'prop-types';
import './difficult.css';

const Difficult = ({ setDifficult }) => {
  return (
    <div className="checkDifficult">
      <h2>Difficulty</h2>
      <form>
        <div className="checkBox">
          <label htmlFor="difficulty">
            Easy
            <input
              type="range"
              min="1"
              max="3"
              step="1"
              onChange={(e) => setDifficult(e.target.value)}
            />
            Hard
          </label>
        </div>
      </form>
      <p>Medium</p>
    </div>
  );
};

Difficult.propTypes = {
  setDifficult: PropTypes.func.isRequired,
};

export default Difficult;
