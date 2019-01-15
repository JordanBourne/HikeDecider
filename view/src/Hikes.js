import React, { Component } from 'react';
import SearchHikes from './SearchHikes';
import DisplayHikes from './DisplayHikes';

class Hikes extends Component {
  state = {
    hikes: {
      doableHikes: [],
      stretchHikes: [],
      tooLongHikes: []
    }
  }

  setDoable = hikes => {
    this.setState(state => {
      return state.hikes.doableHikes = hikes;
    });
  }

  setStretch = hikes => {
    this.setState(state => {
      return state.hikes.stretchHikes = hikes;
    });
  }

  setTooLong = hikes => {
    this.setState(state => {
      return state.hikes.tooLongHikes = hikes;
    });
  }

  render() {
    return (
      <div>
        <SearchHikes setDoable={this.setDoable} setStretch={this.setStretch} setTooLong={this.setTooLong}/>
        <DisplayHikes hikes={this.state.hikes}/>
      </div>
    );
  }
}

export default Hikes;
