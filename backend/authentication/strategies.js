const mongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');

/**
 * Compares passwords hashes
 * @param user
 * @param password
 * @returns {boolean}
 */
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

/**
 * Creates password hash
 * @param password
 * @returns {string|string}
 */
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

/**
 * Local authentication strategy to use with Passport
 * @param email
 * @param password
 * @param done
 * @returns {Promise<*>}
 */
const localAuthStrategy = async (email, password, done) => {
  try {
    const client = await mongoClient.connect(process.env.DB_URL);
    const db = client.db('books');
    const users = await db.collection('users').find({email: email}).limit(1).toArray();

    if (!users[0]) {
      return done(null, false);
    }

    if (!isValidPassword(users[0], password)) {
      return done(null, false);
    }

    return done(null, users[0]);

  } catch (err) {
    // TODO logging
    console.log(err.stack);
    return done(err);
  }
};

/**
 * Local registration strategy to use with Passport
 * @param email
 * @param password
 * @param done
 * @returns {Promise<*>}
 */
const localRegistrationStrategy = async (email, password, done) => {
  try {
    const client = await mongoClient.connect(process.env.DB_URL);
    const db = client.db('books');
    const users = await db.collection('users').find({email: email}).limit(1).toArray();

    if (users.length) {
      // TODO logging
      // TODO show message to user
      console.log('User already exists');
      return done(null, false);
    }

    const result = await db.collection('users').insertOne({
      email,
      password: createHash(password)
    });

    const newUser = result.ops[0];

    return done(null, newUser);
  } catch (err) {
    // TODO logging
    console.log('registration error', err.stack);

    return done(err);
  }
};

module.exports = {
  localAuthStrategy,
  localRegistrationStrategy
};
