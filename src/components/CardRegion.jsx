import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Card = ({ regions, setRegionSwitch, setIsHidden }) => {
  const handleValid = () => {
    setIsHidden('challenge');
    setRegionSwitch(regions.nameRegion); // je selectionne mon continent et affiche les challenges
  };

  return (
    <div
      className="card"
      onClick={handleValid}
      onKeyDown={handleValid}
      aria-hidden="true"
    >
      <h2>{regions.nameRegion}</h2>
      <img src={regions.image} alt={regions.nameRegion} />
    </div>
  );
};

Card.propTypes = {
  regions: PropTypes.element.isRequired,
  setRegionSwitch: PropTypes.element.isRequired,
  setIsHidden: PropTypes.element.isRequired,
};

export default Card;
