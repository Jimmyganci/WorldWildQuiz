import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './signUp.css';

const Login = ({ setShowLogin, showLogin }) => {
  const [pseudo, setPseudo] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    errorPseudo: false,
    errorMail: false,
    error: '',
  });
  const [hover, setHover] = useState({
    inpt1: false,
    inpt2: false,
    inpt3: false,
    inpt4: false,
  });
  useEffect(() => {
    let url = `http://localhost:8000/api/users/`;
    if (pseudo) {
      url += `?pseudo=${pseudo}`;
    }
    if (mail) {
      url += `?mail=${mail}`;
    }
    if (mail && pseudo) {
      url += `?pseudo=${pseudo}&mail=${mail}`;
    }
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        if (data.find((el) => el.pseudo === pseudo)) {
          setError({ ...error, errorPseudo: true });
        } else if (data.find((el) => el.mail === mail)) {
          setError({ ...error, errorMail: true });
        } else {
          setError({ ...error, errorPseudo: false, errorMail: false });
        }
      });
  }, [pseudo, mail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Je submit le formulaire et envoi les data à l'api
    if (password === confirmPassword) {
      axios.post('http://localhost:8000/api/users', {
        pseudo,
        mail,
        password,
        confirmPassword,
      });
      setShowLogin({ ...showLogin, signup: false });
    } else {
      setError({ ...error, error: 'Your password are not similar!' });
    }
  };

  return (
    <div className="containerFormSubscription">
      <div className="headerLogin">
        <h2>Subscription</h2>
        <span>X</span>
      </div>
      <form className="login" onSubmit={handleSubmit}>
        <label htmlFor="login">
          <input
            type="text"
            name="login"
            id="login"
            className="inptUsers"
            placeholder="Pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            onFocus={() => setHover({ ...hover, inpt1: true })}
            onBlur={() => setHover({ ...hover, inpt1: false })}
            autoComplete="off"
            required
          />
          <span
            className={`bottomBorder ${hover.inpt1 && 'activeInpt1'} ${
              error.errorPseudo && 'redError'
            } `}
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            className="inptUsers"
            placeholder="E-mail"
            onChange={(e) => setMail(e.target.value)}
            onBlur={() => setHover({ ...hover, inpt2: false })}
            onFocus={() => setHover({ ...hover, inpt2: true })}
            autoComplete="off"
            required
          />
          <span
            className={`bottomBorder ${hover.inpt2 && 'activeInpt1'} ${
              error.errorMail && 'redError'
            }`}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            className="inptUsers"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setHover({ ...hover, inpt3: false })}
            onFocus={() => setHover({ ...hover, inpt3: true })}
            autoComplete="off"
            required
          />
          <span className={`bottomBorder ${hover.inpt3 && 'activeInpt1'}`} />
        </label>
        <label htmlFor="confirmpassword">
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            className="inptUsers"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setHover({ ...hover, inpt4: false })}
            onFocus={() => setHover({ ...hover, inpt4: true })}
            autoComplete="off"
            required
          />
          <span className={`bottomBorder ${hover.inpt4 && 'activeInpt1'}`} />
        </label>
        <p className="errorMessage">{error.error}</p>
        <button type="submit" className="btn">
          GO PLAY
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
};

export default Login;
