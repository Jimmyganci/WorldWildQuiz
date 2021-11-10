import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './register.css';

const Register = ({
  timer,
  setIsHiddenRegister,
  isHiddenRegister = false,
  handleCloseRegister,
  regionSwitch,
  challengeSwitch,
  total,
}) => {
  const [user, setUser] = useState(''); // permet d'enregistrer un user

  const handleSubmit = (e) => {
    e.preventDefault();
    // Je submit le formulaire et envoi les data à l'api
    axios.post('/api/users', {
      pseudo: user,
      score: total || timer.hour + timer.minute + timer.sec,
      game: challengeSwitch || 'NC',
      region: regionSwitch || 'NC',
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
  total: PropTypes.number,
  timer: PropTypes.arrayOf(PropTypes.object),
  setIsHiddenRegister: PropTypes.func.isRequired,
  isHiddenRegister: PropTypes.bool.isRequired,
  handleCloseRegister: PropTypes.func.isRequired,
  regionSwitch: PropTypes.string,
  challengeSwitch: PropTypes.string,
};

Register.defaultProps = {
  timer: [],
  total: 0,
  regionSwitch: '',
  challengeSwitch: '',
};

export default Register;
