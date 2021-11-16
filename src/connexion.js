const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
const table = 'member';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json()).use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 365 * 1000 },
  })
);

const pool = mysql.createConnection({
  host: process.env.REACT_APP_MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USER,
  password: process.env.REACT_APP_MYSQL_PWD,
  database: process.env.REACT_APP_MYSQL_DB,
});

app.post('/login', (req, res) => {
  req.session.user = req.body;
  req.session.save();
  res.json(req.session.user);
});

app.get('/login', (req, res) => {
  res.json(req.session.user);
});

app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      res.redirect('/WorldWildQuiz/');
      if (error) {
        console.log(error);
      }
    });
  }
});

app.get('/api/score', (req, res) => {
  let sql = `select * from ${table}`;
  const sqlValues = [];
  console.log(req.query.game_type);
  if (req.query.game_type) {
    sql += ' WHERE game_type = ?';
    sqlValues.push(req.query.game_type);
  }
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
  }

  pool.query(sql, sqlValues, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/api/score', function (req, res) {
  // Get sent data.
  const { pseudo, idUser, score, game, region, gameType } = req.body;
  // Do a MySQL query.
  pool.query(
    `INSERT INTO ${table} (pseudo, idUser, score, game, region, game_type) VALUES ('${pseudo}', '${idUser}', '${score}', '${game}', '${region}', '${gameType}')`
  );
  res.end('Success');
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM usersdata where id=?', [id], (err) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(404).send('user not found');
    }
  });
});

app.get('/api/users/', (req, res) => {
  let sql = 'select * from usersdata';
  const sqlValues = [];

  if (req.query.pseudo && !req.query.mail) {
    // filtre juste les pseudos
    sql += ' WHERE pseudo = ?';
    sqlValues.push(req.query.pseudo);
  }
  if (req.query.mail && !req.query.pseudo) {
    // filtre juste les mail
    sql += ' WHERE mail = ?';
    sqlValues.push(req.query.mail);
  }
  if (req.query.pseudo && req.query.mail) {
    // filtre sur les pseudo et les mails
    sql += ` WHERE pseudo = ? OR mail = ? `;
    sqlValues.push(req.query.pseudo, req.query.mail);
  }
  pool.query(sql, sqlValues, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/api/users', (req, res) => {
  const { pseudo, mail, password } = req.body;
  pool.query(
    `INSERT INTO usersdata (pseudo, mail, password) VALUES (?, ? ,?)`,
    [pseudo, mail, password],
    (err) => {
      if (err) {
        res.status(500).send('Error saving the movie');
      } else {
        const posted = { pseudo, mail, password };
        res.status(201).json(posted);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});
