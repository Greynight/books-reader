import axios from 'axios';

const config = {
  withCredentials: true
};

class Book {
  static async upload(data) {
    const { title, author, file } = data;

    let form = new FormData();

    form.append('title', title);
    form.append('author', author);
    form.append('file', file);

    // show progress bar
    // var config = {
    //   onUploadProgress: function(progressEvent) {
    //     var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
    //   }
    // };

    return await axios.post(process.env.REACT_APP_UPLOAD, form, config);
  }

  static async getList() {
    // TODO cache
    const result = await axios.get(process.env.REACT_APP_GET_BOOKS, config);
    return result.data;
  }

  static async delete(id) {
    const result = await axios.delete(`${process.env.REACT_APP_GET_BOOKS}/${id}`, config);
    return result.data;
  }
}

export default Book;
