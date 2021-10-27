import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* eslint-disable */

const Memory = () => {
    const [data, setData] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [flagArray, setFlagArray] = useState([]);
    const limitFlag = []

    useEffect(() => {
        if (playOnce) {
          axios
            .get(
              'https://restcountries.com/v2/all?fields=flag,name'
            )
            .then((res) => {
              setData(res.data);
              setPlayOnce(false);
            });
        }
        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            const sortedArray = countryObj.sort((a, b) => {
              return b.population - a.population;
            }).slice(0,12);
            setFlagArray(sortedArray);
          };
          sortedCountry();
      }, [data, playOnce]);
      
   
    for (let i=0; i<2; i++){
        
        flagArray.map((el) => limitFlag.push(el));
    }
    console.log(limitFlag)
 
    
    return (
        <div className="flagsCardsContainer">
            {limitFlag.map((country, key) => (
                <div className = "card">
                    <img key={key} src={country.flag} alt={country.name} />
                </div>
                ))}
        </div>
    );
};




export default Memory;

/* eslint-enable */
