import { useState, useEffect } from 'react';
import axios from 'axios';
import './memory.css';
import { Link } from 'react-router-dom';
import Register from '../Register';
import Difficult from '../Difficult';
import MemoryGrid from '../MemoryGrid';
import '../../style.css';

const Memory = () => {
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [flagArray, setFlagArray] = useState([]);
  const [flagArray2, setFlagArray2] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [finishedItems, setFinishedItems] = useState([]);
  const [timer, setTimer] = useState({ hour: 0, minute: 0, sec: 0 });
  const [startTimer, setStartTimer] = useState(false);
  const [winner, setWinner] = useState(false);
  const [difficult, setDifficult] = useState('2');
  const [playMemoryDifficult, setPlayMemoryDifficult] = useState(true); // affiche le bouton play dans le composant memory
  const [isHiddenRegister, setIsHiddenRegister] = useState(false); // affiche ou non le modal pour s'enregistrer
  const limitFlag = [];
  console.log(difficult);
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
    const sortedArray = countryObj.sort((a, b) => {
      return b.population - a.population;
    });

    // Affichage d'un tableau de cartes plus ou moins grand selon la difficulté choisie
    if (difficult === '1') {
      /* difficult === 'easy' */
      setFlagArray(sortedArray.slice(0, 6));
    } else if (difficult === '2') {
      /* difficult === 'medium' */
      setFlagArray(sortedArray.slice(0, 12));
    } else if (difficult === '3') {
      /* difficult === 'hard' */
      setFlagArray(sortedArray.slice(0, 18));
    } else {
      setFlagArray(sortedArray.slice(0, 12));
    }

    for (let i = 0; i < 2; i += 1) {
      flagArray.map((el) => limitFlag.push(el));
    }
    shuffleArray(limitFlag);
    setFlagArray2(limitFlag);
    setPlayOnce(false);
  };

  // appel API
  useEffect(() => {
    if (playOnce) {
      axios
        .get('https://restcountries.com/v2/all?fields=flag,name')
        .then((res) => {
          setData(res.data);
        });
    }

    sortedCountry();
  }, [playOnce, data, winner, difficult, playMemoryDifficult]);

  // Timer
  useEffect(() => {
    const useInterval =
      !winner &&
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

  // Fin de la partie (joueur a gagné)
  useEffect(() => {
    if (
      finishedItems.length > 0 &&
      finishedItems.length === flagArray2.length
    ) {
      setWinner(true);
    }
  }, [finishedItems]);

  // Logique du jeu
  const checkItems = (firstIndex, secondIndex) => {
    if (
      firstIndex !== secondIndex &&
      flagArray2[firstIndex].name === flagArray2[secondIndex].name
    ) {
      setFinishedItems([...finishedItems, firstIndex, secondIndex]);
    } else {
      setTimeout(() => {
        setVisibleItems([]);
      }, 600);
    }
  };

  const handleCloseRegister = () => {
    setIsHiddenRegister(!isHiddenRegister);
  };

  return (
    <div className={`memoryGameContainer ${winner && 'screenBlack'}`}>
      <div
        className={`memoryDifficult ${playMemoryDifficult ? '' : 'isHidden'}`}
      >
        <Difficult
          difficult={difficult}
          setDifficult={setDifficult}
          playMemoryDifficult={playMemoryDifficult}
          setPlayMemoryDifficult={setPlayMemoryDifficult}
        />
        <button
          className="btn"
          id="btnDifficultMemory"
          onClick={() => setPlayMemoryDifficult(false)}
          type="button"
        >
          Play
        </button>
      </div>
      {!playMemoryDifficult && (
        <>
          <div className="memoryGameHeadButtons">
            <h2 className="timer">
              {timer.hour > 0 ? `${timer.hour} : ` : ''} {timer.minute} :{' '}
              {timer.sec}
            </h2>

            <div className="restartMemoryButtons">
              <button
                type="button"
                className="btn"
                id="restartBtn"
                onClick={() => {
                  setVisibleItems([]);
                  setFinishedItems([]);
                  setWinner(false);
                  setStartTimer(false);
                  setTimer({ hour: 0, minute: 0, sec: 0 });
                }}
              >
                <span>Restart game</span>
              </button>

              <button
                type="button"
                className="btn"
                id="difficultyBtn"
                onClick={() => {
                  setVisibleItems([]);
                  setFinishedItems([]);
                  setWinner(false);
                  setStartTimer(false);
                  setTimer({ hour: 0, minute: 0, sec: 0 });
                  setPlayMemoryDifficult(true);
                }}
              >
                <span>Change difficulty</span>
              </button>
            </div>
          </div>

          <MemoryGrid
            flagArray2={flagArray2}
            visibleItems={visibleItems}
            setVisibleItems={setVisibleItems}
            checkItems={checkItems}
            finishedItems={finishedItems}
            setStartTimer={setStartTimer}
          />
        </>
      )}
      {winner && (
        <div className="winnerModal">
          <p>You Win !</p>
          <br />
          <p>
            Finished in {timer.hour > 0 ? `${timer.hour} : ` : ''}{' '}
            {timer.minute} : {timer.sec} seconds
          </p>
          <div className="containerBtnMemory">
            <button
              type="button"
              className="btn"
              id="restartBtn"
              onClick={() => {
                setVisibleItems([]);
                setFinishedItems([]);
                setWinner(false);
                setStartTimer(false);
                setTimer({ hour: 0, minute: 0, sec: 0 });
              }}
            >
              <span>Restart game</span>
            </button>
            <button
              type="button"
              className="btn"
              id="difficultyBtn"
              onClick={() => {
                setVisibleItems([]);
                setFinishedItems([]);
                setWinner(false);
                setStartTimer(false);
                setTimer({ hour: 0, minute: 0, sec: 0 });
                setPlayMemoryDifficult(true);
              }}
            >
              <span>Change difficulty</span>
            </button>
          </div>

          <Link exact to="/">
            <button type="button" className="btn" id="returnHome">
              Home
            </button>
          </Link>

          <button
            className="noThanks"
            type="button"
            onClick={handleCloseRegister}
          >
            {isHiddenRegister ? 'Register my Score' : 'Not register my score'}
          </button>
        </div>
      )}

      {winner && (
        <Register
          timer={timer}
          setIsHiddenRegister={setIsHiddenRegister}
          isHiddenRegister={isHiddenRegister}
          handleCloseRegister={handleCloseRegister}
        />
      )}
    </div>
  );
};

export default Memory;
