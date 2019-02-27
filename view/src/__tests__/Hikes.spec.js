import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Hikes from '../components/Hikes';
import SearchHikes from '../components/SearchHikes';
import DisplayHikes from '../components/DisplayHikes';
import AddressSearch from '../components/AddressSearch';
import { hikeMocks } from './__mocks__/hikeMocks';
import { difficultyMap } from '../utils';

configure({ adapter: new Adapter() });

describe('Hikes::', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Hikes />);
  });

  describe('Rendering::', () => {
    it('Has SearchHikes componenet', () => {
      expect(wrapper.find(SearchHikes)).toHaveLength(1);
      expect(wrapper.find(AddressSearch)).toHaveLength(1);
    });

    it('Has DisplayHikes component when doableHikes exist', () => {
      wrapper.setState({
        hikes: {
          doableHikes: [1,2,3]
        }
      });
      expect(wrapper.find(DisplayHikes)).toHaveLength(1);
    });
  });

  describe('Functions::', () => {
    it('Sets hikes to state accordingly', () => {
      wrapper.instance().setHikes(hikeMocks);
      expect(wrapper.instance().state.hikes.doableHikes).toHaveLength(8);
      expect(wrapper.instance().state.hikes.stretchHikes).toHaveLength(1);
      expect(wrapper.instance().state.orderedHikes.byLength).toHaveLength(9);
    });

    it('Orders the hikes appropriately', () => {
      wrapper.instance().setHikes(hikeMocks);
      const byLength = wrapper.instance().state.orderedHikes.byLength;
      const byDifficulty = wrapper.instance().state.orderedHikes.byDifficulty;
      const byHikingTime = wrapper.instance().state.orderedHikes.byHikingTime;
      const byDrivingDistance = wrapper.instance().state.orderedHikes.byDrivingDistance;

      const properLengthOrder = byLength.every((hike, index) => {
        if (index + 1 === byLength.length) return true;
        return hike.trail.length <= byLength[index + 1].trail.length;
      });

      const properDifficultyOrder = byDifficulty.every((hike, index) => {
        if (index + 1 === byDifficulty.length) return true;
        return difficultyMap[hike.trail.difficulty] <= difficultyMap[byDifficulty[index + 1].trail.difficulty];
      });

      const properHikingTimeOrder = byHikingTime.every((hike, index) => {
        if (index + 1 === byHikingTime.length) return true;
        return hike.timeToHike <= byHikingTime[index + 1].timeToHike;
      });

      const properDirivingDistanceOrder = byDrivingDistance.every((hike, index) => {
        if (index + 1 === byDrivingDistance.length) return true;
        return hike.distanceDetails.routes[0].legs[0].duration.value <= byDrivingDistance[index + 1].distanceDetails.routes[0].legs[0].duration.value;
      });

      expect(properLengthOrder).toEqual(true);
      expect(properDifficultyOrder).toEqual(true);
      expect(properHikingTimeOrder).toEqual(true);
      expect(properDirivingDistanceOrder).toEqual(true);
    });

    it('Adds a hike without deleting already existing ones', () => {
      const hikeObject = {
        doable: [hikeMocks.doable[0]],
        stretch: []
      };
      wrapper.instance().setHikes(hikeObject);
      expect(wrapper.instance().state.hikes.doableHikes).toHaveLength(1);

      const secondHikeObject = {
        doable: [hikeMocks.doable[1]],
        stretch: []
      };
      wrapper.instance().addHikes(secondHikeObject);
      expect(wrapper.instance().state.hikes.doableHikes).toHaveLength(2);
    });

    it('Does not add a duplicate hike', () => {
      const hikeObject = {
        doable: [hikeMocks.doable[0]],
        stretch: []
      };
      wrapper.instance().setHikes(hikeObject);
      expect(wrapper.instance().state.hikes.doableHikes).toHaveLength(1);

      wrapper.instance().addHikes(hikeObject);
      expect(wrapper.instance().state.hikes.doableHikes).toHaveLength(1);
    });

    it('Updates the lat and lon in state', () => {
      wrapper.instance().setCoordinates({ lat: 1, lon: 2});
      expect(wrapper.instance().state.lat).toEqual(1);
      expect(wrapper.instance().state.lon).toEqual(2);
    })
  });
});