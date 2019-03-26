import { handleSelect } from '../components/AddressSearch';
import * as reactPlacesAutocomplete from 'react-places-autocomplete';
import * as sinon from 'sinon';
import urlUtils from '../utils/urlUtils';

const LAT_LONG_RESULT = 'LAT_LONG_RESULT';

describe('AddressSearch::', () => {
  let sandbox;
  let geocodeStub;
  let latLongStub;
  let goToSearchStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    geocodeStub = sandbox.stub(reactPlacesAutocomplete, 'geocodeByAddress');
    geocodeStub.resolves(['result']);

    latLongStub = sandbox.stub(reactPlacesAutocomplete, 'getLatLng');
    latLongStub.resolves('latLong');

    goToSearchStub = sandbox.stub(urlUtils, 'goToSearch');
    goToSearchStub.resolves(LAT_LONG_RESULT);
  });

  it('should call setCoords with the latLong', async () => {
    const result = await handleSelect('someAddress');
    expect(result).toEqual(LAT_LONG_RESULT);
  });
});
