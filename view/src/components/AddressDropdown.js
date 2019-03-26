import React from 'react';

function AddressDropdown(props) {
  const {
    getInputProps,
    loading,
    suggestions,
    getSuggestionItemProps
  } = props;

  return (
    <div>
      <div className="autocomplete-root">
        <input {...getInputProps()} />
        <div className="autocomplete-dropdown-container" data-test="addressDropdown">
          {loading && <div data-testid="loading">Loading...</div>}
          {suggestions.map((suggestion, index) => (
            <div {...getSuggestionItemProps(suggestion)} data-testid="suggestionItem" key={index}>
              <span>{suggestion.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddressDropdown;