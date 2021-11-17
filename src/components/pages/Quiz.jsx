import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Difficult from '../Difficult';
import challenge from '../../challenge';
import CardRegion from '../CardRegion';
import CardChallenge from '../CardChallenge';
import Answers from '../Answers';
import Questions from '../Questions';
import regions from '../../regions';
import './quiz.css';
import ResultQuiz from '../ResultQuiz';

const Quiz = ({ setShowPresentation, setShowLogin }) => {
  const [data, setData] = useState([]); // recupère le premier tableau de l'appel api
  const [playOnce, setPlayOnce] = useState(true); // gere l'appel API pour eviter l'appel en boucle
  const [sortedData, setSortedData] = useState([]); // tableau de l'appel api trié par ordre de population
  const [sliceVal1, setSliceVal1] = useState(0); // sliceVal1 et 2 incrementent le slice pour me permettre d'afficher les questions une par une
  const [sliceVal2, setSliceVal2] = useState(1);
  const [countQuestion, setCountQuestion] = useState(0); // j'enregistre le nombre de question au click pour les afficher
  const [regionSwitch, setRegionSwitch] = useState(''); // je récupère la valeur du continent ou se déroule le quiz
  const [challengeSwitch, setChallengeSwitch] = useState(''); // je récupère la valeur du challenge ou se déroule le quiz
  const [isHidden, setIsHidden] = useState('region'); // permet d'afficher ou non un composant
  const [total, setTotal] = useState(1); // permet de récupérer le score du jeu
  const [resultAnswer, setResultAnswer] = useState([]); // affiche la réponse selectionné
  const [resultQuestion, setResultQuestion] = useState([]); // affiche l'objet de la question affiché
  const [capitalQuestion, setCapitalQuestion] = useState(''); // affiche l'objet selectionné de la question
  const [showResponse, setShowResponse] = useState([]); // récupère un tableau de réponses érronées
  const [difficult, setDifficult] = useState('2'); // récupère un tableau de réponses érronées
  const arrayLength = sortedData.length;

  useEffect(() => {
    setShowPresentation(false);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/login/').then((res) => console.log(res));
  }, []);

  // Applique un random sur les tableaux en parametre
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
    const sortedArray = countryObj
      .filter((country) =>
        country.region.includes(regionSwitch !== 'World' ? regionSwitch : '')
      ) // je filtre mon tableau par ordre de population décroissant
      .sort((a, b) => {
        // permet d'appliquer une difficulté au jeu
        return b.population - a.population;
      });

    if (difficult === '1' && regionSwitch === 'World') {
      setSortedData(sortedArray.slice(0, 33));
    } else if (difficult === '2' && regionSwitch === 'World') {
      setSortedData(sortedArray.slice(100, 133));
    } else if (difficult === '3' && regionSwitch === 'World') {
      setSortedData(sortedArray.slice(210, 243));
    } else {
      setSortedData(sortedArray);
    }
  };

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

    sortedCountry();

    return () => {};
  }, [data, playOnce, regionSwitch, difficult]);

  const answerRandom = sortedData.slice(sliceVal1, sliceVal2 + 3);
  shuffleArray(answerRandom);

  const nextQuestion = () => {
    setCountQuestion(countQuestion + 1);
    setCapitalQuestion(resultQuestion);
    if (countQuestion < arrayLength - 4) {
      // si le nombre de click et inferieure à la lg du tableau - 4, je compare les résultats
      if (
        resultAnswer === capitalQuestion.capital ||
        resultAnswer === capitalQuestion.flag
      ) {
        setTotal(total + 1);
      } else {
        let result = []; // créer un nouveau tableau que j'ajoute dans mon state showResponse pour afficher la correction
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
      setSliceVal2(sliceVal2 + 1); // je passe à la question suivante
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
      <div
        className="containerDifficult"
        id={
          isHidden === 'challenge' && regionSwitch === 'World' ? '' : 'hidden'
        }
      >
        <Difficult setDifficult={setDifficult} difficult={difficult} />
      </div>
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
          arrayLength={arrayLength}
          setShowLogin={setShowLogin}
          setIsHidden={setIsHidden}
        />
      </div>

      {/* Button pour changer de continent, de challenge ou pour recommencer le jeu */}
      <div className="restartContainer">
        <button
          className="btn"
          id={
            isHidden === 'challenge' ||
            isHidden === 'quiz' ||
            isHidden === 'result'
              ? ''
              : 'hidden'
          }
          type="button"
          onClick={() => {
            setShowResponse([]);
            setTotal(0);
            setIsHidden('region');
            setSliceVal1(0);
            setSliceVal2(1);
            setCountQuestion(0);
          }}
        >
          Change Region
        </button>
        <button
          className="btn"
          id={isHidden === 'result' || isHidden === 'quiz' ? '' : 'hidden'}
          type="button"
          onClick={() => {
            setShowResponse([]);
            setTotal(0);
            setIsHidden('challenge');
            setSliceVal1(0);
            setSliceVal2(1);
            setCountQuestion(0);
          }}
        >
          Change Challenge
        </button>
        <button
          className="btn"
          id={isHidden === 'result' || isHidden === 'quiz' ? '' : 'hidden'}
          type="button"
          onClick={() => {
            setShowResponse([]);
            setTotal(0);
            setIsHidden('quiz');
            setSliceVal1(0);
            setSliceVal2(1);
            setCountQuestion(0);
          }}
        >
          Restart this Game
        </button>
      </div>
    </div>
  );
};

Quiz.propTypes = {
  setShowPresentation: PropTypes.func.isRequired,
  setShowLogin: PropTypes.func.isRequired,
};
export default Quiz;
