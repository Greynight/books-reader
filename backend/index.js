require('dotenv').load();

const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const { localAuthStrategy, localRegistrationStrategy } = require('./authentication/strategies');
const { deserializeUser, serializeUser } = require('./authentication/serialization');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// TODO
//app.use(express.static(path.join(__dirname, './../frontend/build')));
app.use(express.static(path.join(__dirname, './../frontend/public')));

app.use(session({ secret: 'winterweatherdays', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;

passport.use('local-auth', new LocalStrategy(localAuthStrategy));
passport.use('registration', new LocalStrategy(localRegistrationStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/login',
  passport.authenticate('local-auth', {
    successRedirect: '/',
    failureRedirect: '/login',
    //failureFlash: false
  })
);

app.post('/register',
  passport.authenticate('registration', {
    successRedirect: '/',
    //failureRedirect: '/login',
    //failureFlash: false
}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send('Please log in');
}


app.get('/books', isLoggedIn, (req, res) => {
  //console.log(passport);
  res.json({
    result: 'booksList'
  });

});

// TODO tmp


// upload book







app.get('/login', (req, res) => {
  res.json({
    result: 'show login page'
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }

  console.log(`Application is listening to port ${process.env.PORT}`);
});
