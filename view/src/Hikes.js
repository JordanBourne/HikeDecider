import React, { Component } from 'react';
import SearchHikes from './SearchHikes';
import DisplayHikes from './DisplayHikes';
import { difficultyMap } from '../utils'

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
    },
    noMoreHikes: false,
    url: ''
  }

  setHikes = hikes => {
    this.setState(state => {
      state.hikes.doableHikes = hikes.doable;
      state.hikes.stretchHikes = hikes.stretch;
    }, this.updateOrderedHikes);
  }

  addHikes = hikes => {
    this.setState(state => {
      state.hikes.doableHikes = this.addNonDuplicate(state.hikes.doableHikes, hikes.doable);
      state.hikes.stretchHikes = this.addNonDuplicate(state.hikes.stretchHikes, hikes.stretch);
    }, this.updateOrderedHikes);
  }

  addNonDuplicate = (hikes, moreHikes) => {
    let hikeMap = {};
    
    hikes.forEach(hike => {
      hikeMap[hike.trail.name] = true;
    });

    moreHikes.forEach(hike => {
      if (!hikeMap[hike.trail.name]) {
        hikes.push(hike);
      }
    });

    return hikes;
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

  renderNoMoreHikes = () => {
    this.setState(state => {
      return state.noMoreHikes = true;
    });
  }

  hideNoMoreHikes = () => {
    this.setState(state => {
      return state.noMoreHikes = false;
    });
  }

  setUrl = url => {
    this.setState(state => {
      return state.url = url;
    });
  }

  render() {
    let hikes;
    if (this.state.hikes.doableHikes.length > 0) {
      hikes = <DisplayHikes 
        hikes={this.state.hikes} 
        orderedHikes={this.state.orderedHikes} 
        renderNoMoreHikes={this.renderNoMoreHikes}
        noMoreHikes={this.state.noMoreHikes}
        url={this.state.url}
        addHikes={this.addHikes}
      />
    }

    return (
      <div>
        <SearchHikes 
          setHikes={this.setHikes}
          setTooLong={this.setTooLong} 
          updateOrderedHikes={this.updateOrderedHikes}
          hideNoMoreHikes={this.hideNoMoreHikes}
          setUrl={this.setUrl}
        />
        {hikes}
      </div>
    );
  }
}

export default Hikes;
