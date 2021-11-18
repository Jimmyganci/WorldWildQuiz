import PropTypes from 'prop-types';
import { useState } from 'react';
import './profil.css';
import { useEffect } from 'react/cjs/react.development';
import axios from 'axios';
import logout from '../imageHome/logout.png';
import badge1 from '../imageHome/badge1.png';
import badge2 from '../imageHome/badge2.png';
import badge3 from '../imageHome/badge3.png';
import badge4 from '../imageHome/badge4.png';
import badge5 from '../imageHome/badge5.png';
import badge6 from '../imageHome/badge6.png';

const Profil = ({
  user,
  handleLogOut,
  handleUpdatePseudo,
  showInputPseudo,
  setShowInputPseudo,
  handleUpdateMail,
  showInputMail,
  setShowInputMail,
}) => {
  const [showCategoryProfil, setShowCategoryProfil] = useState('profil');
  const [scoreUser, setScoreUser] = useState([]);
  const [updatePseudo, setUpdatePseudo] = useState('');
  const [updateMail, setUpdateMail] = useState('');

  useEffect(() => {
    axios
      .get(`/api/score/${user.id}`)
      .then((res) => res.data)
      .then((data) => setScoreUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="containerFormSubscription profilContainer">
      <div className="headerLogin">
        <h2>Profil</h2>
        <span>X</span>
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

            <div>
              <div>
                {showInputPseudo ? (
                  <input
                    type="text"
                    onChange={(e) => setUpdatePseudo(e.target.value)}
                  />
                ) : (
                  <p>Pseudo: {user.pseudo}</p>
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
              <div>
                {showInputMail ? (
                  <input
                    type="mail"
                    onChange={(e) => setUpdateMail(e.target.value)}
                  />
                ) : (
                  <p>Pseudo: {user.mail}</p>
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

              <button className="btnProfil" type="button">
                Change Password
              </button>
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
                  <p>{el.score}%</p>
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
  handleUpdateMail: PropTypes.func.isRequired,
  setShowInputPseudo: PropTypes.func.isRequired,
  showInputPseudo: PropTypes.bool.isRequired,
  setShowInputMail: PropTypes.func.isRequired,
  showInputMail: PropTypes.bool.isRequired,
};

Profil.defaultProps = {
  user: [{}],
};

export default Profil;
