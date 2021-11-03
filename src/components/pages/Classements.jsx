import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './classement.css';

const Classements = () => {
  const [playOnce, setPlayOnce] = useState(true);
  const [dataBase, setDataBase] = useState([]);

  useEffect(() => {
    if (playOnce) {
      axios.get(`/api/users`).then((res) => {
        setDataBase(res.data);
        setPlayOnce(false);
      });
    }
  }, [dataBase]);

  return (
    <div className="classement">
      <h1>Classements</h1>
      <ul className="headClassement">
        <li>Pseudo</li>
        <li>Challenge</li>
        <li>Region</li>
        <li>Score</li>
      </ul>
      <div className="container__bodyClassement">
        {dataBase.map((el) => (
          <ul key={el.id} className="bodyClassement">
            <li>{el.pseudo}</li>
            <li>{el.game}</li>
            <li>{el.region}</li>
            <li>{el.score}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Classements;
