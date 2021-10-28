import React, { useEffect, useState } from 'react';
import axios from 'axios';
import challenge from '../components/challenge';
import CardRegion from '../components/CardRegion';
import CardChallenge from '../components/CardChallenge';
import Answers from '../components/Answers';
import Questions from '../components/Questions';
import regions from '../components/regions';
import '../styles/quizgame.css';
import ResultQuiz from '../components/ResultQuiz';

const Quiz = () => {
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  const [sliceVal1, setSliceVal1] = useState(0);
  const [sliceVal2, setSliceVal2] = useState(1);
  const [countQuestion, setCountQuestion] = useState(0);
  const [regionSwitch, setRegionSwitch] = useState('');
  const [challengeSwitch, setChallengeSwitch] = useState('');
  const [isHidden, setIsHidden] = useState('region');
  const [result, setResult] = useState([]);
  const [resultQuestion, setResultQuestion] = useState([]);
  const [total, setTotal] = useState(1);
  const [capitalQuestion, setCapitalQuestion] = useState('');
  console.log(total);
  console.log(result);
  console.log(resultQuestion);
  console.log(capitalQuestion);

  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          `https://restcountries.com/v2/all?fields=name,capital,currencies,flag,population,region`
        )
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        });
    }
    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj
        .filter((country) => country.region.includes(regionSwitch))
        .sort((a, b) => {
          return b.population - a.population;
        });

      setSortedData(sortedArray);
    };
    sortedCountry();
  }, [data, playOnce, regionSwitch]);

  const arrayLength = sortedData.length;

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

  const answerRandom = sortedData.slice(sliceVal1, sliceVal2 + 3);

  shuffleArray(answerRandom);

  const nextQuestion = () => {
    setCountQuestion(countQuestion + 1);
    setCapitalQuestion(resultQuestion);
    if (countQuestion < arrayLength - 4) {
      if (result === capitalQuestion) {
        setTotal(total + 1);
      }
      setSliceVal1(sliceVal1 + 1);
      setSliceVal2(sliceVal2 + 1);
    } else {
      setTotal(total + 1);
      setIsHidden('result');
    }
  };

  return (
    <div className="quizContainer">
      <ul className="choiceRegions" id={isHidden === 'region' ? '' : 'hidden'}>
        {regions.map((region) => (
          <CardRegion
            regions={region}
            key={region.nameRegion}
            setRegionSwitch={setRegionSwitch}
            setIsHidden={setIsHidden}
          />
        ))}
      </ul>
      <ul
        className="choiceChallenge"
        id={isHidden === 'challenge' ? '' : 'hidden'}
      >
        {challenge.map((el) => (
          <CardChallenge
            challenge={el}
            key={el.nameRegion}
            setChallengeSwitch={setChallengeSwitch}
            setIsHidden={setIsHidden}
          />
        ))}
      </ul>
      <div className="quizMain" id={isHidden === 'quiz' ? '' : 'hidden'}>
        <ul className="quizGame">
          {sortedData.slice(sliceVal1, sliceVal2).map((country) => (
            <Questions
              country={country}
              key={country.name}
              nbQuestion={sliceVal1}
              arrayLength={arrayLength}
              challengeSwitch={challengeSwitch}
              setResultQuestion={setResultQuestion}
            />
          ))}
        </ul>
        <ul className="answers">
          {answerRandom.map((country) => (
            <Answers
              country={country}
              key={country.name}
              nextQuestion={nextQuestion}
              challengeSwitch={challengeSwitch}
              setResult={setResult}
            />
          ))}
        </ul>
      </div>
      <div className="resultQuiz" id={isHidden === 'result' ? '' : 'hidden'}>
        <ResultQuiz total={total} />
      </div>
    </div>
  );
};

export default Quiz;
