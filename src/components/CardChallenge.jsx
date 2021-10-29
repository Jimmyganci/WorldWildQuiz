import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Card = ({ challenge, setChallengeSwitch, setIsHidden }) => {
  const handleValid = () => {
    setIsHidden('quiz');
    setChallengeSwitch(challenge.nameRegion);
  };

  return (
    <div
      className="card"
      onClick={handleValid}
      onKeyDown={handleValid}
      aria-hidden="true"
    >
      <h2>{challenge.nameRegion}</h2>
      <div className="imgQuiz">
        <img src={challenge.image} alt={challenge.nameRegion} />
      </div>
    </div>
  );
};

Card.propTypes = {
  challenge: PropTypes.element.isRequired,
  setChallengeSwitch: PropTypes.element.isRequired,
  setIsHidden: PropTypes.element.isRequired,
};

export default Card;
