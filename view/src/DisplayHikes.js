import React, { Component } from 'react';
import axios from 'axios';

class DisplayHikes extends Component {
  state = {
    hikeList: [...this.props.hikes.doableHikes, ...this.props.hikes.stretchHikes],
    orderedHikes: this.props.orderedHikes,
    startPoint: 10
  }

  createDetails = (hike, key) => {
    return (
      <p key={key}>
        Trail Name: {hike.trail.name} <br />
        Trail Length: {hike.trail.length} Miles<br />
        Trail Difficulty: {hike.trail.difficulty} <br />
        Driving Distance: {hike.distanceDetails.routes[0].legs[0].distance.text} <br />
        Driving Time: {hike.distanceDetails.routes[0].legs[0].duration.text} <br />
        Time to Hike: {Math.floor(hike.timeToHike / 60 / 60 * 10) / 10} Hours<br />
      </p>
    );
  }

  printHikes = () => {
    const hikeList = [];

    if (this.props.hikes) {
      if (this.props.hikes.doableHikes) {
        this.props.hikes.doableHikes.forEach((hike, key) => {
          hikeList.push(this.createDetails(hike, key));
        });
      }
      if (this.props.hikes.stretchHikes) {
        this.props.hikes.stretchHikes.forEach((hike, key) => {
          hikeList.push(this.createDetails(hike, key));
        });
      }
    }

    return hikeList;
  }

  getNextTrail = () => {
    const trailList = [...this.state.hikeList];
    trailList.push(trailList.shift());

    this.setState(state => {
      return state.hikeList = trailList;
    });
  }

  updateSuggestedTrail = (newTrail) => {
    const trailList = [...this.state.hikeList];
    const trailIndex = trailList.indexOf(newTrail);
    trailList.splice(trailIndex, 1)
    trailList.unshift(newTrail);

    this.setState(state => {
      return state.hikeList = trailList;
    });
  }

  getShorterDistance = () => {
    const currentHike = this.state.hikeList[0];
    const currentIndex = this.props.orderedHikes.byLength.indexOf(currentHike);
    if (currentIndex !== 0) {
      const newHike = this.props.orderedHikes.byLength[currentIndex - 1];
      return this.updateSuggestedTrail(newHike);
    }

    this.props.renderNoMoreHikes();
  }

  getLongerDistance = () => {
    const currentHike = this.state.hikeList[0];
    const currentIndex = this.props.orderedHikes.byLength.indexOf(currentHike);
    if (currentIndex !== this.state.hikeList.length - 1) {
      const newHike = this.props.orderedHikes.byLength[currentIndex + 1];
      return this.updateSuggestedTrail(newHike);
    }

    this.props.renderNoMoreHikes();
  }

  getShorterDrive = () => {
    const currentHike = this.state.hikeList[0];
    const currentIndex = this.props.orderedHikes.byDrivingDistance.indexOf(currentHike);
    if (currentIndex !== 0) {
      const newHike = this.props.orderedHikes.byDrivingDistance[currentIndex - 1];
      return this.updateSuggestedTrail(newHike);
    }

    this.props.renderNoMoreHikes();
  }

  getLongerDrive = () => {
    const currentHike = this.state.hikeList[0];
    const currentIndex = this.props.orderedHikes.byDrivingDistance.indexOf(currentHike);
    if (currentIndex !== this.state.hikeList.length - 1) {
      const newHike = this.props.orderedHikes.byDrivingDistance[currentIndex + 1];
      return this.updateSuggestedTrail(newHike);
    }

    this.props.renderNoMoreHikes();
  }

  getLessDifficult = () => {
    const currentHike = this.state.hikeList[0];
    const currentIndex = this.props.orderedHikes.byDifficulty.indexOf(currentHike);
    if (currentIndex !== 0) {
      const newHike = this.props.orderedHikes.byDifficulty[currentIndex - 1];
      return this.updateSuggestedTrail(newHike);
    }

    this.props.renderNoMoreHikes();
  }

  getMoreDifficult = () => {
    const currentHike = this.state.hikeList[0];
    const currentIndex = this.props.orderedHikes.byDifficulty.indexOf(currentHike);
    if (currentIndex !== this.state.hikeList.length - 1) {
      const newHike = this.props.orderedHikes.byDifficulty[currentIndex + 1];
      return this.updateSuggestedTrail(newHike);
    }

    this.props.renderNoMoreHikes();
  }

  loadMoreHikes = () => {
    axios.get(`${this.props.url}&startPoint=${this.state.startPoint}`)
      .then(response => {
        this.props.addHikes(response.body);
        this.updateStartPoint();
      });
  }

  updateStartPoint = () => {
    this.setState(state => {
      return state.startPoint += 10;
    });
  }


  render() {
    let noMoreHikes;
    if (this.props.noMoreHikes) {
      noMoreHikes = <button onClick={this.loadMoreHikes}>Load More Hikes</button>
    }

    return (
      <div>
        Suggested Hike: {this.createDetails(this.state.hikeList[0], 12345)}
        <button onClick={this.getNextTrail}>Next Suggestion</button>
        <button onClick={this.getShorterDistance}>Shorter Hike</button>
        <button onClick={this.getLongerDistance}>Longer Hike</button>
        <button onClick={this.getShorterDrive}>Closer Drive</button>
        <button onClick={this.getLongerDrive}>Longer Drive</button>
        <button onClick={this.getLessDifficult}>Less Difficult</button>
        <button onClick={this.getMoreDifficult}>More Difficult</button>
        {noMoreHikes}
      </div>
    );
  }
}

export default DisplayHikes;
