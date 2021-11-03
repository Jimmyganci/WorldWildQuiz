const express = require('express');
// const session = require('express-session');
const mysql = require('mysql');

const app = express();
const port = 8000;
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

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Jymmi47!',
  database: 'worldwildquiz',
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
