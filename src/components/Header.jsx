import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import Logo from './Logo';
import Help from './Help';
import './header.css';
import Login from './Login';
import SignUp from './SignUp';
import Profil from './Profil';
import ConnectUser from './ConnectUser';
import Modal from './modal';
import flecheHaut from '../imageHome/flechehaut.png';
import flecheBas from '../imageHome/flechebas.png';

const Header = ({ showLogin, setShowLogin }) => {
  const [showlinks, setShowLinks] = useState(false);
  const [userConnected, setUserConnected] = useState([]);
  const [searchUser, setSearchUser] = useState(false);
  const [errorGetData, setErrorGetData] = useState('');
  const [test, setTest] = useState(false);
  const [revealOption, setRevealOption] = useState(false);
  const [showInputPseudo, setShowInputPseudo] = useState(false);
  const [showInputMail, setShowInputMail] = useState(false);

  /* Modal */
  const [openModal, setOpenModal] = useState('');

  const showModal = (id) => {
    setOpenModal(id);
  };

  const hideModal = () => {
    setOpenModal('');
  };
  const { setUserLogin } = useContext(UserContext);

  /* Fin Modal */
  useEffect(() => {
    const url = `https://worldwildquiz.herokuapp.com/login`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        setUserConnected(data);
        setUserLogin(data);
        setTest(true);
      })
      .catch((err) => setErrorGetData(err));
  }, [searchUser, showLogin, showInputPseudo]);

  const handleLogOut = () => {
    axios
      .post('https://worldwildquiz.herokuapp.com/logout', {
        withCredentials: true,
      })
      .then(() => {
        setShowLogin({ ...showLogin, profil: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowLinks = () => {
    setShowLinks(!showlinks);
  };

  const handleLogin = (dataLogin) => {
    axios
      .post('https://worldwildquiz.herokuapp.com/login', dataLogin, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) =>
        setUserConnected({
          ...userConnected,
          pseudo: data.pseudo,
          mail: data.mail,
        })
      );
  };

  const handleUpdatePseudo = (param, pseudo) => {
    axios
      .put(`https://worldwildquiz.herokuapp.com/api/users/${param}`, {
        pseudo,
      })
      .then((res) => {
        return res.status === 200 && res.data;
      })
      .then((data) => {
        handleLogin(data);
      });
    setShowInputPseudo(!showInputPseudo);
  };
  const handleUpdateMail = (param, mail) => {
    axios
      .put(`https://worldwildquiz.herokuapp.com/api/users/${param}`, {
        mail,
      })
      .then((res) => {
        return res.status === 200 && res.data;
      })
      .then((data) => {
        handleLogin(data);
      });
    setShowInputMail(!showInputMail);
  };
  const handleUpdatePassword = (param, password) => {
    axios
      .put(`https://worldwildquiz.herokuapp.com/api/users/${param}`, {
        password,
      })
      .then((res) => {
        return res.status === 200 && res.data;
      })
      .then((data) => {
        setUserConnected({ ...userConnected, password: data.password });
        handleLogin(data);
      });
  };
  return (
    <div className="sectionHeader">
      <div className="divBurger">
        <button type="button" className="burger" onClick={handleShowLinks}>
          <span className="burger-bar"> </span>
        </button>
      </div>
      <div className={`header ${showlinks ? 'show-nav' : 'hide-nav'}`}>
        {(showLogin.login ||
          showLogin.profil ||
          showLogin.signup ||
          revealOption) && (
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
        {showLogin.login && (
          <Login
            setSearchUser={setSearchUser}
            searchUser={searchUser}
            setShowLogin={setShowLogin}
            showLogin={showLogin}
            setTest={setTest}
          />
        )}
        {showLogin.signup && (
          <SignUp setShowLogin={setShowLogin} showLogin={showLogin} />
        )}
        {showLogin.profil && userConnected && (
          <Profil
            user={userConnected}
            handleLogOut={handleLogOut}
            handleUpdatePseudo={handleUpdatePseudo}
            handleUpdateMail={handleUpdateMail}
            handleUpdatePassword={handleUpdatePassword}
            showInputPseudo={showInputPseudo}
            setShowInputPseudo={setShowInputPseudo}
            showInputMail={showInputMail}
            setShowInputMail={setShowInputMail}
            setShowLogin={setShowLogin}
            showLogin={showLogin}
          />
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
              <p>
                This website was created by Jimmy, Christelle, Patxi and David
                <br /> at the opportunity for a project, during our training at
                the Wild Code School from Biarritz!
                <br />
                <br />
                During your experience, <br /> if you wish to be guided or if
                you have any doubt, click on this icon and you will get help !
              </p>
            </div>
            <div className="modalFooter">
              <h2>Have a good game !</h2>
              <button type="button" className="modalBtn" onClick={hideModal}>
                Close
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
              <p>
                Select your Quiz among the choices available by clicking on the
                game, then click on the Capital or Flag poster. <br />
                <br />
                Capital: Find the capitals of the proposed countries randomly.
                <br />
                Flag: Find out which country the flag corresponds to.
                <br /> <br />
                In the `World` game, you will have to choose the difficulty
                BEFORE you choose the game mode. <br /> <br /> If your choice is
                `Easy`, you will play with the most populous countries in the
                world. If you increase the difficulty, you will play with
                countries less populated!
              </p>
            </div>
            <div className="modalFooter">
              <h2> Good luck !</h2>
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
              <p>
                In the `Rapid Quiz`, <br /> you only have to select the
                difficulty. The different possible quizzes will be mixed!
                <br /> <br />
                Capitals, Flags, all countries are in !
                <br /> <br />
              </p>
            </div>
            <div className="modalFooter">
              <h2> Good luck !</h2>
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
              <p>
                To access the game, you just have to choose your difficulty and
                click on Play! <br /> <br />
                To win, you must turn over the cards, which hideflags, by
                clicking on them. <br /> <br />
                Remember the positions of each flag to return the good pair!
              </p>
            </div>
            <div className="modalFooter">
              <h2> Good luck !</h2>
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
              <p>
                To find a country, <br /> just type the name of a country
                <br /> to display flag under the search bar.
                <br /> <br />
                Finally, <br /> click on the country flag to display the
                information.
                <br />
                You can also click on the displayed flags, by browsing the page.
              </p>
            </div>
            <div className="modalFooter">
              <h2> It`s time to discover !</h2>
              <button type="button" className="modalBtn" onClick={hideModal}>
                Close
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
              <h1> Classements </h1>
            </div>
            <div className="modalFullInfo">
              <p>
                In this Hall Of Fame of geography experts,
                <br />
                you will find the names of connoisseurs who have proven their
                talent.
                <br /> <br />
                You can see the different rankings of the different games
                proposed, <br />
                and refine the search by clicking on the elements of sorting.
              </p>
              <br />
            </div>
            <div className="modalFooter">
              <h2> So ? Are you among the top ?</h2>
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
        <li
          className={`contBtnHeader scale ${revealOption && 'revealOption'}`}
          id="nohover"
        >
          <div className="contMobUp">
            <Help
              openModal={openModal}
              showModal={showModal}
              hideModal={hideModal}
              setRevealOption={setRevealOption}
            />
            <span
              onClick={() => setRevealOption(!revealOption)}
              onKeyDown={() => setRevealOption(!revealOption)}
              aria-hidden="true"
            >
              <img
                src={revealOption ? flecheBas : flecheHaut}
                alt="fleche_up"
              />
            </span>
            <ConnectUser
              searchUser={searchUser}
              userConnected={userConnected}
              test={test}
              onClick={() => {
                setRevealOption(false);
                return userConnected === '' || errorGetData
                  ? setShowLogin({ ...showLogin, login: true })
                  : setShowLogin({ ...showLogin, profil: true });
              }}
            />
          </div>
        </li>
      </div>
    </div>
  );
};

Header.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
  showLogin: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default Header;
