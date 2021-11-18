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
  const [showLogin, setShowLogin] = useState({
    login: false,
    signup: false,
    profil: false,
  });
  return (
    <div>
      <HashRouter basename="/">
        <Header showLogin={showLogin} setShowLogin={setShowLogin} />
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route
            path="/Quiz"
            component={() => <Quiz setShowLogin={setShowLogin} />}
          />
          <Route path="/Memory" component={() => <Memory />} />
          <Route path="/Classements" component={() => <Classements />} />
          <Route path="/Culture" component={() => <Culture />} />
          <Route path="/QuizRapid" component={() => <QuizRapid />} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
