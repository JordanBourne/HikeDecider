import React, { Component } from 'react';

class DisplayHikes extends Component {
  createDetails = (hike, key) => {
    return (
      <p key={key}>
        Trail Name: {hike.trail.name} <br />
        Trail Length: {hike.trail.length} <br />
        Trail Difficulty: {hike.trail.difficulty} <br />
        Driving Distance: {hike.distanceDetails.routes[0].legs[0].distance.text} <br />
        Driving Time: {hike.distanceDetails.routes[0].legs[0].duration.text} <br />
        Time to Hike: {Math.floor(hike.timeToHike)} <br />
      </p>
    );
  }

  printHikes = () => {
    const hikeList = [];

    if (this.props.hikes) {
      if (this.props.hikes.doableHikes) {
        console.log('## SETTING DOABLE HIKES ##');
        hikeList.push(<h2>Doable Hikes</h2>);
        this.props.hikes.doableHikes.forEach((hike, key) => {
          hikeList.push(this.createDetails(hike, key));
        });
      }
      if (this.props.hikes.stretchHikes) {
        hikeList.push(<h2>Stretch Hikes</h2>);
        this.props.hikes.stretchHikes.forEach((hike, key) => {
          hikeList.push(this.createDetails(hike, key));
        });
      }
      if (this.props.hikes.tooLongHikes) {
        hikeList.push(<h2>Too Long Hikes</h2>);
        this.props.hikes.tooLongHikes.forEach((hike, key) => {
          hikeList.push(this.createDetails(hike, key));
        });
      }
    }

    console.log(hikeList);

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
