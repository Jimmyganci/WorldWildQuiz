import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Logo from './Logo';
import Help from './Help';
import './header.css';
import Login from './Login';
import SignUp from './SignUp';
import Profil from './Profil';
import ConnectUser from './ConnectUser';

const Header = ({ showLogin, setShowLogin }) => {
  const [userConnected, setUserConnected] = useState([]);
  const [searchUser, setSearchUser] = useState(false);
  const [errorGetData, setErrorGetData] = useState('');

  useEffect(() => {
    const url = `http://localhost:8000/login`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => setUserConnected(data))
      .catch((err) => setErrorGetData(err.response.status));
  }, [searchUser, showLogin]);

  const handleLogOut = () => {
    axios
      .post('/logout', { withCredentials: true })
      .then(() => {
        setShowLogin({ ...showLogin, profil: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="header">
      {(showLogin.login || showLogin.profil || showLogin.signup) && (
        <span
          id="screenBackBlack"
          onClick={() =>
            setShowLogin({ login: false, profil: false, signup: false })
          }
          onKeyDown={() =>
            setShowLogin({ login: false, profil: false, signup: false })
          }
          aria-hidden="true"
        />
      )}
      {showLogin.login && userConnected === '' && (
        <Login
          setSearchUser={setSearchUser}
          searchUser={searchUser}
          setShowLogin={setShowLogin}
          showLogin={showLogin}
        />
      )}
      {showLogin.signup && (
        <SignUp setShowLogin={setShowLogin} showLogin={showLogin} />
      )}
      {showLogin.profil && userConnected && (
        <Profil user={userConnected} handleLogOut={handleLogOut} />
      )}
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

      <div className="logoHeader">
        <Link className="nohover" to="/">
          <Logo />
        </Link>
      </div>

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
      <li className="contBtnHeader scale" id="nohover">
        <Help />
        <ConnectUser
          searchUser={searchUser}
          userConnected={userConnected}
          onClick={() =>
            userConnected === '' || errorGetData
              ? setShowLogin({ ...showLogin, login: true })
              : setShowLogin({ ...showLogin, profil: true })
          }
        />
      </li>
    </div>
  );
};

Header.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
};
export default Header;
