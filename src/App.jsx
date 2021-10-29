import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Culture from './components/pages/Culture';
import Quiz from './components/pages/Quiz';
import Home from './components/pages/Home';
import Memory from './components/pages/Memory';
import Classements from './components/pages/Classements';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Quiz" exact component={Quiz} />
        <Route path="/Memory" exact component={Memory} />
        <Route path="/Classements" exact component={Classements} />
        <Route path="/Culture" exact component={Culture} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
