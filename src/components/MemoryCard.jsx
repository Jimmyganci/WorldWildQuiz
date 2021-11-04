import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './memoryCard.css';

const MemoryCard = ({ country }) => {
  const [isActive, setIsActive] = useState(false);
  const [flagValue, setFlagValue] = useState([]);
  const handleToggle = () => {
    let result = [];
    result = { flag: country.flag };
    setIsActive(true);
    setFlagValue([...flagValue, result]);
  };
  console.log(flagValue);

  return (
    <div
      className={
        isActive
          ? 'activeFlagCard containerImagesMemory'
          : 'containerImagesMemory'
      }
      onClick={handleToggle}
      onKeyDown={handleToggle}
      aria-hidden="true"
    >
      <img className="flagCard" src={country.flag} alt={country.name} />
    </div>
  );
};

MemoryCard.propTypes = {
  country: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default MemoryCard;
