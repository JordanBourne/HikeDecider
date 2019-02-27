import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import AddressSearch from '../components/AddressSearch';
import AddressDropdown from '../components/AddressDropdown';

configure({ adapter: new Adapter() });

describe('AddressSearch::', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddressSearch />);
  });

  describe('Rendering::', () => {
    it('Has AddressSearch componenet', () => {
      expect(wrapper.find(PlacesAutocomplete)).toHaveLength(1);
    });
  });

  describe('Functions::', () => {
    it('Sets hikes to state accordingly', () => {
    });
  });
});