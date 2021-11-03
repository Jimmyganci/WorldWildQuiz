import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './resultquiz.css';
import axios from 'axios';

const ResultQuiz = ({ total, showResponse, challengeSwitch, regionSwitch }) => {
  const [filterCorrection, setFilterCorrection] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);
  const [user, setUser] = useState('');
  const [isHiddenRegister, setIsHiddenRegister] = useState(false);
  let insensibleCasse = '';

  if (filterCorrection) {
    insensibleCasse =
      filterCorrection[0].toUpperCase() + filterCorrection.slice(1);
  }

  const showResultFinal = showResponse.filter((el) => el.name !== undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    // On submit of the form, send a POST request with the data to the server.
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
      <h5>Votre score est de : {total > 1 ? total : ''} </h5>
      <button
        className="registerBtn"
        type="button"
        onClick={handleCloseRegister}
      >
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
      <div
        className={
          isHiddenRegister
            ? 'isHiddenDown registerModal '
            : ' showRegister registerModal'
        }
      >
        <form className="userFormRegister" onSubmit={handleSubmit}>
          <h2>Register your score</h2>
          <label htmlFor="users">
            <input
              placeholder="Enter your Username..."
              className="inpt"
              type="text"
              onChange={(e) => setUser(e.target.value)}
            />
          </label>
          <button className="btn" type="submit">
            Register
          </button>
        </form>
        <button
          className="noThanks"
          type="button"
          onClick={handleCloseRegister}
        >
          No thanks
        </button>
      </div>
    </div>
  );
};

ResultQuiz.propTypes = {
  total: PropTypes.number.isRequired,
  showResponse: PropTypes.arrayOf(PropTypes.object).isRequired,
  challengeSwitch: PropTypes.string.isRequired,
  regionSwitch: PropTypes.string.isRequired,
};

export default ResultQuiz;
