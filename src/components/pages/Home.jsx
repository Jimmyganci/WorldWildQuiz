import React from 'react';
import { Link } from 'react-router-dom';
import HomeCard from '../HomeCard';
import gameType from '../../gameType';
import CardQuizRapid from '../CardQuizRapid';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <h1 className="homeH1">Bienvenue au World Wide Game</h1>
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
      </div>
    </div>
  );
};

export default Home;
