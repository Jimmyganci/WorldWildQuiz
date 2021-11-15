import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';
import Help from './Help';
import './header.css';
import Login from './Login';
import SignUp from './SignUp';
import Profil from './Profil';
import ConnectUser from './ConnectUser';

const Header = () => {
  const [showLogin, setShowLogin] = useState({
    login: false,
    signup: false,
    profil: false,
  });
  const [userConnected, setUserConnected] = useState([]);
  const [searchUser, setSearchUser] = useState(false);
  const [errorGetData, setErrorGetData] = useState('');
  console.log(userConnected.length);
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
      .then((res) => {
        console.log(res);
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
        <NavLink activeClassName="active" exact to="/WorldWildQuiz/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/WorldWildQuiz/Quiz">
          Quiz
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/WorldWildQuiz/Memory">
          Memory
        </NavLink>
      </li>

      <div className="logoHeader">
        <Link className="nohover" to="/WorldWildQuiz">
          <Logo />
        </Link>
      </div>

      <li>
        <NavLink activeClassName="active" to="/WorldWildQuiz/Culture">
          Culture
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/WorldWildQuiz/Classements">
          Classements
        </NavLink>
      </li>
      <li className="contBtnHeader scale" id="nohover">
        <Help content="?" />
        <ConnectUser
          content="user"
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

export default Header;
