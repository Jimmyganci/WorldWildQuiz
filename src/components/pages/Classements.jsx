import axios from 'axios';
import { useEffect, useState } from 'react';
import './classement.css';

const Classements = () => {
  const [playOnce, setPlayOnce] = useState(true);
  const [dataBase, setDataBase] = useState([]); // variable d'état du resultat de l'appel a la BDD
  const [challengeFilter, setChallengeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [pseudoFilter, setPseudoFilter] = useState('');
  const [scoreFilter, setScoreFilter] = useState('');
  const [selectGame, setSelectGame] = useState('Quiz');
  useEffect(() => {
    let url = `https://worldwildquiz.herokuapp.com/api/score/?game_type=${selectGame}`;

    if (challengeFilter) {
      url += `&game=${challengeFilter}`;
    }

    if (regionFilter) {
      url += `&region=${regionFilter}`;
    }

    if (scoreFilter) {
      url += `&score=${scoreFilter}`;
    }
    if (pseudoFilter) {
      url += `&pseudo=${pseudoFilter}`;
    }
    if (playOnce) {
      axios.get(url).then((res) => {
        setDataBase(res.data);
        setPlayOnce(false);
      });
    }
  }, [
    dataBase,
    challengeFilter,
    regionFilter,
    scoreFilter,
    pseudoFilter,
    selectGame,
  ]);

  const handleFilterChallenge = (e) => {
    setPlayOnce(true);
    setChallengeFilter(e.target.value);
  };
  const handleFilterRegion = (e) => {
    setPlayOnce(true);
    setRegionFilter(e.target.value);
  };
  const handleFilterScore = (e) => {
    setPlayOnce(true);
    setScoreFilter(e.target.value);
  };
  const handleFilterPseudo = (e) => {
    setChallengeFilter('');
    setRegionFilter('');
    setScoreFilter('');
    setPlayOnce(true);
    setPseudoFilter(e.target.value);
  };

  return (
    <div className="classement">
      <h1>Classements </h1>
      <div className="containerHeadeClassement">
        <ul className="containerBtnClassement">
          <li>
            <button
              onClick={() => {
                setChallengeFilter('');
                setRegionFilter('');
                setScoreFilter('');
                setPlayOnce(true);
                setSelectGame('Quiz');
              }}
              type="button"
              className={`btn btnClassement left ${
                selectGame === 'Quiz' ? 'selectGameType' : ''
              } `}
            >
              Quiz
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setChallengeFilter('');
                setRegionFilter('');
                setScoreFilter('');
                setPlayOnce(true);
                setSelectGame('Memory');
              }}
              type="button"
              className={`btn btnClassement middle ${
                selectGame === 'Memory' ? 'selectGameType' : ''
              } `}
            >
              Memory
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setChallengeFilter('');
                setRegionFilter('');
                setScoreFilter('');
                setPlayOnce(true);
                setSelectGame('Rapid Quiz');
              }}
              type="button"
              className={`btn btnClassement right ${
                selectGame === 'Rapid Quiz' ? 'selectGameType' : ''
              } `}
            >
              Rapid Quiz
            </button>
          </li>
        </ul>
        <ul
          className={`headClassement ${
            selectGame === 'Memory' && 'gridColOne'
          }`}
        >
          <label htmlFor="pseudo">
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              placeholder="search a pseudo..."
              onChange={handleFilterPseudo}
              className="inpt"
            />
          </label>
          {selectGame !== 'Memory' && (
            <div
              id="challenge"
              onChange={handleFilterChallenge}
              value={challengeFilter}
              className="switch"
            >
              <label htmlFor="drapeaux" className="switch__label">
                Flags
                <input
                  type="radio"
                  name="switch"
                  id="drapeaux"
                  value="drapeaux"
                />
              </label>
              <label htmlFor="all" className="switch__label">
                All
                <input
                  type="radio"
                  name="switch"
                  id="all"
                  value=""
                  defaultChecked
                />
              </label>
              <label htmlFor="capital" className="switch__label">
                Capital
                <input
                  type="radio"
                  name="switch"
                  id="capital"
                  value="capital"
                />
              </label>
              <div
                className={`switch__indicator ${
                  challengeFilter === 'drapeaux' && 'indicator__flags'
                } ${challengeFilter === 'capital' && 'indicator__capital'}`}
              />
            </div>
          )}
          {selectGame !== 'Memory' && (
            <label htmlFor="region">
              <select
                name="region"
                id="region"
                onChange={handleFilterRegion}
                value={regionFilter}
                className="inpt"
              >
                <option value="">All Regions</option>
                <option value="world">World</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
              </select>
            </label>
          )}
          <div
            onChange={handleFilterScore}
            value={scoreFilter}
            className="switch"
          >
            <label htmlFor="asc" className="switch__label">
              ASC
              <input type="radio" name="switch" id="asc" value="asc" />
            </label>
            <label htmlFor="allScore" className="switch__label">
              All
              <input
                type="radio"
                name="switch"
                id="allScore"
                value=""
                defaultChecked
              />
            </label>
            <label htmlFor="desc" className="switch__label">
              DESC
              <input type="radio" name="switch" id="desc" value="desc" />
            </label>
            <div
              className={`switch__indicator ${
                scoreFilter === 'asc' && 'indicator__flags'
              } ${scoreFilter === 'desc' && 'indicator__capital'}`}
            />
          </div>
        </ul>
      </div>
      <div className="container__bodyClassement">
        <h2>{selectGame}</h2>
        {/* j'affiche mes infos contenu dans la BDD */}
        {dataBase.map((el, index) => (
          <ul
            key={el.id}
            className={`${selectGame === 'Memory' && 'gridColTwo'} ${
              index % 2 === 0 ? `bodyClassement` : `bodyClassement bgOpacity`
            }`}
          >
            <li>{el.pseudo}</li>
            {selectGame !== 'Memory' && <li>{el.game}</li>}
            {selectGame !== 'Memory' && <li>{el.region}</li>}
            <li>
              {el.score}
              {selectGame === 'Memory' ? 's' : ''}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Classements;
