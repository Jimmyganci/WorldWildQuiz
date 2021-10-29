import React from 'react';
import PropTypes from 'prop-types';
import '../styles/questions.css';

const Questions = (props) => {
  const {
    country,
    nbQuestion,
    arrayLength,
    challengeSwitch,
    setResultQuestion,
  } = props;
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
          <img src={country.flag} alt={country.name} />
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
