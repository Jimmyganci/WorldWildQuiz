import './help.css';
import PropTypes from 'prop-types';

const Help = ({ content, onClick, userConnected }) => {
  return (
    <div className="helpcontainer">
      <div
        className="help"
        onClick={onClick}
        onKeyDown={onClick}
        aria-hidden="true"
      >
        {content !== 'user' ? (
          <p>?</p>
        ) : (
          <div className="contImageUser">
            {userConnected.length !== 0 ? (
              <p className="letterConnected">{userConnected.pseudo[0]}</p>
            ) : (
              <img
                src="WorldWildQuiz/assets/user.png"
                id="userImage"
                alt="logo_user"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Help.propTypes = {
  content: PropTypes.string.isRequired,
  userConnected: PropTypes.oneOfType([PropTypes.object]),
  onClick: PropTypes.func,
};

Help.defaultProps = {
  onClick: () => {},
  userConnected: [{}],
};

export default Help;
