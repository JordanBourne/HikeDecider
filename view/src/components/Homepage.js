import React from 'react';
import SearchHikes from './SearchHikes';

function Homepage() {
  return (
    <div>
      <SearchHikes showAdvanced={false} />
    </div>
  );
}

export default Homepage;