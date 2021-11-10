import axios from 'axios';
import { useEffect, useState } from 'react';
import './classement.css';

const Classements = () => {
  const [playOnce, setPlayOnce] = useState(true);
  const [dataBase, setDataBase] = useState([]); // variable d'état du resultat de l'appel a la BDD
  const [challengeFilter, setChallengeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [pseudoFilter, setPseudoFilter] = useState('');
  const [scoreFilter, setScoreFilter] = useState();

  useEffect(() => {
    if (playOnce) {
      let url = `http://localhost:8000/api/users/`;
      if (challengeFilter) {
        url += `?game=${challengeFilter}`;
      }

      if (regionFilter) {
        url += `${challengeFilter ? '&' : '?'}region=${regionFilter}`;
      }

      if (scoreFilter) {
        url += `${
          challengeFilter || regionFilter ? '&' : '?'
        }score=${scoreFilter}`;
      }
      if (pseudoFilter) {
        url += `?pseudo=${pseudoFilter}`;
      }

      axios.get(url).then((res) => {
        setDataBase(res.data);
        setPlayOnce(false);
      });
    }
  }, [dataBase, challengeFilter, regionFilter, scoreFilter, pseudoFilter]);

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
      <ul className="headClassement">
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
        <label htmlFor="challenge">
          <select
            name="challenge"
            id="challenge"
            onChange={handleFilterChallenge}
            value={challengeFilter}
            className="inpt"
          >
            <option className="optionSelect" value="">
              All
            </option>
            <option className="optionSelect" value="drapeaux">
              Drapeaux
            </option>
            <option className="optionSelect" value="capital">
              Capital
            </option>
          </select>
        </label>
        <label htmlFor="region">
          <select
            name="region"
            id="region"
            onChange={handleFilterRegion}
            value={regionFilter}
            className="inpt"
          >
            <option value="">All</option>
            <option value="monde">Monde</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </label>
        <label htmlFor="score">
          <select
            name="score"
            id="score"
            onChange={handleFilterScore}
            value={scoreFilter}
            className="inpt"
          >
            <option value="">Sort by</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </label>
      </ul>
      <div className="container__bodyClassement">
        {/* j'affiche mes infos contenu dans la BDD */}
        {dataBase.map((el, index) => (
          <ul
            key={el.id}
            className={
              index % 2 === 0 ? `bodyClassement` : `bodyClassement bgOpacity`
            }
          >
            <li>{el.pseudo}</li>
            <li>{el.game}</li>
            <li>{el.region}</li>
            <li>{el.score}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Classements;
