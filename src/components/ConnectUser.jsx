import './help.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ConnectUser = ({ searchUser, onClick, userConnected }) => {
  const [isLoggin, setIsLoggin] = useState(false);
  console.log(isLoggin);

  return (
    <div className="helpcontainer">
      <div
        className="help"
        onClick={() => {
          onClick();
          return searchUser && setIsLoggin(true);
        }}
        onKeyDown={onClick}
        aria-hidden="true"
      >
        <div className="contImageUser">
          {userConnected.length !== 0 ? (
            <p className="letterConnected">{userConnected.pseudo[0]}</p>
          ) : (
            <img src="assets/user.png" id="userImage" alt="logo_user" />
          )}
        </div>
      </div>
    </div>
  );
};

ConnectUser.propTypes = {
  userConnected: PropTypes.oneOfType([PropTypes.object]),
  onClick: PropTypes.func,
  searchUser: PropTypes.bool.isRequired,
};

ConnectUser.defaultProps = {
  onClick: () => {},
  userConnected: [{}],
};

export default ConnectUser;
