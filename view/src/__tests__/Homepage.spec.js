import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Homepage from '../components/Homepage';
import SearchHikes from '../components/SearchHikes';

configure({ adapter: new Adapter() });

describe('Homepage::', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {};
    wrapper = shallow(<Homepage {...props} />);
  });

  describe('Rendering::', () => {
    it('Has the simple searchHikes component', () => {
      expect(wrapper.find(SearchHikes)).toHaveLength(1);
    });
  });
});