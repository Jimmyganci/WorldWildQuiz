const express = require('express');
// const session = require('express-session');
const mysql = require('mysql');
require('dotenv').config();

console.log(process.env.REACT_APP_MYSQL_USER);
const app = express();
const port = process.env.PORT || 8000;
const table = 'member';

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

app.get('/api/users', function (req, res) {
  pool.query(`select * from ${table}`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
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
