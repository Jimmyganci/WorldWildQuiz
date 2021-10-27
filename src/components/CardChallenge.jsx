import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';

const Card = (props) => {
  const { challenge, setChallengeSwitch, setIsHidden } = props;

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
      <img src={challenge.image} alt={challenge.nameRegion} />
    </div>
  );
};

Card.propTypes = {
  challenge: PropTypes.element.isRequired,
  setChallengeSwitch: PropTypes.element.isRequired,
  setIsHidden: PropTypes.element.isRequired,
};

export default Card;
