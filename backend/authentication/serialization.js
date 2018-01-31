const mongoClient = require('mongodb').MongoClient;

/**
 * Serialize user to store in session
 * @param user
 * @param done
 */
const serializeUser = (user, done) => {
  done(null, user.email);
};

/**
 * deserialize user from sessions
 * @param id
 * @param done
 * @returns {Promise<void>}
 */
const deserializeUser = async (id, done) => {
  try {
    const client = await mongoClient.connect(process.env.DB_URL);
    const db = client.db('books');
    const users = await db.collection('users').find({email: id}).limit(1).toArray();
    done(null, users[0]);
  } catch (err) {
    // TODO logging
    console.log(err.stack);
    done(err);
  }
};

module.exports = {
  serializeUser,
  deserializeUser
};
