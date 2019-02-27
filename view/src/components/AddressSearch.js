import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import AddressDropdown from './AddressDropdown';

class AddressSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.setCoordinates(latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <AddressDropdown 
            getInputProps={getInputProps}
            suggestions={suggestions}
            getSuggestionItemProps={getSuggestionItemProps}
            loading={loading}
          />
        )}
      </PlacesAutocomplete>
    );
  }
}

export default AddressSearch;