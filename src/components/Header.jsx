import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import Help from './Help';
import './header.css';

const Header = () => {
  return (
    <div className="header">
      <li>
        <NavLink activeClassName="active" exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/Quiz">
          Quiz
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/Memory">
          Memory
        </NavLink>
      </li>
      <li className="logoheader">
        <Logo />
      </li>
      <li>
        <NavLink activeClassName="active" to="/Culture">
          Culture
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/Classements">
          Classements
        </NavLink>
      </li>
      <li>
        <NavLink className="scale" id="nohover" to="/Help">
          <Help />
        </NavLink>
      </li>
    </div>
  );
};

export default Header;
