import React, { Component } from 'react';
const ANIMALS = ['dog', 'cat', 'monkey', 'turtle']

class SearchHikes extends Component {
  state = {
    location: "Seattle, WA",
    animal: "",
    breed: ""
  };

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState({
      animal: event.target.value
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
        <label htmlFor="animal">
        Animal
        <select
          id="animal"
          value={this.state.animal}
          onChange={this.handleAnimalChange}
          onBlur={this.handleAnimalChange}
        >
          <option />
          {ANIMALS.map(animal => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
      </label>
      </div>
    );
  }
}

export default SearchHikes;