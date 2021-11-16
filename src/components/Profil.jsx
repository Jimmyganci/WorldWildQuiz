import PropTypes from 'prop-types';
import { useState } from 'react';
import './profil.css';

const Profil = ({ user, handleLogOut }) => {
  const [showCategoryProfil, setShowCategoryProfil] = useState('profil');
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
            className="select"
            onClick={() => setShowCategoryProfil('profil')}
          >
            Edit Profil
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setShowCategoryProfil('scores')}>
            My Score
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setShowCategoryProfil('chat')}>
            My Chat
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setShowCategoryProfil('badges')}>
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
              <p>Pseudo: {user.pseudo}</p>
              <p>Mail: {user.mail}</p>
            </div>

            <button className="logOut" type="button" onClick={handleLogOut}>
              <img src="assets/logout.png" alt="" />
            </button>
          </div>
        )}
        {showCategoryProfil === 'scores' && (
          <div className="scoresProfil">
            <h2>My Scores</h2>
          </div>
        )}
        {showCategoryProfil === 'badges' && (
          <div className="profilEdit">
            <div>
              <h2>My Badges</h2>
            </div>
            <div className="containerBadge">
              <div>
                <img src="assets/badge1.png" alt="badge1" />
              </div>
              <div>
                <img src="assets/badge2.png" alt="badge2" />
              </div>
              <div>
                <img src="assets/badge3.png" alt="badge3" />
              </div>
              <div>
                <img src="assets/badge4.png" alt="badge4" />
              </div>
              <div>
                <img src="assets/badge5.png" alt="badge5" />
              </div>
              <div>
                <img src="assets/badge6.png" alt="badge6" />
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
};

Profil.defaultProps = {
  user: [{}],
};

export default Profil;
