import React, { Component } from 'react';
import SearchHikes from './SearchHikes';
import DisplayHikes from './DisplayHikes';

const difficultyMap = {
  'green': 0,
  'greenBlue': 1,
  'blue': 2,
  'blueBlack': 3,
  'black': 4,
  'dBlack': 5
};

class Hikes extends Component {
  state = {
    hikes: {
      doableHikes: [],
      stretchHikes: []
    },
    orderedHikes: {
      byLength: [],
      byDifficulty: [],
      byHikingTime: [],
      byDrivingDistance: []
    }
  }

  setHikes = hikes => {
    this.setState(state => {
      state.hikes.doableHikes = state.hikes.doableHikes.concat(hikes.doable);
      return state.hikes.stretchHikes = state.hikes.stretchHikes.concat(hikes.stretch);
    }, this.updateOrderedHikes);
  }

  setDoable = hikes => {
    this.setState(state => {
      return state.hikes.doableHikes = state.hikes.doableHikes.concat(hikes);
    });
  }

  setStretch = hikes => {
    this.setState(state => {
      return state.hikes.stretchHikes = state.hikes.stretchHikes.concat(hikes);
    });
  }

  updateOrderedHikes = () => {
    const hikeCopy = [...this.state.hikes.doableHikes, ...this.state.hikes.stretchHikes];
    const lengthOrder = [...hikeCopy].sort((a, b) => a.trail.length - b.trail.length);
    const timeToHikeOrder = [...hikeCopy].sort((a, b) => a.timeToHike - b.timeToHike);
    const difficultyOrder = [...hikeCopy].sort((a, b) => {
      return difficultyMap[a.trail.difficulty] - difficultyMap[b.trail.difficulty]
    });
    const drivingTimeSort = [...hikeCopy].sort((a, b) => 
      a.distanceDetails.routes[0].legs[0].duration.value - b.distanceDetails.routes[0].legs[0].duration.value
    );

    this.setState(state => {
      return state.orderedHikes = {
        byLength: lengthOrder,
        byDifficulty: difficultyOrder,
        byHikingTime: timeToHikeOrder,
        byDrivingDistance: drivingTimeSort
      }
    });
  }

  render() {
    let hikes;
    if (this.state.hikes.doableHikes.length > 0) {
      hikes = <DisplayHikes hikes={this.state.hikes} orderedHikes={this.state.orderedHikes}/>
    }

    return (
      <div>
        <SearchHikes 
          setHikes={this.setHikes}
          setTooLong={this.setTooLong} 
          updateOrderedHikes={this.updateOrderedHikes}
        />
        {hikes}
      </div>
    );
  }
}

export default Hikes;
