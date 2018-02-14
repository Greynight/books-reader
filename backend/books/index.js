const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

class Books {
  static async getBooks(req, res) {
    try {
      const client = await mongoClient.connect(process.env.DB_URL);
      const db = client.db('books');
      const result = await db.collection('books').find({}, {
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

      // TODO delete book from the db
      // TODO what should be done with all statistics?
  }

  static async loadBook(req, res) {
    try {
      const client = await mongoClient.connect(process.env.DB_URL);
      const db = client.db('books');
      const result = await db.collection('books').findOne({_id: new ObjectID('5a79aee3b1086d315ce7b753')});
//console.log(Object.keys(result));
      let text = '';

      if (result && result.file) {
        text = result.file.slice(0, 10000);
        //text = text.replace(new RegExp('\r?\n','g'), '<br class="br" />');
        //text = '<p>' + text.replace(/\r\n/g, "</p><p>").replace(/\n/g, "</p><p>") + '</p>';
        const re = /\r\n*/;
        //var nameList = names.split(re);
        text = text.split(re);
        //text = text.map(item => `<p>${item}</p>`);
      }

      res.status(200).json(text);

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
