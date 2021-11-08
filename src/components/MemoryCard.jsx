import React from 'react';
import PropTypes from 'prop-types';
import './memoryCard.css';

const MemoryCard = ({ country, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      aria-hidden="true"
      className={className}
    >
      <img className="flagCard" src={country.flag} alt={country.name} />
    </div>
  );
};

MemoryCard.propTypes = {
  country: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default MemoryCard;
