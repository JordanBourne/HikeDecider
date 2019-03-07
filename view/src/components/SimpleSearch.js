import React from 'react';
import AddressSearch from './AddressSearch'

function SimpleSearch(props) {
  return (
    <div>
      <AddressSearch />
      <button data-test="search-button"/>
    </div>
  );
}

export default SimpleSearch;
