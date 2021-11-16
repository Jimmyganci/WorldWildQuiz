import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Logo from './Logo';
import Help from './Help';
import './header.css';
import Login from './Login';
import SignUp from './SignUp';
import Profil from './Profil';
import ConnectUser from './ConnectUser';
import Modal from './modal';

const Header = ({ showLogin, setShowLogin }) => {
  const [showlinks, setShowLinks] = useState(false);
  const [userConnected, setUserConnected] = useState([]);
  const [searchUser, setSearchUser] = useState(false);
  const [errorGetData, setErrorGetData] = useState('');

  /* Modal */
  const [openModal, setOpenModal] = useState('');

  const showModal = (id) => {
    setOpenModal(id);
  };

  const hideModal = () => {
    setOpenModal('');
  };
  /* Fin Modal */

  useEffect(() => {
    const url = `http://localhost:8000/login`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => setUserConnected(data))
      .catch((err) => setErrorGetData(err.response.status));
  }, [searchUser, showLogin]);

  const handleLogOut = () => {
    axios
      .post('/logout', { withCredentials: true })
      .then(() => {
        setShowLogin({ ...showLogin, profil: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(window.location);

  const handleShowLinks = () => {
    setShowLinks(!showlinks);
  };
  console.log(showlinks);

  return (
    <div className="sectionHeader">
      <button type="button" className="burger" onClick={handleShowLinks}>
        <span className="burger-bar"> </span>
      </button>
      <div className={`header ${showlinks ? 'show-nav' : 'hide-nav'}`}>
        {(showLogin.login || showLogin.profil || showLogin.signup) && (
          <span
            id="screenBackBlack"
            onClick={() =>
              setShowLogin({ login: false, profil: false, signup: false })
            }
            onKeyDown={() =>
              setShowLogin({ login: false, profil: false, signup: false })
            }
            aria-hidden="true"
          />
        )}
        {showLogin.login && userConnected === '' && (
          <Login
            setSearchUser={setSearchUser}
            searchUser={searchUser}
            setShowLogin={setShowLogin}
            showLogin={showLogin}
          />
        )}
        {showLogin.signup && (
          <SignUp setShowLogin={setShowLogin} showLogin={showLogin} />
        )}
        {showLogin.profil && userConnected && (
          <Profil user={userConnected} handleLogOut={handleLogOut} />
        )}
        {/* ***** Link Home ***** */}
        {openModal && window.location.hash === '#/' ? (
          <Modal
            openModal={openModal}
            showModal={showModal}
            hideModal={hideModal}
          >
            <div className="modalHeader">
              <h1> Welcome to the World Wild Quiz ! </h1>
            </div>
            <div className="modalFullInfo">
              <h3>
                This website was created by @Jimmy, @Christelle, @Patxi and
                @David, at the opportunity for a project, during our training at
                the Wild School from Biarritz!
                <br />
                <br />
                During your experience, if you wish to be guided or if you have
                any doubt, click on this icon and you will get help !
              </h3>
              <br />
              <h2>Have a good game !</h2>
            </div>
            <div className="modalFooter">
              <button type="button" className="modalBtn" onClick={hideModal}>
                Fermer
              </button>
            </div>
          </Modal>
        ) : null}
        {/* ***** Link Quiz ***** */}
        {openModal && window.location.hash === '#/Quiz' ? (
          <Modal
            openModal={openModal}
            showModal={showModal}
            hideModal={hideModal}
          >
            <div className="modalHeader">
              <h1> Quiz </h1>
            </div>
            <div className="modalFullInfo">
              <h3>
                Select your Quiz among the choices available by clicking on the
                game, then click on the Capital or Flag poster. <br />
                <br />
                Capital: Find the capitals of the proposed countries randomly.
                <br />
                Flag: Find out which country the flag corresponds to.
                <br /> <br />
                In the `World` choice, you will have to choose the difficulty
                BEFORE you choose the game mode. <br /> <br /> If your choice is
                `Easy`, you will play with the most populous countries in the
                world. If you increase the difficulty, you will play with
                countries less populated!
              </h3>
              <br />
              <h2> Good luck !</h2>
            </div>
            <div className="modalFooter">
              <button type="button" className="modalBtn" onClick={hideModal}>
                Close
              </button>
            </div>
          </Modal>
        ) : null}
        {/* ***** Link Quiz ***** */}
        {openModal && window.location.hash === '#/quizrapid' ? (
          <Modal
            openModal={openModal}
            showModal={showModal}
            hideModal={hideModal}
          >
            <div className="modalHeader">
              <h1> Rapid Quiz </h1>
            </div>
            <div className="modalFullInfo">
              <h3>
                In the `Rapid Quiz`, <br /> you only have to select the
                difficulty. The different possible quizzes will be mixed!
                <br /> <br />
                Capitals, Flags, all countries are in !
                <br /> <br />
              </h3>
              <br />
              <h2> Good luck !</h2>
            </div>
            <div className="modalFooter">
              <button type="button" className="modalBtn" onClick={hideModal}>
                Close
              </button>
            </div>
          </Modal>
        ) : null}
        {/* ***** Link Memory ***** */}
        {openModal && window.location.hash === '#/Memory' ? (
          <Modal
            openModal={openModal}
            showModal={showModal}
            hideModal={hideModal}
          >
            <div className="modalHeader">
              <h1> Memory </h1>
            </div>
            <div className="modalFullInfo">
              <h3>
                To access the game, you just have to choose your difficulty and
                click on Play! <br /> <br />
                To win, you must turn over the cards, which hideflags, by
                clicking on them. <br /> <br />
                Remember the positions of each flag to return the good pair!
              </h3>
              <br />
              <h2> Good luck !</h2>
            </div>
            <div className="modalFooter">
              <button type="button" className="modalBtn" onClick={hideModal}>
                Close
              </button>
            </div>
          </Modal>
        ) : null}
        {/* ***** Link Culture ***** */}
        {openModal && window.location.hash === '#/Culture' ? (
          <Modal
            openModal={openModal}
            showModal={showModal}
            hideModal={hideModal}
          >
            <div className="modalHeader">
              <h1> Culture </h1>
            </div>
            <div className="modalFullInfo">
              <h3>
                To find a country, <br /> just type in the name of a country to
                display its flag under the search bar.
                <br /> <br />
                Finally, click on the country flag to display the information.
                <br />
                You can also click on the displayed flags, by browsing the page.
              </h3>
              <br />
              <h2> It`s time to discover !</h2>
            </div>
            <div className="modalFooter">
              <button type="button" className="modalBtn" onClick={hideModal}>
                Fermer
              </button>
            </div>
          </Modal>
        ) : null}
        {/* ***** Link Classement ***** */}
        {openModal && window.location.hash === '#/Classements' ? (
          <Modal
            openModal={openModal}
            showModal={showModal}
            hideModal={hideModal}
          >
            <div className="modalHeader">
              <h1> Classement </h1>
            </div>
            <div className="modalFullInfo">
              <h3>
                In this Hall Of Fame of geography experts,
                <br />
                you will find the names of connoisseurs who have proven their
                talent.
                <br /> <br />
                You can see the different rankings of the different games
                proposed, <br />
                and refine the search by clicking on the elements of sorting.
              </h3>
              <br />
              <h2> So ? Are you among the top ?</h2>
            </div>
            <div className="modalFooter">
              <button type="button" className="modalBtn" onClick={hideModal}>
                Close
              </button>
            </div>
          </Modal>
        ) : null}

        <li>
          <NavLink
            activeClassName="active"
            exact
            to="/"
            onClick={handleShowLinks}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to="/Quiz"
            onClick={handleShowLinks}
          >
            Quiz
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to="/Memory"
            onClick={handleShowLinks}
          >
            Memory
          </NavLink>
        </li>

        <div className="logoHeader">
          <Link className="nohover" to="/">
            <Logo />
          </Link>
        </div>

        <li>
          <NavLink
            activeClassName="active"
            to="/Culture"
            onClick={handleShowLinks}
          >
            Culture
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to="/Classements"
            onClick={handleShowLinks}
          >
            Classements
          </NavLink>
        </li>
        <li className="contBtnHeader scale" id="nohover">
          <Help
            openModal={openModal}
            showModal={showModal}
            hideModal={hideModal}
          />
          <ConnectUser
            searchUser={searchUser}
            userConnected={userConnected}
            onClick={() =>
              userConnected === '' || errorGetData
                ? setShowLogin({ ...showLogin, login: true })
                : setShowLogin({ ...showLogin, profil: true })
            }
          />
        </li>
      </div>
    </div>
  );
};

Header.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
};
export default Header;
