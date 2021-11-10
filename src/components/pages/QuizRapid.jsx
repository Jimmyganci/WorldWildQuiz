import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Difficult from '../Difficult';
import Answers from '../Answers';
import Questions from '../Questions';
import './quiz.css';
import ResultQuiz from '../ResultQuiz';

const QuizRapid = () => {
  const [data, setData] = useState([]); // recupère le premier tableau de l'appel api
  const [playOnce, setPlayOnce] = useState(true); // gere l'appel API pour eviter l'appel en boucle
  const [sortedData, setSortedData] = useState([]); // tableau de l'appel api trié par ordre de population
  const [sliceVal1, setSliceVal1] = useState(0); // sliceVal1 et 2 incrementent le slice pour me permettre d'afficher les questions une par une
  const [sliceVal2, setSliceVal2] = useState(1);
  const [countQuestion, setCountQuestion] = useState(0); // j'enregistre le nombre de question au click pour les afficher
  const [isHidden, setIsHidden] = useState('difficult'); // permet d'afficher ou non un composant
  const [total, setTotal] = useState(1); // permet de récupérer le score du jeu
  const [resultAnswer, setResultAnswer] = useState([]); // affiche la réponse selectionné
  const [resultQuestion, setResultQuestion] = useState([]); // affiche l'objet de la question affiché
  const [capitalQuestion, setCapitalQuestion] = useState(''); // affiche l'objet selectionné de la question
  const [showResponse, setShowResponse] = useState([]); // récupère un tableau de réponses érronées
  const [difficult, setDifficult] = useState('medium'); // récupère la difficultée
  const arrayLength = sortedData.length;
  const [challengeSwitch, setChallengeSwitch] = useState('Capital');
  const randomNumber = Math.floor(Math.random() * 10);

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
    const sortedArray = countryObj.sort((a, b) => {
      // permet d'appliquer une difficultée au jeu
      return b.population - a.population;
    });

    if (difficult === 'easy') {
      setSortedData(sortedArray.slice(0, 33));
    } else if (difficult === 'medium') {
      setSortedData(sortedArray.slice(100, 133));
    } else if (difficult === 'hard') {
      setSortedData(sortedArray.slice(210, 243));
    } else {
      setSortedData(sortedArray);
    }
  };

  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          `https://restcountries.com/v2/all?fields=name,capital,translations,flag,population`
        )
        .then((res) => {
          setData(res.data);
          console.log(data[0]);
          setPlayOnce(false);
        });
    }
    sortedCountry();
  }, [data, playOnce, difficult]);

  useEffect(() => {
    setChallengeSwitch(randomNumber % 2 === 0 ? 'Capital' : 'Drapeaux');
  }, [randomNumber, challengeSwitch]);

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
    <div>
      <h2>Rapid quiz</h2>
      <div className="divquizrapid">
        <div
          className="containerDifficult"
          id={isHidden === 'difficult' ? '' : 'hidden'}
        >
          <Difficult setDifficult={setDifficult} difficult={difficult} />
          <button
            type="button"
            className="btn"
            onClick={() => setIsHidden('quizRapid')}
          >
            Play
          </button>
        </div>

        <div className="quizMain" id={isHidden === 'quizRapid' ? '' : 'hidden'}>
          <ul className="quizGame">
            {sortedData.slice(sliceVal1, sliceVal2).map((country) => (
              <Questions
                country={country}
                key={country.name}
                nbQuestion={sliceVal1}
                arrayLength={arrayLength}
                setResultQuestion={setResultQuestion}
                challengeSwitch={challengeSwitch}
              />
            ))}
          </ul>
          <ul className="answers">
            {answerRandom.map((country) => (
              <Answers
                country={country}
                key={country.name}
                nextQuestion={nextQuestion}
                setResultAnswer={setResultAnswer}
                challengeSwitch={challengeSwitch}
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
    </div>
  );
};

export default QuizRapid;
