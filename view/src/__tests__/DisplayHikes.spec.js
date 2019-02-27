import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DisplayHikes from '../components/DisplayHikes';
import { hikesState } from './__mocks__/hikesState';

configure({ adapter: new Adapter() });

describe('DisplayHikes::', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      hikes: hikesState.hikes, 
      orderedHikes: hikesState.orderedHikes, 
      renderNoMoreHikes: jest.fn(),
      noMoreHikes: hikesState.noMoreHikes,
      url: hikesState.url,
      addHikes: jest.fn()
    };
    wrapper = shallow(<DisplayHikes {...props} />);
  });

  describe('Rendering::', () => {
    it('Has 7 buttons', () => {
      expect(wrapper.find('button')).toHaveLength(7);
    });
  });

  describe('Functions::', () => {
    it('Clicking next cycles through trails', () => {
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.hikes.doableHikes[0]);
      wrapper.find('#next').simulate('click');
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.hikes.doableHikes[1]);
    });

    it('Clicking shorter hike gets the next shortest hike', () => {
      const startingIndex = props.orderedHikes.byLength.map(hike => 
        hike.trail.name).indexOf(wrapper.instance().state.hikeList[0].trail.name);
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.hikes.doableHikes[0]);
      wrapper.find('#getShorterDistance').simulate('click');
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.orderedHikes.byLength[startingIndex - 1]);
    });

    it('Clicking shorter hike gets the next shortest hike', () => {
      const startingIndex = props.orderedHikes.byLength.map(hike => 
        hike.trail.name).indexOf(wrapper.instance().state.hikeList[0].trail.name);
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.hikes.doableHikes[0]);
      wrapper.find('#getLongerDistance').simulate('click');
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.orderedHikes.byLength[startingIndex + 1]);
    });

    it('Clicking shorter hike gets the next shortest hike', () => {
      const startingIndex = props.orderedHikes.byDrivingDistance.map(hike => 
        hike.trail.name).indexOf(wrapper.instance().state.hikeList[0].trail.name);
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.hikes.doableHikes[0]);
      wrapper.find('#getShorterDrive').simulate('click');
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.orderedHikes.byDrivingDistance[startingIndex - 1]);
    });

    it('Clicking shorter hike gets the next shortest hike', () => {
      const startingIndex = props.orderedHikes.byDrivingDistance.map(hike => 
        hike.trail.name).indexOf(wrapper.instance().state.hikeList[0].trail.name);
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.hikes.doableHikes[0]);
      wrapper.find('#getLongerDrive').simulate('click');
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.orderedHikes.byDrivingDistance[startingIndex + 1]);
    });

    it('Clicking shorter hike gets the next shortest hike', () => {
      const startingIndex = props.orderedHikes.byDifficulty.map(hike => 
        hike.trail.name).indexOf(wrapper.instance().state.hikeList[0].trail.name);
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.hikes.doableHikes[0]);
      wrapper.find('#getLessDifficult').simulate('click');
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.orderedHikes.byDifficulty[startingIndex - 1]);
    });

    it('Clicking shorter hike gets the next shortest hike', () => {
      const startingIndex = props.orderedHikes.byDifficulty.map(hike => 
        hike.trail.name).indexOf(wrapper.instance().state.hikeList[0].trail.name);
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.hikes.doableHikes[0]);
      wrapper.find('#getMoreDifficult').simulate('click');
      expect(wrapper.instance().state.hikeList[0]).toEqual(props.orderedHikes.byDifficulty[startingIndex + 1]);
    });
  });
});