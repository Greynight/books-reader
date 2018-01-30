const express = require('express');
const helmet = require('helmet');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
//app.use(express.static(path.join(__dirname, './../frontend/build')));
app.use(express.static(path.join(__dirname, './../frontend/public')));
app.use(session({ secret: 'winterweatherdays', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use((err, request, response, next) => {
  // errors logging with console.log
  console.log(err);
  response.status(500).send('Something is broken!');
});

const LocalStrategy = require('passport-local').Strategy;

const isValidPassword = function(user, password) {
  return bcrypt.compareSync(password, user.password);
};

const createHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

passport.use('local-auth', new LocalStrategy(async function(email, password, done) {
    try {
      let client = await mongoClient.connect('mongodb://localhost:27017');

      const db = client.db('books');

      const users = await db.collection('users').find({email: email}).limit(1).toArray();

      console.log('users', users);

      //if (err) { return done(err); }
      if (!users[0]) { return done(null, false); }

      if (!isValidPassword(users[0], password)) {
        return done(null, false);
      }

      return done(null, users[0]);

    } catch (err) {
      console.log(err.stack);

      return done(err);
    }
  }
));

passport.use('registration', new LocalStrategy(async function(email, password, done) {
    console.log('registration');
    try {
      let client = await mongoClient.connect('mongodb://localhost:27017');

      const db = client.db('books');
      const users = await db.collection('users').find({email: email}).limit(1).toArray();

      if (users.length) {
        console.log('User already exists');
        return done(null, false);
      }

      // TODO check errors
      let result = await db.collection('users').insertOne({
        email,
        password: createHash(password)
      });

      let newUser = result.ops[0];

      console.log(newUser);

      return done(null, newUser);
    } catch (err) {
      console.log('registration error', err.stack);

      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user.email);
});

passport.deserializeUser(async function(id, done) {
  console.log('deserializeUser');
  try {
    let client = await mongoClient.connect('mongodb://localhost:27017');
    const db = client.db('books');
    const users = await db.collection('users').find({email: id}).limit(1).toArray();
    done(null, users[0]);
  } catch (err) {
    console.log(err.stack);
    done(err);
  }
});


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

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }

  console.log(`Application is listening to port ${port}`);
});
