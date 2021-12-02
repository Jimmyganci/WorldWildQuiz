import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HomeCard from '../HomeCard';
import gameType from '../../gameType';
import CardQuizRapid from '../CardQuizRapid';
import CardCultureHome from '../CardCultureHome';
import './home.css';
import Logo from '../Logo';

const Home = () => {
  const [showPresentation, setShowPresentation] = useState(true);
  const [userConnected, setUserConnected] = useState([]);

  useEffect(() => {
    const url = `https://worldwildquiz.herokuapp.com/login`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        setUserConnected(data);
      });
  }, []);
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
      <h2 className="titlePseudo">
        {userConnected && 'Hello '}
        {userConnected && userConnected.pseudo}
      </h2>
      <h1 className="homeH1">Welcome to the World Wild Quiz</h1>
      {!showPresentation && (
        <div className="choiceGame">
          <div className="homeQuizCard">
            <Link className="linkDiv" to="/Quiz">
              <HomeCard gameType={gameType[0]} />
            </Link>
          </div>
          <div className="homeMemoryCard">
            <Link className="linkDiv" to="/Memory">
              <HomeCard gameType={gameType[1]} />
            </Link>
          </div>
          <div className="homeQuizRapidCard">
            <Link className="linkDiv" to="/QuizRapid">
              <CardQuizRapid />
            </Link>
          </div>
          <div className="homeCultureCard">
            <Link className="linkDiv" to="/Culture">
              <CardCultureHome />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
