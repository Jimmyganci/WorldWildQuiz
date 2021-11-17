import React, { useState } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Culture from './components/pages/Culture';
import Quiz from './components/pages/Quiz';
import Home from './components/pages/Home';
import Memory from './components/pages/Memory';
import Classements from './components/pages/Classements';
import Header from './components/Header';
import QuizRapid from './components/pages/QuizRapid';

import './app.css';

const App = () => {
  const [showPresentation, setShowPresentation] = useState(true);
  const [showLogin, setShowLogin] = useState({
    login: false,
    signup: false,
    profil: false,
  });
  return (
    <div className={showPresentation ? 'app' : ''}>
      <HashRouter basename="/">
        <Header showLogin={showLogin} setShowLogin={setShowLogin} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home
                showPresentation={showPresentation}
                setShowPresentation={setShowPresentation}
              />
            )}
          />
          <Route
            path="/Quiz"
            component={() => (
              <Quiz
                setShowLogin={setShowLogin}
                setShowPresentation={setShowPresentation}
              />
            )}
          />
          <Route
            path="/Memory"
            component={() => (
              <Memory setShowPresentation={setShowPresentation} />
            )}
          />
          <Route
            path="/Classements"
            component={() => (
              <Classements setShowPresentation={setShowPresentation} />
            )}
          />
          <Route
            path="/Culture"
            component={() => (
              <Culture setShowPresentation={setShowPresentation} />
            )}
          />
          <Route
            path="/QuizRapid"
            component={() => (
              <QuizRapid setShowPresentation={setShowPresentation} />
            )}
          />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
