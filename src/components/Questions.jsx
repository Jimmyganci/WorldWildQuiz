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
  country: PropTypes.element.isRequired,
  nbQuestion: PropTypes.element.isRequired,
  arrayLength: PropTypes.element.isRequired,
  challengeSwitch: PropTypes.element.isRequired,
  setResultQuestion: PropTypes.element.isRequired,
};

export default Questions;
