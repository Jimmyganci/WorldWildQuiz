import React from 'react';
import PropTypes from 'prop-types';
import '../styles/answers.css';

const Answers = (props) => {
  const { country, nextQuestion, challengeSwitch } = props;

  const project = () => {
    switch (challengeSwitch) {
      case 'Capital':
        return country.capital;
      case 'Drapeaux':
        return <img src={country.flag} alt={country.name} id="flagAnswer" />;
      case 'Devise':
        return `${country.currencies[0].code} / ${country.currencies[0].name} / ${country.currencies[0].symbol}`;

      default:
        return <h1>No project match</h1>;
    }
  };

  return (
    <li className="button">
      <button onClick={nextQuestion} type="button">
        {project()}
      </button>
    </li>
  );
};

Answers.propTypes = {
  country: PropTypes.element.isRequired,
  nextQuestion: PropTypes.element.isRequired,
  challengeSwitch: PropTypes.element.isRequired,
};

export default Answers;
