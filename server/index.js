const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysqlDB = require('../database/index.js');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passportGithub = require('./passport-github.js');
const cache = require('memory-cache');
const url = require('url');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/../react-client/dist`));

app.use(require('cookie-parser')());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// let options = {
//   host: 'localhost',
//   port: 3000,
//   user: 'root',
//   password: '',
//   database: 'codeop'
// };

// let connection = mysql.createConnection(options);
console.log('ALMOST');
// let sessionStore = new MySQLStore(options, connection);


console.log('SUCCESSFUL');


app.use(session({
  secret: 'egh576',
  resave: false,
  saveUnitialized: true,
}));

// Intitialize passport
app.use(passport.initialize());

// Restore Session
app.use(passport.session());

console.log(' here before /auth/github');

// app.get('/*', (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.join(`${__dirname}/../react-client/dist`, 'index.html'));
// });


app.get('/auth/github', passport.authenticate('github'));
console.log('after /auth/github');

app.get('/auth/github/return', passport.authenticate('github', { failureRedirect: '/'}),
  (req, res) => {
    console.log('------- inside passport authenticate');
    //res.redirect('/create');
    cache.put(req.sessionID, req.user);
    res.redirect(url.format({
      pathname: '/',
      query: {
        session: req.sessionID
      }
    }));
    // res.redirect('/');
  }
);



app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    req.logout();

    res.redirect('/');
  });
});

app.get('/*', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(`${__dirname}/../react-client/dist`, 'index.html'));
});

app.get('/', (req, res) => {
  res.status(200).json();
});

app.get('/testing', (req, res) => {
  res.status(200);
  res.send('GET request to testing');
});


app.listen(port, () => {
  console.log('listening on port 3000!');
});

module.exports = app;
