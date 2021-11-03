import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './culture.css';

const Culture = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [valueQuery, setValueQuery] = useState('');
  /* Appel API */
  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v2/name/${valueQuery}
      `
      )
      .then((response) => response.data)
      .then((data) => {
        setAllCountries(data);
      })
      .catch((err) => console.log(err));
  }, [valueQuery]);

  return (
    <div className="cultureContainer">
      <form className="cultureForm" onSubmit={(e) => e.preventDefault()}>
        <h2>Chercher un pays :</h2>
        <input
          className="cultureSearch"
          type="text"
          placeholder="Entrez le nom d'un pays"
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
        <button
          type="button"
          id="buttonCulture"
          onClick={() => setValueQuery(searchCountry)}
        >
          CHERCHER
        </button>
      </form>
      {allCountries
        .filter((country) => country.name.includes(searchCountry))
        .map((country) => (
          <div>
            <ul className="cultureCard">
              <h3>Informations :</h3>
              Pays: {country.translations.fr} <br />
              Capitale: {country.capital} <br />
              Continent: {country.region} <br />
              Population: {country.population} <br />
              <img
                id="cultureFlags"
                src={country.flags.svg}
                alt={country.name}
              />
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Culture;
