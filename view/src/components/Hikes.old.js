import React, { Component } from 'react';
import SearchHikes from './SearchHikes.old';
import DisplayHikes from './DisplayHikes.old';
import AddressSearch from './AddressSearch.old';
import { difficultyMap } from '../config'

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
    url: '',
    lat: 0,
    lon: 0
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

  setUrl = newUrl => {
    this.setState({ url: newUrl });
  }

  setCoordinates = ({ lat, lng: lon }) => {
    this.setState({ lat, lon });
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
        <AddressSearch setCoordinates={this.setCoordinates} />
        <SearchHikes 
          setHikes={this.setHikes}
          setTooLong={this.setTooLong} 
          updateOrderedHikes={this.updateOrderedHikes}
          hideNoMoreHikes={this.hideNoMoreHikes}
          setUrl={this.setUrl}
          lat={this.state.lat}
          lon={this.state.lon}
        />
        {hikes}
      </div>
    );
  }
}

export default Hikes;
