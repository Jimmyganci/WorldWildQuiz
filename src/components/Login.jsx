import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './login.css';

const Login = ({
  searchUser,
  setSearchUser,
  setShowLogin,
  showLogin,
  setTest,
}) => {
  const [dataUsers, setDataUsers] = useState([]);
  const [error, setError] = useState('');
  const [dataLogin, setDataLogin] = useState('');
  const [dataPassword, setDataPassword] = useState('');
  const [hoverLog, setHoverLog] = useState({
    inpt1: false,
    inpt2: false,
  });
  useEffect(() => {
    if (searchUser) {
      axios
        .get(`https://worldwildquiz.herokuapp.com/api/users`)
        .then((res) => res.data)
        .then((data) => {
          const foundUser = data.find((el) => el.pseudo === dataLogin);
          setDataUsers(foundUser);
          setSearchUser(false);
        });
      if (dataUsers === undefined) {
        setError('User not found');
      } else {
        setError('');
        if (dataUsers) {
          if (
            dataPassword === dataUsers.password &&
            dataLogin === dataUsers.pseudo
          ) {
            setError('');
            axios
              .post(`http://localhost:9000/login`, dataUsers, {
                withCredentials: true,
              })
              .then((res) => res.data)
              .then((data) => {
                if (data) {
                  setTest(true);
                  setShowLogin({ ...showLogin, login: false });
                }
              })
              .catch((err) => console.log(err));
            setShowLogin({ ...showLogin, login: false });
          } else {
            setError('Password Invalid');
          }
        }
      }
    }
  }, [dataUsers, searchUser, error, dataLogin, dataPassword]);

  const handleSignIn = (e) => {
    e.preventDefault();
    setSearchUser(true);
  };

  return (
    <div className="containerFormSubscription">
      <div className="headerLogin">
        <h2>Sign In</h2>
        <span>X</span>
      </div>

      <form className="login" onSubmit={handleSignIn}>
        <label htmlFor="loginCon">
          <input
            type="text"
            name="login"
            id="loginCon"
            className="inptUsers"
            placeholder="Login"
            onChange={(e) => setDataLogin(e.target.value)}
            onBlur={() => setHoverLog({ ...hoverLog, inpt1: false })}
            onFocus={() => setHoverLog({ ...hoverLog, inpt1: true })}
            autoComplete="off"
            required
          />
          <span className={`bottomBorder ${hoverLog.inpt1 && 'activeInpt1'}`} />
        </label>
        <label htmlFor="passwordCon">
          <input
            type="password"
            name="password"
            id="passwordCon"
            className="inptUsers"
            placeholder="Password"
            required
            onChange={(e) => setDataPassword(e.target.value)}
            onBlur={() => setHoverLog({ ...hoverLog, inpt2: false })}
            onFocus={() => setHoverLog({ ...hoverLog, inpt2: true })}
            autoComplete="off"
          />
          <span className={`bottomBorder ${hoverLog.inpt2 && 'activeInpt1'}`} />
        </label>
        <p>{error}</p>
        <button type="submit" className="btn">
          LOGIN
        </button>
        <div>
          <p>
            <button
              type="button"
              className="noThanks"
              onClick={() =>
                setShowLogin({ ...showLogin, signup: true, login: false })
              }
            >
              No account ? Create account!
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  searchUser: PropTypes.bool.isRequired,
  setSearchUser: PropTypes.func.isRequired,
  setShowLogin: PropTypes.func.isRequired,
  showLogin: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setTest: PropTypes.func.isRequired,
};

export default Login;
