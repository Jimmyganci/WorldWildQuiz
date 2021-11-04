import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './resultquiz.css';

const ResultQuiz = ({ total, showResponse, challengeSwitch, regionSwitch }) => {
  const [filterCorrection, setFilterCorrection] = useState(''); // récupère la valeur de l'input
  const [showCorrection, setShowCorrection] = useState(false); // permet d'afficher ou non la correction
  const [user, setUser] = useState(''); // permet d'enregistrer un user
  const [isHiddenRegister, setIsHiddenRegister] = useState(false); // affiche ou non le modal pour s'enregistrer

  let insensibleCasse = '';

  if (filterCorrection) {
    insensibleCasse =
      filterCorrection[0].toUpperCase() + filterCorrection.slice(1); // je rend le formulaire insensible à la casse
  }

  const showResultFinal = showResponse.filter((el) => el.name !== undefined); // j'élimine les corrections qui pourrait être undefined

  const handleSubmit = (e) => {
    e.preventDefault();
    // Je submit le formulaire et envoi les data à l'api et donc à la bdd
    axios
      .post('/api/users', {
        pseudo: user,
        score: total,
        game: challengeSwitch,
        region: regionSwitch,
      })
      .then((response) => {
        return response;
      });
    setIsHiddenRegister(true);
  };

  const handleCloseRegister = () => {
    setIsHiddenRegister(!isHiddenRegister);
  };

  return (
    <div className="resultQuiz">
      <h5>Votre score est de : {total} </h5>
      <button
        id="btnCorrection"
        className="btn"
        type="button"
        onClick={() => setShowCorrection(!showCorrection)}
      >
        {showCorrection ? 'Hide' : 'Show'} Correction
      </button>
      <label
        className={
          showCorrection ? 'labelCorrection' : 'labelCorrection isHidden'
        }
        htmlFor="filterCorrection"
      >
        Search an answer
        <input
          id="filterCorrection"
          className="inpt"
          type="text"
          placeholder="Search your question ( by name country, name capital)"
          onChange={(e) => setFilterCorrection(e.target.value)}
        />
      </label>
      {showResultFinal
        .filter((elem) =>
          filterCorrection
            ? elem.name.includes(insensibleCasse) ||
              elem.answer.includes(insensibleCasse) ||
              elem.translation.fr.includes(insensibleCasse)
            : elem
        )
        .map((el) => (
          <div
            className={
              showCorrection ? 'gridResultQuiz' : 'gridResultQuiz isHidden'
            }
          >
            <p>Question was:</p>
            <p>
              What is the {challengeSwitch === 'Drapeaux' ? 'flag' : 'capital'}{' '}
              of : <strong>{el.name}</strong>
            </p>
            <p>Your answer:</p>
            <p>
              {' '}
              {challengeSwitch === 'Drapeaux' ? (
                <img id="flagAnswer" src={el.answer} alt={el.name} />
              ) : (
                el.answer
              )}
            </p>
            <p>Good answer:</p>
            <p>
              {challengeSwitch === 'Drapeaux' ? (
                <img id="flagAnswer" src={el.flag} alt={el.name} />
              ) : (
                el.capital
              )}
            </p>
          </div>
        ))}
    </div>
  );
};

ResultQuiz.propTypes = {
  total: PropTypes.element.isRequired,
  showResponse: PropTypes.element.isRequired,
  challengeSwitch: PropTypes.element.isRequired,
};

export default ResultQuiz;
