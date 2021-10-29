import React from 'react';
import { Link } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import gameType from '../components/gameType';
import CardQuizRapid from '../components/CardQuizRapid';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home">
      <h1 clasName="homeH1">Bienvenue au World Wide Game</h1>
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
