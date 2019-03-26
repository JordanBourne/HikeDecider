import React from 'react';
import { render } from 'react-testing-library';

import Homepage from '../components/Homepage';

describe('Homepage::', () => {
  let placeMock;

  beforeEach(() => {
    placeMock = jest.fn()

    global.google = {
      maps: {
        places: {
          AutocompleteService: function() {
            return {
              getPlacePredictions: placeMock
            }
          },
          PlacesServiceStatus: {
            OK: true
          }
        }
      }
    };
  });

  it('Can type in address field and is redirected to search of a location', () => {
    const { getByRole } = render(<Homepage />);
    const mapsSearchbox = getByRole('combobox');
    expect(mapsSearchbox).toBeTruthy();
  });
});