import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizRapid = () => {
  const [data, setData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true); // gere l'appel API pour eviter l'appel en boucle

  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          `https://restcountries.com/v2/all?fields=name,capital,translations,flag,population`
        )
        .then((res) => {
          setData(res.data);
          console.log(data[0]);
          setPlayOnce(false);
        });
    }
  }, [data, playOnce]);

  return (
    <div>
      <h2>Rapid quiz</h2>
      <div className="divquizrapid">
        {data
          .filter((country) => country.name.includes('ra'))
          .map((country) => country.name)}
        ;
        {data.map((country) => (
          <img src={country.flag} alt="flag" width="80px" />
        ))}
        ;
      </div>
    </div>
  );
};

export default QuizRapid;
