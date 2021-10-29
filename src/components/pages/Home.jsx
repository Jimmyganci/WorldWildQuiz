import React from 'react';
import HomeCard from '../HomeCard';
import gameType from '../../gameType';
import CardQuizRapid from '../CardQuizRapid';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <h1 id="homeH1">Bienvenue au World Wide Game</h1>
      <div className="choiceGame">
        <div id="homequizcard">
          <HomeCard gameType={gameType[0]} />
        </div>

        <div id="homememorycard">
          <HomeCard gameType={gameType[1]} />
        </div>
        <div id="homequizrapidcard">
          <CardQuizRapid />
        </div>
      </div>
    </div>
  );
};

export default Home;
