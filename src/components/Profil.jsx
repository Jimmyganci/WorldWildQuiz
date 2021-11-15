import PropTypes from 'prop-types';
import './profil.css';

const Profil = ({ user, handleLogOut }) => {
  return (
    <div className="containerFormSubscription profilContainer">
      <div className="headerLogin">
        <h2>Profil</h2>
        <span>X</span>
      </div>
      <ul className="navUser">
        <li>
          <button type="button" className="select">
            Edit Profil
          </button>
        </li>
        <li>
          <button type="button">My Score</button>
        </li>
        <li>
          <button type="button">My Chat</button>
        </li>
        <li>
          <button type="button">My Badges</button>
        </li>
      </ul>
      <div className="login">
        <p>Pseudo: {user.pseudo}</p>
        <p>Mail: {user.mail}</p>
        <button className="logOut" type="button" onClick={handleLogOut}>
          <img src="assets/logout.png" alt="" />
        </button>
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
