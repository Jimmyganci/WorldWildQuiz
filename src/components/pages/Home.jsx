import React from 'react';
import { Link } from 'react-router-dom';
import HomeCard from '../HomeCard';
import gameType from '../../gameType';
import CardQuizRapid from '../CardQuizRapid';
import CardCultureHome from '../CardCultureHome';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="choiceGame">
        <div className="homeQuizCard">
          <Link className="linkDiv" to="/quiz">
            <HomeCard gameType={gameType[0]} />
          </Link>
        </div>
        <div className="homeMemoryCard">
          <Link className="linkDiv" to="/memory">
            <HomeCard gameType={gameType[1]} />
          </Link>
        </div>
        <div className="homeQuizRapidCard">
          <CardQuizRapid />
        </div>
        <div className="homeCultureCard">
          <Link className="linkDiv" to="/culture">
            <CardCultureHome />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
