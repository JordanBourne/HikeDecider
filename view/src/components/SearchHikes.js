import React, { Component } from 'react';
import axios from 'axios';

const EXPERIENCELEVELS = ['new', 'beginner', 'intermediate', 'advanced', 'expert'];
const DIFFICULTYLEVELS = ['Very Easy', 'Easy', 'Medium', 'Very Medium', 'Hard', 'Very Hard'];

class SearchHikes extends Component {
  state = {
    lat: this.props.lat,
    lon: this.props.lon,
    maxDistanceToTrail: 50,
    minTrailLength: 0,
    maxTrailLength: 20,
    rating: 1,
    difficulty: 'Hard',
    experience: 'beginner',
    ignoreTimeRestriction: false
  };

  handleInputChange = (fieldName, event) => {
    const value = event.target.value;
    this.setState(state => {
      return state[fieldName] = value;
    });
  };
  
  handleCheckboxChange = (fieldName) => {
    this.setState(state => {
      return state[fieldName] = !state[fieldName];
    });
  };

  buildUrl = () => {
    let url = `http://localhost:1337/getHikes?`;
    const keys = Object.keys(this.state);
    keys.forEach((key, index)=> {
      if (index !== 0) {
        url += '&'
      }
      if (key === 'difficulty') {
        url += `${key}=${DIFFICULTYLEVELS.indexOf(this.state[key])}`;
      } else {
        url += `${key}=${this.state[key]}`;
      }
    });

    return url;
  }

  submitForm = () => {
    this.props.hideNoMoreHikes();
    const url = this.buildUrl();

    axios.get(url)
      .then(response => {
        this.props.setHikes(response.data);
        this.props.setUrl(url);;
      });
  }
  
  render() {
    return (
      <div className="search-params">
        <label htmlFor="maxDistanceToTrail">
          Max Distance To Trail: 
          <input
            id="maxDistanceToTrail"
            type="number"
            value={this.state.maxDistanceToTrail}
            placeholder="Max Driving Distance"
            onChange={this.handleInputChange.bind(this, 'maxDistanceToTrail')}
          />
        </label>
        <br />
        <label htmlFor="minTrailLength">
          Minimum Trail Length: 
          <input
            id="minTrailLength"
            type="number"
            value={this.state.minTrailLength}
            placeholder="Min Trail Length"
            onChange={this.handleInputChange.bind(this, 'minTrailLength')}
          />
        </label>
        <br />
        <label htmlFor="maxTrailLength">
          Maximum Trail Length: 
          <input
            id="maxTrailLength"
            type="number"
            value={this.state.maxTrailLength}
            placeholder="Max Trail Length"
            onChange={this.handleInputChange.bind(this, 'maxTrailLength')}
          />
        </label>
        <br />
        <label htmlFor="experience">
          Experience (used to calculate hiking speed):
          <select
            id="experience"
            value={this.state.experience}
            onChange={this.handleInputChange.bind(this, 'experience')}
            onBlur={this.handleInputChange.bind(this, 'experience')}
          >
            <option />
            {EXPERIENCELEVELS.map(experience => (
              <option key={experience} value={experience}>
                {experience}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="difficulty">
          Max Trail Difficulty:
          <select
            id="difficulty"
            value={this.state.difficulty}
            onChange={this.handleInputChange.bind(this, 'difficulty')}
            onBlur={this.handleInputChange.bind(this, 'difficulty')}
          >
            <option />
            {DIFFICULTYLEVELS.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="rating">
          Trail Rating Minimum:
          <select
            id="rating"
            value={this.state.rating}
            onChange={this.handleInputChange.bind(this, 'rating')}
            onBlur={this.handleInputChange.bind(this, 'rating')}
          >
            <option />
            {[1,2,3,4,5].map(rating => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="ignoreTimeRestriction">
          Ignore Time Restriction:
          <input
            id="ignoreTimeRestriction"
            type="checkbox"
            checked={this.state.ignoreTimeRestriction}
            onChange={this.handleCheckboxChange.bind(this, 'ignoreTimeRestriction')}
          />
        </label>
        <br />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    );
  }
}

export default SearchHikes;
