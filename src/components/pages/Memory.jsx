import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './memory.css';
import MemoryCard from '../MemoryCard';

const Memory = () => {
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [flagArray, setFlagArray] = useState([]);
  const limitFlag = [];
  // const [isActive, setIsActive] = useState(false);

  const shuffleArray = (array) => {
    const array2 = array;
    for (let i = array2.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array2[i];
      array2[i] = array2[j];
      array2[j] = temp;
    }
    return array2;
  };

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

      shuffleArray(countryObj);
      const sortedArray = countryObj
        .sort((a, b) => {
          return b.population - a.population;
        })
        .slice(0, 12);
      console.log(countryObj);
      setFlagArray(sortedArray);
    };
    sortedCountry();
  }, [data, playOnce]);

  for (let i = 0; i < 2; i += 1) {
    flagArray.map((el) => limitFlag.push(el));
  }
  shuffleArray(limitFlag);

  return (
    <div className="memoryGameContainer">
      <h1>Score : </h1>
      <div className="flagsCardsContainer">
        {limitFlag.map((country) => (
          <div className="memoryComposant">
            <MemoryCard key={country.name} country={country} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memory;
