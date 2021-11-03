import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Card = ({ regions, setRegionSwitch, setIsHidden }) => {
  const handleValid = () => {
    setIsHidden('challenge');
    setRegionSwitch(regions.nameRegion !== 'Monde' ? regions.nameRegion : '');
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
  regions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setRegionSwitch: PropTypes.func.isRequired,
  setIsHidden: PropTypes.func.isRequired,
};

export default Card;
