import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './register.css';

const Register = ({
  timer,
  setIsHiddenRegister,
  isHiddenRegister,
  handleCloseRegister,
  regionSwitch,
  challengeSwitch,
  total,
}) => {
  const [user, setUser] = useState(''); // permet d'enregistrer un user
  console.log(total);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Je submit le formulaire et envoi les data à l'api
    axios.post('/api/users', {
      pseudo: user,
      score: total || `${timer.hour}: ${timer.minute}: ${timer.sec}`,
      game: challengeSwitch || '',
      region: regionSwitch || '',
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
        <h2>Register your score</h2>
        <label htmlFor="users">
          <input
            placeholder="Enter your Username..."
            className="inpt"
            type="text"
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      <button className="noThanks" type="button" onClick={handleCloseRegister}>
        No thanks
      </button>
    </div>
  );
};

Register.propTypes = {
  total: PropTypes.number.isRequired,
  timer: PropTypes.arrayOf(PropTypes.object).isRequired,
  setIsHiddenRegister: PropTypes.func.isRequired,
  isHiddenRegister: PropTypes.bool.isRequired,
  handleCloseRegister: PropTypes.func.isRequired,
  regionSwitch: PropTypes.string.isRequired,
  challengeSwitch: PropTypes.string.isRequired,
};

export default Register;
