const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

/**
 * Serialize user to store in session
 * @param user
 * @param done
 */
const serializeUser = (user, done) => {
  done(null, user._id);
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
    const user = await db.collection('users').findOne({_id: new ObjectID(id)});

    done(null, user);
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
