import PropTypes from 'prop-types';
import './answers.css';

const Answers = ({
  country,
  nextQuestion,
  challengeSwitch,
  setResultAnswer,
}) => {
  const project = () => {
    // j'affiche les réponses en fonction du challenge choisi
    switch (challengeSwitch) {
      case 'Capital':
        return country.capital;
      case 'Flags':
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
          return challengeSwitch === 'Flags'
            ? setResultAnswer(e.target.src)
            : setResultAnswer(e.target.value);
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
  country: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  challengeSwitch: PropTypes.string.isRequired,
  setResultAnswer: PropTypes.func.isRequired,
};

export default Answers;
