import React, { Component } from 'react';
const EXPERIENCELEVELS = ['new', 'beginner', 'intermediate', 'advanced', 'expert'];

class SearchHikes extends Component {
  state = {
    location: "Seattle, WA",
    experienceLevel: "",
    breed: ""
  };

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleExperienceLevelChange = event => {
    this.setState({
      experienceLevel: event.target.value
    });
  };
  
  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location: 
          <input
            id="location"
            value={this.state.location}
            placeholder="Location"
            onChange={this.handleLocationChange}
          />
        </label>
        <br />
        <label htmlFor="experienceLevel">
        Experience:
        <select
          id="experienceLevel"
          value={this.state.experienceLevel}
          onChange={this.handleExperienceLevelChange}
          onBlur={this.handleExperienceLevelChange}
        >
          <option />
          {EXPERIENCELEVELS.map(experienceLevel => (
            <option key={experienceLevel} value={experienceLevel}>
              {experienceLevel}
            </option>
          ))}
        </select>
      </label>
      </div>
    );
  }
}

export default SearchHikes;