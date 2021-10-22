import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Answers = (props) => {
  const { country } = props;
  const [isSelect, setIsSelect] = useState(false);

  const handleClick = () => {
    setIsSelect(!isSelect);
  };
  console.log(isSelect);
  return (
    <li className="button">
      <button
        className={isSelect ? 'selectAnswer' : ''}
        onClick={handleClick}
        type="button"
      >
        {country.capital}
      </button>
    </li>
  );
};

Answers.propTypes = {
  country: PropTypes.element.isRequired,
};

export default Answers;
