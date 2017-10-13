import React, { Component } from 'react';
import logo from './img/pear.png';
import './App.css';
import List from './components/list'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      term: '',
      items: []
    }
  }
  onChange = (e) => {
    let string = e.target.value;
    string = string.replace(/\s\s+/g, ',');
    string = string + ',sfe';
    string = string.split('.');
    string.forEach((s, i) => {
      s = s.substring(1);
      s = s.replace(/,[^,]+$/, "");
      s = s.split(',');
      string[i] = s;
      return s;
    });
  
    console.log(string);
    this.setState({term: string});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pairing</h1>
        </header>
        <div className="App-intro">
        <form className="App" onSubmit={this.onSubmit}>
            <input value={this.state.term} onChange={this.onChange} />
            <button>Submit</button>
        </form>
          <List items={this.state.items}/>
        </div>
      </div>
    );
  }
}
