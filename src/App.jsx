import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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
  return (
    <div className={showPresentation ? 'app' : ''}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            path="/WorldWildQuiz"
            exact
            component={() => (
              <Home
                showPresentation={showPresentation}
                setShowPresentation={setShowPresentation}
              />
            )}
          />
          <Route
            path="/WorldWildQuiz/Quiz"
            exact
            component={() => <Quiz setShowPresentation={setShowPresentation} />}
          />
          <Route
            path="/WorldWildQuiz/Memory"
            exact
            component={() => (
              <Memory setShowPresentation={setShowPresentation} />
            )}
          />
          <Route
            path="/WorldWildQuiz/Classements"
            exact
            component={() => (
              <Classements setShowPresentation={setShowPresentation} />
            )}
          />
          <Route
            path="/WorldWildQuiz/Culture"
            exact
            component={() => (
              <Culture setShowPresentation={setShowPresentation} />
            )}
          />
          <Route
            path="/WorldWildQuiz/QuizRapid"
            exact
            component={() => (
              <QuizRapid setShowPresentation={setShowPresentation} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
