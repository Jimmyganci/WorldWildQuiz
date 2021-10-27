import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';

const Card = (props) => {
  const { regions, setRegionSwitch, setIsHidden } = props;

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
  regions: PropTypes.element.isRequired,
  setRegionSwitch: PropTypes.element.isRequired,
  setIsHidden: PropTypes.element.isRequired,
};

export default Card;
