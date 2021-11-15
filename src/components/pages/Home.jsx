import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeCard from '../HomeCard';
import gameType from '../../gameType';
import CardQuizRapid from '../CardQuizRapid';
import CardCultureHome from '../CardCultureHome';
import './home.css';
import Logo from '../Logo';

const Home = ({ showPresentation, setShowPresentation }) => {
  return (
    <div className="home">
      {showPresentation && (
        <div className="logoPresentation">
          <Logo />
          <button
            onMouseUp={() => setShowPresentation(false)}
            type="button"
            className="btnStart"
          >
            Start
          </button>
        </div>
      )}
      <h1 className="homeH1">Welcome to the World Wild Game</h1>
      <div className="choiceGame">
        <div className="homeQuizCard">
          <Link className="linkDiv" to="/WorldWildQuiz/quiz">
            <HomeCard gameType={gameType[0]} />
          </Link>
        </div>
        <div className="homeMemoryCard">
          <Link className="linkDiv" to="/WorldWildQuiz/memory">
            <HomeCard gameType={gameType[1]} />
          </Link>
        </div>
        <div className="homeQuizRapidCard">
          <Link className="linkDiv" to="/WorldWildQuiz/quizrapid">
            <CardQuizRapid />
          </Link>
        </div>
        <div className="homeCultureCard">
          <Link className="linkDiv" to="/WorldWildQuiz/culture">
            <CardCultureHome />
          </Link>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  showPresentation: PropTypes.bool.isRequired,
  setShowPresentation: PropTypes.func.isRequired,
};

export default Home;
