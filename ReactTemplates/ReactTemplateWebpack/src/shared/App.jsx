import React, { Component } from 'react';
import styles from './app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <h1>My Component</h1>
        <p>Count: {count}</p>
        <button onClick={this.incrementCount}>+++</button>
      </div>
    );
  }
}

export default App;
