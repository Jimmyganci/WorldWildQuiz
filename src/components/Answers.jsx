import React from 'react';
import PropTypes from 'prop-types';
import '../styles/answers.css';

const Answers = (props) => {
  const { country, nextQuestion, challengeSwitch, setResult } = props;

  const project = () => {
    switch (challengeSwitch) {
      case 'Capital':
        return country.capital;
      case 'Drapeaux':
        return <img src={country.flag} alt={country.name} id="flagAnswer" />;

      default:
        return <h1>No project match</h1>;
    }
  };

  return (
    <li className="button">
      <button
        onClick={(e) => {
          nextQuestion();
          setResult(e.target.value);
        }}
        type="button"
        value={country.capital}
      >
        {project()}
      </button>
    </li>
  );
};

Answers.propTypes = {
  country: PropTypes.element.isRequired,
  nextQuestion: PropTypes.element.isRequired,
  challengeSwitch: PropTypes.element.isRequired,
  setResult: PropTypes.element.isRequired,
};

export default Answers;
