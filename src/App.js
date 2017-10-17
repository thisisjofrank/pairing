import React, { Component } from 'react';
import logo from './img/pear.png';
import './App.css';
import List from './components/list'
import PairUp from './components/pairup'
import {DebounceInput} from 'react-debounce-input';

let data = [];

function remove(array, element) {
  const index = array.indexOf(element);
  
  if (index !== -1) {
      array.splice(index, 1);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      term: '',
      items: [],
      selected: []
    }
  }
  onChange = (e) => {
    let string = e.target.value;

    if (string.indexOf(',') > -1) {
      string = string.replace(/\s\s+/g, ',');
      string = string + ',sfe';
      string = string.split('.');
      string.forEach((s, i) => {
        s = s.substring(1);
        s = s.replace(/,[^,]+$/, "");
        s = s.split(',');
        string[i] = s;
        this.setState({
          items: [...this.state.items, string[i]]
        })
      });
    }
    this.setState({term: string});
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
    data = [...this.state.items, this.state.term];
  }

  onRemove = (e) => {
    let i = e.target.getAttribute('item');
    data.splice(i, 1);
    this.setState({
      items: data
    });
  }

  onCheck = (e) => {
    if (e.target.checked) {
      this.setState({
        selected: [...this.state.selected, e.target]
      });
    } else {
      remove(this.state.selected, e.target);
    }
   console.log(this.state.selected);
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
            <DebounceInput
              minLength={1}
              debounceTimeout={300}
              value={this.state.term} 
              onChange={this.onChange} 
              />
            <button>Submit</button>
          </form>
          <ul className="list">
            <List 
              items={this.state.items} 
              onremove={this.onRemove} 
              oncheck={this.onCheck}
            />
          </ul>
          { this.state.selected > 0
              ? <PairUp />
              : null
          }
        </div>
      </div>
    );
  }
}
