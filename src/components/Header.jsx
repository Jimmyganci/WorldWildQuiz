import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import Help from './Help';

const Header = () => {
  return (
    <div className="header">
      <NavLink activeClassName="active" exact to="/">
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/Quiz">
        Quiz
      </NavLink>{' '}
      <NavLink activeClassName="active" to="/Memory">
        Memory
      </NavLink>
      <div className="logoheader">
        <Logo />
      </div>
      <NavLink activeClassName="active" to="/Culture">
        Culture
      </NavLink>
      <NavLink activeClassName="active" to="/Classements">
        Classements
      </NavLink>
      <NavLink className="scale" id="nohover" to="/Help">
        <Help />
      </NavLink>
    </div>
  );
};

export default Header;
