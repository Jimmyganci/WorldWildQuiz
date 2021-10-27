import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/questions.css';
import './style.css';
import './styles/quizgame.css';
import './styles/answers.css';
import './styles/header.css';
import './styles/logo.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
