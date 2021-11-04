import React from 'react';
import PropTypes from 'prop-types';
import './difficult.css';

const Difficult = ({ setDifficult }) => {
  return (
    <div className="checkDifficult">
      <h2>Difficultés</h2>
      <form>
        <div className="checkBox">
          <label htmlFor="easy">
            <input
              type="radio"
              name="difficult"
              className="radioDifficult"
              id="easy"
              value="easy"
              onChange={(e) => setDifficult(e.target.value)}
            />
            Facile
          </label>
          <label htmlFor="medium">
            <input
              type="radio"
              name="difficult"
              className="radioDifficult"
              id="medium"
              value="medium"
              onChange={(e) => setDifficult(e.target.value)}
            />
            Moyen
          </label>
          <label htmlFor="hard">
            <input
              type="radio"
              name="difficult"
              className="radioDifficult"
              id="hard"
              value="hard"
              onChange={(e) => setDifficult(e.target.value)}
            />
            Difficile
          </label>
        </div>
      </form>
    </div>
  );
};

Difficult.propTypes = {
  setDifficult: PropTypes.func.isRequired,
};

export default Difficult;
