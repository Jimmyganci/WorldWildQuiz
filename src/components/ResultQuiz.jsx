import { useState } from 'react';
import PropTypes from 'prop-types';
import './resultquiz.css';
import Register from './Register';

const ResultQuiz = ({
  total,
  showResponse,
  challengeSwitch,
  regionSwitch,
  arrayLength,
  setShowLogin,
  setIsHidden,
}) => {
  const [filterCorrection, setFilterCorrection] = useState(''); // récupère la valeur de l'input
  const [showCorrection, setShowCorrection] = useState(false); // permet d'afficher ou non la correction
  const [isHiddenRegister, setIsHiddenRegister] = useState(false); // affiche ou non le modal pour s'enregistrer
  let insensibleCasse = '';

  if (filterCorrection) {
    insensibleCasse =
      filterCorrection[0].toUpperCase() + filterCorrection.slice(1); // je rend le formulaire insensible à la casse
  }

  const showResultFinal = showResponse.filter((el) => el.name !== undefined); // j'élimine les corrections qui pourrait être undefined

  const handleCloseRegister = () => {
    setIsHiddenRegister(!isHiddenRegister);
  };

  return (
    <div className="resultQuiz">
      <h5>Votre score est de : {Math.round((total / arrayLength) * 100)}% </h5>
      <button className="noThanks" type="button" onClick={handleCloseRegister}>
        {isHiddenRegister ? 'Register my Score' : 'Not register my score'}
      </button>
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
            key={el.name}
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
      <Register
        total={total}
        isHiddenRegister={isHiddenRegister}
        setIsHiddenRegister={setIsHiddenRegister}
        handleCloseRegister={handleCloseRegister}
        regionSwitch={regionSwitch}
        challengeSwitch={challengeSwitch}
        arrayLength={arrayLength}
        setShowLogin={setShowLogin}
        setIsHidden={setIsHidden}
      />
    </div>
  );
};

ResultQuiz.propTypes = {
  total: PropTypes.number.isRequired,
  showResponse: PropTypes.arrayOf(PropTypes.object).isRequired,
  challengeSwitch: PropTypes.string.isRequired,
  regionSwitch: PropTypes.string,
  arrayLength: PropTypes.number.isRequired,
  setShowLogin: PropTypes.func.isRequired,
  setIsHidden: PropTypes.func.isRequired,
};

ResultQuiz.defaultProps = {
  regionSwitch: 'Monde',
};

export default ResultQuiz;
