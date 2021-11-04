import React from 'react';
import PropTypes from 'prop-types';
import './questions.css';

const Questions = ({
  country,
  nbQuestion,
  arrayLength,
  challengeSwitch,
  setResultQuestion,
}) => {
  setResultQuestion(country);

  return (
    <li className="questions">
      <div className="text">
        <h3>
          Questions {nbQuestion + 1}/{arrayLength - 3}
        </h3>
        <p>
          What is the {challengeSwitch === 'Drapeaux' ? 'flag' : 'capital'} of{' '}
          {country.name} ?
        </p>
      </div>

      <div className="img">
        {challengeSwitch !== 'Drapeaux' ? (
          <img src={country.flag} alt={country.name} /> // j'ajoute une balise img si le challenge est porté sur les drapeaux
        ) : (
          ' '
        )}
      </div>
    </li>
  );
};

Questions.propTypes = {
  country: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nbQuestion: PropTypes.number.isRequired,
  arrayLength: PropTypes.number.isRequired,
  challengeSwitch: PropTypes.string.isRequired,
  setResultQuestion: PropTypes.func.isRequired,
};

export default Questions;
