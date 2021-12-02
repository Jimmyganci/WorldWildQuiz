import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './profil.css';
import axios from 'axios';
import logout from '../imageHome/logout.png';
import badge1 from '../imageHome/badge1.png';
import badge2 from '../imageHome/badge2.png';
import badge3 from '../imageHome/badge3.png';
import badge4 from '../imageHome/badge4.png';
import badge5 from '../imageHome/badge5.png';
import badge6 from '../imageHome/badge6.png';
import close from '../imageHome/fermer.png';

const Profil = ({
  user,
  handleLogOut,
  handleUpdatePseudo,
  handleUpdatePassword,
  showInputPseudo,
  setShowInputPseudo,
  handleUpdateMail,
  showInputMail,
  setShowInputMail,
  setShowLogin,
  showLogin,
}) => {
  const [showCategoryProfil, setShowCategoryProfil] = useState('profil');
  const [scoreUser, setScoreUser] = useState([]);
  const [updatePseudo, setUpdatePseudo] = useState('');
  const [updateMail, setUpdateMail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showInputPassword, setShowInputPassword] = useState(false);

  useEffect(() => {
    axios
      .get(`https://worldwildquiz.herokuapp.com/api/score/${user.id}`)
      .then((res) => res.data)
      .then((data) => setScoreUser(data))
      .catch((err) => console.log(err));
  }, []);

  const handlePasswordUpdateBDD = (param, password) => {
    if (newPassword === confirmPassword) {
      handleUpdatePassword(param, password);
      setShowInputPassword(!showInputPassword);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('password no similar');
    }
  };
  return (
    <div className="containerFormSubscription profilContainer">
      <div className="headerLogin">
        <h2>Profil</h2>
        <span
          className="closeContainer"
          aria-hidden="true"
          onClick={() => setShowLogin({ ...showLogin, profil: false })}
          onKeyDown={() => setShowLogin({ ...showLogin, profil: false })}
        >
          <img src={close} alt="croix" />
        </span>
      </div>
      <ul className="navUser">
        <li>
          <button
            type="button"
            className={showCategoryProfil === 'profil' && 'select'}
            onClick={() => setShowCategoryProfil('profil')}
          >
            Edit Profil
          </button>
        </li>
        <li>
          <button
            type="button"
            className={showCategoryProfil === 'scores' && 'select'}
            onClick={() => setShowCategoryProfil('scores')}
          >
            My Score
          </button>
        </li>
        <li>
          <button
            type="button"
            className={showCategoryProfil === 'chat' && 'select'}
            onClick={() => setShowCategoryProfil('chat')}
          >
            My Chat
          </button>
        </li>
        <li>
          <button
            type="button"
            className={showCategoryProfil === 'badges' && 'select'}
            onClick={() => setShowCategoryProfil('badges')}
          >
            My Badges
          </button>
        </li>
      </ul>
      <div className="profilUser">
        {showCategoryProfil === 'profil' && (
          <div className="profilEdit">
            <div>
              <h2>{user.pseudo}</h2>
              <span>Welcome to your profil</span>
            </div>

            <div className="informationProfil">
              <div className="infoEditProfil">
                <h5>My Pseudo</h5>
                {showInputPseudo ? (
                  <input
                    type="text"
                    placeholder="Enter your new pseudo"
                    onChange={(e) => setUpdatePseudo(e.target.value)}
                  />
                ) : (
                  <p>{user.pseudo}</p>
                )}

                <button
                  className="btnProfil"
                  type="button"
                  onClick={() =>
                    updatePseudo
                      ? handleUpdatePseudo(user.id, updatePseudo)
                      : setShowInputPseudo(!showInputPseudo)
                  }
                >
                  Change Pseudo
                </button>
              </div>
              <div className="infoEditProfil">
                <h5>My Mail</h5>
                {showInputMail ? (
                  <input
                    type="mail"
                    placeholder="Enter your new mail"
                    onChange={(e) => setUpdateMail(e.target.value)}
                  />
                ) : (
                  <p>{user.mail}</p>
                )}
                <button
                  className="btnProfil"
                  type="button"
                  onClick={() =>
                    updateMail
                      ? handleUpdateMail(user.id, updateMail)
                      : setShowInputMail(!showInputMail)
                  }
                >
                  Change Mail
                </button>
              </div>
              <div className="infoEditProfil">
                <h5>My Password</h5>
                {showInputPassword && (
                  <div className="contChangePassword">
                    <label htmlFor="newPassword">
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter tour new password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </label>
                    <label htmlFor="confirmPassword">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </label>
                  </div>
                )}
                <button
                  className="btnProfil"
                  type="button"
                  onClick={() =>
                    newPassword || confirmPassword
                      ? handlePasswordUpdateBDD(user.id, newPassword)
                      : setShowInputPassword(!showInputPassword)
                  }
                >
                  Change Password
                </button>
              </div>
              <div className="infoEditProfil">
                <button type="button" className="btnProfil">
                  Delete my account
                </button>
              </div>
            </div>

            <button className="logOut" type="button" onClick={handleLogOut}>
              <img src={logout} alt="" />
            </button>
          </div>
        )}
        {showCategoryProfil === 'scores' && (
          <div className="scoresProfil">
            <h2>My Scores</h2>
            <div className="title">
              <p>Game</p>
              <p>Challenge</p>
              <p>Region</p>
              <p>Score</p>
            </div>
            <div className="userScores">
              {scoreUser.map((el) => (
                <div className="scoreUser">
                  <p>{el.game_type}</p>
                  <p>{el.game}</p>
                  <p>{el.region}</p>
                  <p>
                    {el.score}
                    {`${el.game_type === 'Memory' ? 's' : '%'}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {showCategoryProfil === 'badges' && (
          <div className="profilEdit">
            <div>
              <h2>My Badges</h2>
            </div>
            <div className="containerBadge">
              <div>
                <img src={badge1} alt="badge1" />
              </div>
              <div>
                <img src={badge2} alt="badge2" />
              </div>
              <div>
                <img src={badge3} alt="badge3" />
              </div>
              <div>
                <img src={badge4} alt="badge4" />
              </div>
              <div>
                <img src={badge5} alt="badge5" />
              </div>
              <div>
                <img src={badge6} alt="badge6" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Profil.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]),
  handleLogOut: PropTypes.func.isRequired,
  handleUpdatePseudo: PropTypes.func.isRequired,
  handleUpdatePassword: PropTypes.func.isRequired,
  handleUpdateMail: PropTypes.func.isRequired,
  setShowInputPseudo: PropTypes.func.isRequired,
  showInputPseudo: PropTypes.bool.isRequired,
  setShowInputMail: PropTypes.func.isRequired,
  setShowLogin: PropTypes.func.isRequired,
  showInputMail: PropTypes.bool.isRequired,
  showLogin: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

Profil.defaultProps = {
  user: [{}],
};

export default Profil;
