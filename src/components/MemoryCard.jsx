import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */

const MemoryCard = ({ country, handleToggle }) => {
  return (
    <img
      height="200"
      width="200"
      src={country.flag}
      alt={country.name}
      onClick={handleToggle}
    />
  );
};

MemoryCard.propTypes = {
  country: PropTypes.element.isRequired,
  handleToggle: PropTypes.element.isRequired,
};

export default MemoryCard;
/* eslint-enable */
