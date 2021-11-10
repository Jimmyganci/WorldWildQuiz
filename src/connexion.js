const express = require('express');
const cors = require('cors');
// const session = require('express-session');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
const table = 'member';

app.use(cors());

app.use(express.json()).use(express.urlencoded({ extended: true }));
//   .use(
//     session({
//       secret: 'keyboard cat',
//       resave: false,
//       saveUninitialized: true,
//       cookie: { secure: true },
//     })
//   );

const pool = mysql.createConnection({
  host: process.env.REACT_APP_MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USER,
  password: process.env.REACT_APP_MYSQL_PWD,
  database: process.env.REACT_APP_MYSQL_DB,
});

app.get('/api/users', (req, res) => {
  let sql = `select * from ${table}`;
  const sqlValues = [];
  console.log(req.query.pseudo);
  if (req.query.game && !req.query.region && !req.query.score) {
    // filtre juste les challenge
    sql += ' WHERE game = ?';
    sqlValues.push(req.query.game);
  }
  if (req.query.region && !req.query.game && !req.query.score) {
    // filtre juste les continents
    sql += ' WHERE region = ?';
    sqlValues.push(req.query.region);
  }
  if (req.query.score && !req.query.region && !req.query.game) {
    // filtre juste sur les scores
    sql += ` ORDER BY score ${req.query.score}`;
  }
  if (req.query.game && req.query.region && !req.query.score) {
    // filtre sur les challenges et les continents
    sql += ` WHERE game = ? AND region = ?`;
    sqlValues.push(req.query.game, req.query.region);
  }
  if (!req.query.game && req.query.region && req.query.score) {
    // filtre sur les continents et sur le score
    sql += ` WHERE region = ? ORDER BY score ${req.query.score}`;
    sqlValues.push(req.query.region);
  }
  if (req.query.game && !req.query.region && req.query.score) {
    // filtre sur les challenges et le score
    sql += ` WHERE game = ? ORDER BY score ${req.query.score}`;
    sqlValues.push(req.query.game);
  }
  if (req.query.game && req.query.region && req.query.score) {
    // filtre sur les continents, challenge et score
    sql += ` WHERE game = ? AND region = ? ORDER BY score ${req.query.score}`;
    sqlValues.push(req.query.game, req.query.region);
  }

  if (req.query.pseudo) {
    sql += ` WHERE pseudo LIKE '%${req.query.pseudo}%'`;
    // sqlValues.push(req.query.pseudo);
  }

  console.log(sql);
  pool.query(sql, sqlValues, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/api/users', function (req, res) {
  // Get sent data.
  const { pseudo, score, game, region } = req.body;
  // Do a MySQL query.
  pool.query(
    `INSERT INTO ${table} (pseudo, score, game, region) VALUES ('${pseudo}', '${score}', '${game}', '${region}')`
  );
  res.end('Success');
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});
