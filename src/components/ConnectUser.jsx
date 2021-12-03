/* eslint-disable*/

import React from 'react';
import './help.css';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import logoUser from '../imageHome/user.png';

class ConnectUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: false,
    };
  }
  static contextType = UserContext;

  render() {
    const { searchUser, onClick, userConnected, test } = this.props;
    const { userLogin } = this.context;
    console.log(userLogin);
    return (
      <div className="helpcontainer">
        <div
          className="help"
          onClick={() => {
            onClick();
            return searchUser && this.setState({ isLoggin: true });
          }}
          onKeyDown={onClick}
          aria-hidden="true"
        >
          <div className="contImageUser">
            {test && userLogin !== '' ? (
              <p className="letterConnected">{userLogin.pseudo[0]}</p>
            ) : (
              <img src={logoUser} id="userImage" alt="logo_user" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

ConnectUser.propTypes = {
  userConnected: PropTypes.PropTypes.oneOfType([PropTypes.object]),
  onClick: PropTypes.func,
  searchUser: PropTypes.bool.isRequired,
};

ConnectUser.defaultProps = {
  onClick: () => {},
  userConnected: '',
};

export default ConnectUser;

/* eslint-enable */
