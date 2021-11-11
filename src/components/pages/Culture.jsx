import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './culture.css';
import Modal from '../modal';

const Culture = ({ setShowPresentation }) => {
  const [playOnce, setPlayOnce] = useState(true);
  const [allCountries, setAllCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [openModal, setOpenModal] = useState('');

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
        })
        .catch((err) => console.log(err));
    }
  }, [allCountries]);

  /* Modal */
  const showModal = (id) => {
    setOpenModal(id);
  };
  const hideModal = () => {
    setOpenModal('');
  };

  return (
    <div>
      <div className="cultureBody">
        <h1>Chercher un pays :</h1>
        <form className="cultureForm" onSubmit={(e) => e.preventDefault()}>
          <input
            className="cultureSearch"
            type="text"
            placeholder="Entrez le nom d'un pays"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
          />
        </form>
        <div className="cultureFilter">
          {allCountries
            .filter((country) =>
              searchCountry
                ? country.name.includes(searchCountry.toLowerCase()) ||
                  country.translations.fr
                    .toLowerCase()
                    .includes(searchCountry.toLowerCase())
                : country
            )
            .map((country) => {
              return (
                <div key={country.name}>
                  <div className="cultureFlag">
                    <img
                      onClick={() => showModal(country.name)}
                      onKeyDown={() => showModal()}
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
                        Pays: <h2>{country.translations.fr}</h2>
                      </div>
                      <div className="modalInfoOne">
                        Continent : <h2>{country.region}</h2>
                        Capitale :
                        <h2>
                          {country.capital} <br />
                        </h2>
                        Population :
                        <h2>
                          {country.population} habitants <br />
                        </h2>
                      </div>
                      <div className="modalInfoTwo">
                        Monnaie :
                        <h2>
                          {country.currencies
                            ? country.currencies[0].name
                            : ' Inconnu'}
                          <br />
                        </h2>
                        Symbole monnaie :
                        <h2>
                          {country.currencies
                            ? country.currencies[0].symbol
                            : ' Inconnu'}
                          <br />
                        </h2>
                        Aire : <h2>{country.area} km²</h2>
                      </div>
                      <div className="modalFooter">
                        <button
                          type="button"
                          className="modalBtn"
                          onClick={hideModal}
                        >
                          Fermer
                        </button>
                      </div>
                    </Modal>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

Culture.propTypes = {
  setShowPresentation: PropTypes.func.isRequired,
};

export default Culture;
