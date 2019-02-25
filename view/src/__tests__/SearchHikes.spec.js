import React from 'react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchHikes from '../SearchHikes';
import { hikesState } from './__mocks__/hikesState';

configure({ adapter: new Adapter() });

describe('SearchHikes::', () => {
  let wrapper;
  let props;
  let axiosMock;

  beforeEach(() => {
    axiosMock = jest.spyOn(axios, 'get');
    props = {
      setHikes: jest.fn(),
      setTooLong: jest.fn(),
      updateOrderedHikes: jest.fn(),
      hideNoMoreHikes: jest.fn(),
      setUrl: jest.fn()
    };
    wrapper = shallow(<SearchHikes {...props} />);
  });

  describe('Rendering::', () => {
    it('Has 9 labels, 6 inputs, and 3 dropdowns', () => {
      expect(wrapper.find('label')).toHaveLength(9);
      expect(wrapper.find('input')).toHaveLength(6);
      expect(wrapper.find('select')).toHaveLength(3);
    });
  });

  describe('Functions::', () => {
    it('Clicking next cycles through trails', () => {
      const button = wrapper.find('button');
      button.simulate('click');
      expect(axiosMock).toBeCalledWith('http://localhost:1337/getHikes?lat=40.39439&lon=-105.07058&maxDistanceToTrail=50&minTrailLength=0&maxTrailLength=20&rating=1&difficulty=4&experience=beginner&ignoreTimeRestriction=false');
    });
    it('Url should be generated depending on the state', () => {
      wrapper.setState({
        lat: 1,
        lon: 2,
        maxDistanceToTrail: 3,
        minTrailLength: 4,
        maxTrailLength: 5,
        rating: 6,
        difficulty: 'Easy',
        experience: 'Thing',
        ignoreTimeRestriction: true
      });
      const url = wrapper.instance().buildUrl();;
      expect(url).toEqual('http://localhost:1337/getHikes?lat=1&lon=2&maxDistanceToTrail=3&minTrailLength=4&maxTrailLength=5&rating=6&difficulty=1&experience=Thing&ignoreTimeRestriction=true');
    });
  });
});