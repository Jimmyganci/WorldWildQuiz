import React from 'react';
import PropTypes from 'prop-types';
import './difficult.css';

const Difficult = ({ setDifficult }) => {
  return (
    <div className="checkDifficult">
      <h2>Difficultés</h2>
      <form>
        <div
          className="checkBox"
          onChange={(e) => setDifficult(e.target.value)}
        >
          <label htmlFor="easy">
            <input
              type="radio"
              name="difficult"
              className="radioDifficult"
              id="easy"
              value="easy"
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
              defaultChecked
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
  //   difficult: PropTypes.string.isRequired,
};

export default Difficult;
