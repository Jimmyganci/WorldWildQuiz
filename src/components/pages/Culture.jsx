import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './culture.css';
import Modal from '../modal';
import Logo from '../Logo';

const Culture = ({ setShowPresentation }) => {
  const [playOnce, setPlayOnce] = useState(true);
  const [allCountries, setAllCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [openModal, setOpenModal] = useState('');
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowPresentation(false);
  }, []);
  /* Appel API */
  useEffect(() => {
    if (playOnce) {
      axios
        .get(`https://restcountries.com/v2/all`)
        .then((response) => response.data)
        .then((data) => {
          setAllCountries(data);
          setPlayOnce(false);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [allCountries]);

  /* Scroll button */
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /* Modal */
  const showModal = (id) => {
    setOpenModal(id);
  };
  const hideModal = () => {
    setOpenModal('');
  };

  return (
    <div>
      {loading ? (
        <div className="loadingLogo">
          <Logo />
        </div>
      ) : (
        <div className="cultureBody">
          <form className="cultureForm" onSubmit={(e) => e.preventDefault()}>
            <h1>Search a country :</h1>
            <input
              className="cultureSearch"
              type="text"
              placeholder="Enter a country name"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
            />
          </form>
          <div className="cultureFilter">
            {allCountries
              .filter((country) =>
                searchCountry
                  ? country.name.includes(searchCountry) ||
                    country.translations.fr
                      .toLowerCase()
                      .includes(searchCountry.toLowerCase())
                  : country
              )
              .map((country) => {
                return (
                  <div key={country.name}>
                    <div className="cultureMap">
                      <img
                        onClick={() => showModal(country.name)}
                        aria-hidden="true"
                        id="cultureFlags"
                        src={country.flag}
                        alt={country.name}
                      />
                    </div>
                    {country.name === openModal && (
                      <Modal
                        openModal={openModal}
                        showModal={showModal}
                        hideModal={hideModal}
                      >
                        <div className="modalHeader">
                          <img
                            id="modalFlag"
                            src={country.flag}
                            alt={country.flag}
                          />
                          Country: <h3>{country.translations.fr}</h3>
                        </div>
                        <div className="modalInfoOne">
                          Region : <h3>{country.region}</h3>
                          Capital :
                          <h3>
                            {country.capital} <br />
                          </h3>
                          Population :
                          <h3>
                            {country.population} people <br />
                          </h3>
                        </div>
                        <div className="modalInfoTwo">
                          Currencie :
                          <h3>
                            {country.currencies
                              ? country.currencies[0].name
                              : ' Inconnu'}
                            <br />
                          </h3>
                          Currencie symbol :
                          <h3>
                            {country.currencies
                              ? country.currencies[0].symbol
                              : ' Inconnu'}
                            <br />
                          </h3>
                          Area : <h3>{country.area} km²</h3>
                        </div>
                        <div className="modalFooter">
                          <button
                            type="button"
                            className="modalBtn"
                            onClick={hideModal}
                          >
                            Close
                          </button>
                        </div>
                      </Modal>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {showButton && (
        <button type="button" onClick={scrollToTop} className="back-to-top">
          &#8679; {/* Arrow */}
        </button>
      )}
    </div>
  );
};

Culture.propTypes = {
  setShowPresentation: PropTypes.func.isRequired,
};

export default Culture;
