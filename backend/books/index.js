const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const TEXT_PORTION = 8000;

const textToArray = (text) => {
  const re = /\r\n*/;
  return text.split(re).filter(item => !!item);
};

class Books {
  static async getBooks(req, res) {
    try {
      const client = await mongoClient.connect(process.env.DB_URL);
      const db = client.db('books');
      const userId = req.session.passport.user;

      const result = await db.collection('books').find({
        userId
      }, {
        projection: {
          _id: 1,
          title: 1,
          author: 1,
          fileName: 1
        }
      }).toArray();

      res.status(200).json(result);

      // TODO
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: err
      });
    }
  }

  static async insertBook(req, res) {
    const title = req.body.title.trim();
    const author = req.body.author.trim();
    const userId = req.session.passport.user;

    let file, mimeType, fileName;

    if (req.files && req.files.length && req.files[0].buffer) {
      file = req.files[0].buffer && req.files[0].buffer.toString('utf8');
      mimeType = req.files[0].mimetype;// TODO check, must be 'text/plain'
      fileName = req.files[0].originalname.trim();
    } else {
      // TODO
      res.status(500).json({
        error: 'no files in upload request'
      });
    }

    try {
      const client = await mongoClient.connect(process.env.DB_URL);
      const db = client.db('books');
      const result = await db.collection('books').insertOne({
        title,
        author,
        file: textToArray(file),
        fileName,
        userId,
        current: 0
      });

      res.status(200).json({
        book: {
          title: result.ops[0].title,
          author: result.ops[0].author,
          fileName: result.ops[0].fileName,
          _id: result.ops[0]._id
        }
      });

    // TODO
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: err
      });
    }
  }

  static async deleteBook(req, res) {
    const id = req.params.id;

    try {
      const client = await mongoClient.connect(process.env.DB_URL);
      const db = client.db('books');

      // TODO check and log correct deletion
      await db.collection('books').deleteOne({_id: new ObjectID(id)});

      res.status(200).json({id});
    } catch (err) {
      console.log(err);

      // TODO
      res.status(500).json({
        error: err
      });
    }
  }

  static async loadBook(req, res) {
    try {
      const { forward, id, bookOffset = 0} = req.query;
      const client = await mongoClient.connect(process.env.DB_URL);
      const db = client.db('books');
      const result = await db.collection('books').findOne({_id: new ObjectID(id)});

      let text = '';
      let offset, pageEnd;

      if (result && result.file) {
        //const offset = req.params.offset || result.bookMark;
        if (forward) {
          offset = bookOffset;
          pageEnd = offset + TEXT_PORTION;
        } else {
          pageEnd = result.current;
          offset = (pageEnd - TEXT_PORTION > 0) ? (pageEnd - TEXT_PORTION) : 0;
        }

        //let offset = result.current;
        //let pageEnd =  ? offset + TEXT_PORTION : offset - TEXT_PORTION;

        text = result.file.slice(offset, pageEnd);

        await db.collection('books').update({_id: new ObjectID(id)}, {
          $set: {
            current: bookOffset
          }
        });
      }

      res.status(200).json({
        text,
        direction: forward
      });

      // TODO
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: err
      });
    }
  }
}

module.exports = Books;
