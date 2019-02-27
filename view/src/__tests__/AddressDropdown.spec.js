import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddressDropdown from '../components/AddressDropdown';

configure({ adapter: new Adapter() });

describe('AddressSearch::', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      getInputProps: jest.fn(),
      loading: false,
      suggestions: [],
      getSuggestionItemProps: jest.fn()
    };

    wrapper = shallow(<AddressDropdown {...props} />);
  });

  describe('Rendering::', () => {
    it('Has basic elements', () => {
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('[data-test="addressDropdown"]')).toHaveLength(1);
      expect(wrapper.find('[data-test="suggestionItem"]')).toHaveLength(0);
      expect(wrapper.find('[data-test="loading"]')).toHaveLength(0);
    });

    it('Has loading element when loading', () => {
      wrapper.setProps({ loading: true });
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('[data-test="addressDropdown"]')).toHaveLength(1);
      expect(wrapper.find('[data-test="suggestionItem"]')).toHaveLength(0);
      expect(wrapper.find('[data-test="loading"]')).toHaveLength(1);
    });

    it('Has loading element when loading', () => {
      wrapper.setProps({ suggestions: [
          { description: 1 }, 
          { description: 2 },
          { description: 3 }
        ]
      });
      expect(wrapper.find('input')).toHaveLength(1);
      expect(wrapper.find('[data-test="addressDropdown"]')).toHaveLength(1);
      expect(wrapper.find('[data-test="suggestionItem"]')).toHaveLength(3);
      expect(wrapper.find('[data-test="loading"]')).toHaveLength(0);
    });
  });
});