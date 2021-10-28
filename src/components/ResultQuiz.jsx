import React from 'react';
import PropTypes from 'prop-types';
import '../styles/resultquiz.css';

const ResultQuiz = (props) => {
  const { total } = props;
  return (
    <div>
      <h5>Votre score est de : {total > 1 ? total : ''} </h5>
    </div>
  );
};

ResultQuiz.propTypes = {
  total: PropTypes.element.isRequired,
};

export default ResultQuiz;
