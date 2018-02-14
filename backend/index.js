require('dotenv').load();

const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

const { localAuthStrategy, localRegistrationStrategy } = require('./authentication/strategies');
const { deserializeUser, serializeUser } = require('./authentication/serialization');
const Books = require('./books');

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
const passwordConfig = {
  usernameField: 'email',
  passwordField: 'password'
};

passport.use('local-auth', new LocalStrategy(passwordConfig, localAuthStrategy));
passport.use('registration', new LocalStrategy(passwordConfig, localRegistrationStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/login',
  passport.authenticate('local-auth', {}),
  (req, res) => {
    res.json({text: 'Nice to see you'});
  }
);

app.post('/register',
  passport.authenticate('registration', {}),
  (req, res) => {
    //console.log(arguments);
    // TODO TODO TODO
    res.json({text: 'Nice to meet you'});
  }
);

// check if user is logged in
app.get('/user', isLoggedIn, (req, res) => {
  // TODO maybe send username
  res.json({
    result: 'user is logged'
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send('Please log in');
}


app.get('/books', isLoggedIn, Books.getBooks);

app.delete('/books/:id', isLoggedIn, Books.deleteBook);

app.post('/upload', isLoggedIn, upload.any(), Books.insertBook);

app.get('/load', isLoggedIn, Books.loadBook);

// TODO tmp


// upload book







// app.get('/login', (req, res) => {
//   res.json({
//     result: 'show login page'
//   });
// });

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
