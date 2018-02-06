const mongoClient = require('mongodb').MongoClient;

class Books {
  static getBooks() {

  }

  static async insertBook(req, res) {
    const title = req.body.title;
    const author = req.body.author;
    const userId = req.session.passport.user;

    let file, mimeType, fileName;

    if (req.files && req.files.length && req.files[0].buffer) {
      file = req.files[0].buffer && req.files[0].buffer.toString('utf8');
      mimeType = req.files[0].mimetype;// TODO must be 'text/plain'
      fileName = req.files[0].originalname;
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
        file,
        fileName,
        userId
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

  static deleteBook() {

  }
}

module.exports = Books;
