import React from 'react';
import PropTypes from 'prop-types';

const Questions = (props) => {
  const { country } = props;
  const { nbQuestion } = props;

  return (
    <li className="questions">
      <div className="text">
        <h3>Questions {nbQuestion}/20</h3>
        <p>What is the capital of {country.name} ?</p>
      </div>

      <div className="img">
        <img src={country.flag} alt={country.name} />
      </div>
    </li>
  );
};

Questions.propTypes = {
  country: PropTypes.element.isRequired,
  nbQuestion: PropTypes.element.isRequired,
};

export default Questions;
