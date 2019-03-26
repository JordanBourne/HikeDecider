import React from 'react';
import AddressSearch from './AddressSearch'

function SimpleSearch() {
  return (
    <div>
      <AddressSearch />
      <button data-test="search-button">Search</button>
    </div>
  );
}

export default SimpleSearch;
