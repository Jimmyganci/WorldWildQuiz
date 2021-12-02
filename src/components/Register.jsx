import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import './register.css';

const Register = ({
  timer,
  setIsHiddenRegister,
  isHiddenRegister = false,
  handleCloseRegister,
  regionSwitch,
  challengeSwitch,
  total,
  arrayLength,
  setShowLogin,
  setIsHidden,
}) => {
  const [userConnected, setUserConnected] = useState([]);

  useEffect(() => {
    const url = `https://worldwildquiz.herokuapp.com/login`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => setUserConnected(data))
      .catch((err) => console.log(err.response.status));
  }, [isHiddenRegister]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Je submit le formulaire et envoi les data à l'api
    axios.post('https://worldwildquiz.herokuapp.com/api/score', {
      pseudo: userConnected.pseudo,
      idUser: userConnected.id,
      score: total || timer.hour + timer.minute + timer.sec,
      game: challengeSwitch || 'NC',
      region: regionSwitch || 'NC',
      gameType: regionSwitch ? 'Quiz' : 'Memory',
    });
    setIsHiddenRegister(true);
  };

  return (
    <div
      className={
        isHiddenRegister
          ? 'isHiddenDown registerModal '
          : ' showRegister registerModal'
      }
    >
      <form className="userFormRegister" onSubmit={handleSubmit}>
        <div className="registerMessage">
          <div>
            <p>
              Congratulations{' '}
              <span>{userConnected && userConnected.pseudo}</span> your score is{' '}
              {`${
                total
                  ? `${Math.round((total / arrayLength) * 100)}%`
                  : `${timer.hour}h ${timer.minute}mn ${timer.sec}s`
              }`}
            </p>
            {!userConnected && <p>Log in to save your result!</p>}
          </div>
          {!userConnected && (
            <button
              type="button"
              className="btn"
              onClick={() => {
                setIsHidden('result');
                setShowLogin({ login: true, signup: false, profil: false });
              }}
            >
              Log in
            </button>
          )}
          {userConnected && (
            <button className="btn" type="submit">
              Save my score
            </button>
          )}
        </div>
      </form>
      <button className="noThanks" type="button" onClick={handleCloseRegister}>
        Close
      </button>
    </div>
  );
};

Register.propTypes = {
  total: PropTypes.number,
  timer: PropTypes.arrayOf(PropTypes.object),
  setIsHiddenRegister: PropTypes.func.isRequired,
  isHiddenRegister: PropTypes.bool.isRequired,
  handleCloseRegister: PropTypes.func.isRequired,
  regionSwitch: PropTypes.string,
  challengeSwitch: PropTypes.string,
  arrayLength: PropTypes.number.isRequired,
  setShowLogin: PropTypes.func.isRequired,
  setIsHidden: PropTypes.func.isRequired,
};

Register.defaultProps = {
  timer: [],
  total: 0,
  regionSwitch: '',
  challengeSwitch: '',
};

export default Register;
