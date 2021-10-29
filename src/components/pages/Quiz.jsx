import React, { useEffect, useState } from 'react';
import axios from 'axios';
import challenge from '../../challenge';
import CardRegion from '../CardRegion';
import CardChallenge from '../CardChallenge';
import Answers from '../Answers';
import Questions from '../Questions';
import regions from '../../regions';
import './quizgame.css';
import ResultQuiz from '../ResultQuiz';

const Quiz = () => {
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true); // gere l'appel API pour eviter l'appel en boucle
  const [sortedData, setSortedData] = useState([]);
  const [sliceVal1, setSliceVal1] = useState(0);
  const [sliceVal2, setSliceVal2] = useState(1);
  const [countQuestion, setCountQuestion] = useState(0);
  const [regionSwitch, setRegionSwitch] = useState('');
  const [challengeSwitch, setChallengeSwitch] = useState('');
  const [isHidden, setIsHidden] = useState('region');
  const [total, setTotal] = useState(1);
  const [resultAnswer, setResultAnswer] = useState([]); // affiche la réponse selectionné
  const [resultQuestion, setResultQuestion] = useState([]); // affiche l'objet de la question affiché
  const [capitalQuestion, setCapitalQuestion] = useState(''); // affiche l'objet selectionné de la question
  const [showResponse, setShowResponse] = useState([]);
  const arrayLength = sortedData.length;

  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          `https://restcountries.com/v2/all?fields=name,capital,translations,flag,population,region`
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
      if (
        resultAnswer === capitalQuestion.capital ||
        resultAnswer === capitalQuestion.flag
      ) {
        setTotal(total + 1);
      } else {
        let result = [];
        result = {
          name: capitalQuestion.name,
          translation: capitalQuestion.translations,
          capital: capitalQuestion.capital,
          answer: resultAnswer,
          flag: capitalQuestion.flag,
        };
        setShowResponse([...showResponse, result]);
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
              setResultAnswer={setResultAnswer}
            />
          ))}
        </ul>
      </div>
      <div
        className="resultQuizContainer"
        id={isHidden === 'result' ? '' : 'hidden'}
      >
        <ResultQuiz
          total={total}
          key={capitalQuestion.name}
          showResponse={showResponse}
          challengeSwitch={challengeSwitch}
        />
      </div>
    </div>
  );
};

export default Quiz;
