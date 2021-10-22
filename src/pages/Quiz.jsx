import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Answers from '../components/Answers';
import Questions from '../components/Questions';

const Quiz = () => {
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  const [sliceVal1, setSliceVal1] = useState(0);
  const [sliceVal2, setSliceVal2] = useState(1);

  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          'https://restcountries.com/v2/all?fields=name,capital,currencies,flag,population,region'
        )
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        });
    }
    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });
      setSortedData(sortedArray);
    };
    sortedCountry();
  }, [data, playOnce]);

  const answersRandom = sortedData
    .filter((country) => country.region.includes('Europe'))
    .slice(sliceVal1, sliceVal2 + 3);

  const nextQuestion = () => {
    setSliceVal1(sliceVal1 + 1);
    setSliceVal2(sliceVal2 + 1);
  };

  //   const shuffleArray = (array) => {
  //     let i = array.length - 1;
  //     for (; i > 0; i -= 1) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       const temp = array[i];
  //       array[i] = array[j];
  //       array[j] = temp;
  //     }
  //     return array;
  //   };
  //   shuffleArray(answersRandom);

  return (
    <div className="quizContainer">
      <ul className="quizGame">
        {sortedData
          .filter((country) => country.region.includes('Europe'))
          .slice(sliceVal1, sliceVal2)
          .map((country) => (
            <Questions
              country={country}
              key={country.name}
              nbQuestion={sliceVal1}
            />
          ))}
      </ul>
      <ul className="answers">
        {answersRandom.map((country) => (
          <Answers country={country} key={country.name} />
        ))}
      </ul>

      <button type="button" onClick={nextQuestion}>
        Suivant
      </button>
    </div>
  );
};

export default Quiz;
