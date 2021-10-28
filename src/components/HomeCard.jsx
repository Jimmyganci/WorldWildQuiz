import React from 'react';
import PropTypes from 'prop-types';
import '../styles/homecard.css';

import './gameType';

const HomeCard = (props) => {
  const { gameType } = props;

  return (
    <div className="homecard">
      <h2>{gameType.name}</h2>
      <img src={gameType.image} alt={gameType.name} />
    </div>
  );
};

HomeCard.propTypes = {
  gameType: PropTypes.element.isRequired,
};

export default HomeCard;
