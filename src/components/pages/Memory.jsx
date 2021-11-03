import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './memory.css';
import MemoryCard from '../MemoryCard';

const Memory = () => {
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [flagArray, setFlagArray] = useState([]);
  const limitFlag = [];
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (playOnce) {
      axios
        .get('https://restcountries.com/v2/all?fields=flag,name')
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        });
    }
    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj
        .sort((a, b) => {
          return b.population - a.population;
        })
        .slice(0, 12);
      setFlagArray(sortedArray);
    };
    sortedCountry();
  }, [data, playOnce]);

  for (let i = 0; i < 2; i += 1) {
    flagArray.map((el) => limitFlag.push(el));
  }

  const handleToggle = () => {
    setIsActive(true);
    console.log(isActive);
  };

  return (
    <div className="flagsCardsContainer">
      {limitFlag.map((country) => (
        <div className={isActive ? 'activeFlagCard' : 'flagCard'}>
          <MemoryCard
            key={country.name}
            country={country}
            handleToggle={handleToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default Memory;
