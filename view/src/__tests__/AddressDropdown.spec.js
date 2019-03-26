import React from 'react';
import { render } from 'react-testing-library';

import AddressDropdown from '../components/AddressDropdown';

const props = {
  getInputProps: jest.fn(),
  loading: true,
  suggestions: [],
  getSuggestionItemProps: jest.fn(),
};

describe('AddressDropdown::', () => {
  it('Can type in address field and is redirected to search of a location', () => {
    const { getByTestId } = render(<AddressDropdown {...props} />);
    const loadingDiv = getByTestId('loading');
    expect(loadingDiv.textContent).toEqual('Loading...');
  });
  it('Can type in address field and is redirected to search of a location', () => {
    props.loading = false;
    props.suggestions = [{ description: 'suggestiontext' }];
    const { getByTestId } = render(<AddressDropdown {...props} />);
    const suggestionItem = getByTestId('suggestionItem');
    expect(suggestionItem.textContent).toEqual('suggestiontext');
  });
});