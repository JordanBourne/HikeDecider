import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SimpleSearch from '../components/SimpleSearch';
import AddressSearch from '../components/AddressSearch';

configure({ adapter: new Adapter() });

describe('Homepage::', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {};
    wrapper = shallow(<SimpleSearch {...props} />);
  });

  describe('Rendering::', () => {
    it('Has an address field and search button on simple render', () => {
      expect(wrapper.find(AddressSearch)).toHaveLength(1);
      expect(wrapper.find('[data-test="search-button"]')).toHaveLength(1);
    });
  });
});