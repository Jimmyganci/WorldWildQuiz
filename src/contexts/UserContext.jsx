import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext(null);

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState([]);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};
