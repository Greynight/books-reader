import React, { Component } from 'react';

class App extends Component {
  getBooks = () => {
    fetch('/books', {credentials: 'include'})
      .then(res => res.json())
      .then(res => {
        console.log(res);
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
      </div>
    );
  }
}

export default App;
