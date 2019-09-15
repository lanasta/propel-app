import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activities, title, faName } = this.props;
    return (
      <div className="Dialog-box">
          <div className="Dialog-header"><i class={`nudge-right fas ${faName}`}></i>{title}</div>
        <div className="Dialog-content">
          { activities.length ? <div> Something goin</div> : <div>There are currently no activities available.</div> }
        </div>
      </div>
    );
  }
}

export default Dialog;
