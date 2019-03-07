import React from 'react';
import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import PlacesAutocomplete, * as reactAutocompleteUtils from 'react-places-autocomplete';
import AddressSearch from '../components/AddressSearch';
import AddressDropdown from '../components/AddressDropdown';

configure({ adapter: new Adapter() });

describe('AddressSearch::', () => {
  let wrapper;
  let sandbox;
  let geocodeMock;
  let getLatLngMock;
  let setCoordsMock;
  let props;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    geocodeMock = sandbox.stub(reactAutocompleteUtils, 'geocodeByAddress');
    geocodeMock.resolves(['Location Object']);
    getLatLngMock = sandbox.stub(reactAutocompleteUtils, 'getLatLng');
    getLatLngMock.rejects('Bad things');
    getLatLngMock.withArgs('Location Object').resolves({ lat: 40, lng: -100});

    setCoordsMock = jest.fn()
    props = {
      setCoordinates: jest.fn((args) => console.log(args))//jest.fn()
    };

    wrapper = shallow(<AddressSearch setCoordinates={setCoordsMock}/>);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Rendering::', () => {
    it('Has AddressSearch componenet', () => {
      expect(wrapper.find(PlacesAutocomplete)).toHaveLength(1);
    });
  });

  describe('Functions::', () => {
    it('Sets hikes to state accordingly', async () => {
      let container = wrapper.render();
      console.log(container.getElementById('#asdf'));
      await wrapper.instance().handleSelect('Loveland, Colorado');
      expect(setCoordsMock).toHaveBeenCalled();
    });
  });
});