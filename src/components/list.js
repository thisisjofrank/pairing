import React, { Component } from 'react';

export default class List extends Component {
    render() {
    return (
      this.props.items.map((item, index) => 
        <li key={index} className="list__item" draggable="true">
          <label>
            <input type="checkbox" onChange={this.props.oncheck} />
            {item}
          </label>
          <button onClick={this.props.onremove} item={index}>x</button>
        </li>
      ) 
    )
  }
};