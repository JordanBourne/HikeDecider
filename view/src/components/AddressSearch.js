import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import AddressDropdown from './AddressDropdown';

function AddressSearch(props) {
  const [ address, setAddress ] = useState('');

  function handleChange(address) {
    setAddress(address);
  };

  async function handleSelect(address) {
    await geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => props.setCoordinates(latLng))
      .catch(error => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
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

export default AddressSearch;
