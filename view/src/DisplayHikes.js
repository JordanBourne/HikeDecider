import React, { Component } from 'react';

class DisplayHikes extends Component {
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
        hikeList.push(<h2 key="1">Doable Hikes</h2>);
        this.props.hikes.doableHikes.forEach((hike, key) => {
          hikeList.push(this.createDetails(hike, key + 1000));
        });
      }
      if (this.props.hikes.stretchHikes) {
        hikeList.push(<h2 key="2">Stretch Hikes</h2>);
        this.props.hikes.stretchHikes.forEach((hike, key) => {
          hikeList.push(this.createDetails(hike, key + 2000));
        });
      }
      if (this.props.hikes.tooLongHikes) {
        hikeList.push(<h2 key="3">Too Long Hikes</h2>);
        this.props.hikes.tooLongHikes.forEach((hike, key) => {
          hikeList.push(this.createDetails(hike, key + 3000));
        });
      }
    }

    return hikeList;
  }

  render() {
    return (
      <div>
        Hikes: {this.printHikes()}
      </div>
    );
  }
}

export default DisplayHikes;
