import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './memory.css';
import MemoryGrid from '../MemoryGrid';

const Memory = () => {
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [flagArray, setFlagArray] = useState([]);
  const [flagArray2, setFlagArray2] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [finishedItems, setFinishedItems] = useState([]);
  const [timer, setTimer] = useState({ hour: 0, minute: 0, sec: 0 });
  const [startTimer, setStartTimer] = useState(false);
  const limitFlag = [];
  console.log(visibleItems);
  console.log(finishedItems);
  console.log(timer);

  console.log(startTimer);

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

  const sortedCountry = () => {
    const countryObj = Object.keys(data).map((i) => data[i]);

    shuffleArray(countryObj);
    const sortedArray = countryObj
      .sort((a, b) => {
        return b.population - a.population;
      })
      .slice(0, 12);
    setFlagArray(sortedArray);

    for (let i = 0; i < 2; i += 1) {
      flagArray.map((el) => limitFlag.push(el));
    }
    shuffleArray(limitFlag);
    setFlagArray2(limitFlag);
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

    sortedCountry();
  }, [playOnce, data]);

  useEffect(() => {
    const useInterval =
      startTimer &&
      setInterval(() => {
        if (timer.sec > 59) {
          setTimer({
            hour: timer.hour,
            minute: timer.minute + 1,
            sec: 0,
          });
        } else if (timer.minute >= 59 && timer.sec >= 59) {
          setTimer({
            hour: timer.hour + 1,
            minute: 0,
            sec: 0,
          });
        } else {
          setTimer({
            hour: timer.hour,
            minute: timer.minute,
            sec: timer.sec + 1,
          });
        }
      }, 1000);
    return () => {
      clearInterval(useInterval);
    };
  }, [timer, startTimer]);

  const checkItems = (firstIndex, secondIndex) => {
    if (
      firstIndex !== secondIndex &&
      flagArray2[firstIndex].name === flagArray2[secondIndex].name
    ) {
      setFinishedItems([...finishedItems, firstIndex, secondIndex]);
    } else {
      setTimeout(() => {
        setVisibleItems([]);
      }, 1000);
    }
  };

  return (
    <div className="memoryGameContainer">
      <h2 className="timer">
        {timer.hour > 0 ? `${timer.hour} : ` : ''} {timer.minute} : {timer.sec}
      </h2>
      <MemoryGrid
        flagArray2={flagArray2}
        visibleItems={visibleItems}
        setVisibleItems={setVisibleItems}
        checkItems={checkItems}
        finishedItems={finishedItems}
        setStartTimer={setStartTimer}
      />
    </div>
  );
};

export default Memory;
