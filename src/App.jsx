import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
import Memory from './pages/Memory';
import Classements from './pages/Classements';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Quiz" exact component={Quiz} />
        <Route path="/Memory" exact component={Memory} />
        <Route path="/Classements" exact component={Classements} />
      </Switch>
    </>
  );
};

export default App;
