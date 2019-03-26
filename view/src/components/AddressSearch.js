import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import AddressDropdown from './AddressDropdown';
import urlUtils from '../utils/urlUtils';

function AddressSearch() {
  const [ address, setAddress ] = useState('');

  function handleChange(newAddress) {
    setAddress(newAddress);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={(address) => handleSelect(address)}
      data-testid="google-address-search"
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

export const handleSelect = async (address) => 
  await geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => urlUtils.goToSearch(latLng))
    .catch(error => console.error('Error', error));

export default AddressSearch;
