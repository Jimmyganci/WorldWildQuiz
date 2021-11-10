import React from 'react';
import PropTypes from 'prop-types';
import './difficult.css';

const Difficult = ({
  setDifficult,
  playMemoryDifficult,
  setPlayMemoryDifficult,
}) => {
  return (
    <div className="checkDifficult">
      <h2>Difficulties</h2>
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
            Easy
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
            Medium
          </label>
          <label htmlFor="hard">
            <input
              type="radio"
              name="difficult"
              className="radioDifficult"
              id="hard"
              value="hard"
            />
            Hard
          </label>
        </div>
        {playMemoryDifficult && (
          <button
            className="btn"
            onClick={() => setPlayMemoryDifficult(false)}
            type="button"
          >
            Play
          </button>
        )}
      </form>
    </div>
  );
};

Difficult.propTypes = {
  setDifficult: PropTypes.func.isRequired,
  playMemoryDifficult: PropTypes.bool.isRequired,
  setPlayMemoryDifficult: PropTypes.bool.isRequired,
};

export default Difficult;
