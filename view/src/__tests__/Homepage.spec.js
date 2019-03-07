import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Homepage from '../components/Homepage';
import SimpleSearch from '../components/SimpleSearch';

configure({ adapter: new Adapter() });

describe('Homepage::', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {};
    wrapper = shallow(<Homepage {...props} />);
  });

  describe('Rendering::', () => {
    it('Has the simple SimpleSearch component', () => {
      expect(wrapper.find(SimpleSearch)).toHaveLength(1);
    });
  });
});