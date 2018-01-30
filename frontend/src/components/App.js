import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {
  getBooks = () => {
    Axios('/books', {withCredentials: true})
      .then(res => {
        console.log(res);
      })
      .catch (err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <span onClick={this.getBooks}>Get books list</span>
        <form action="/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Log In"/>
          </div>
        </form>
        <form action="/register" method="post">
          <div>
            <label>email:</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Sign up"/>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
