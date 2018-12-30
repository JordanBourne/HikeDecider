const { expect, assert } = require('chai');
const sinon = require('sinon');
const axios = require('axios');

const { getHikes } = require('../../src/routes/getHikes');
// const googleService = require('../../src/services/googleDirections');
// const hikingProjectService = require('../../src/services/hikingProjectService');

const googleDirectionsMock = require('../mocks/googleDirections');
const hikingProjectResults = require('../mocks/hikingProjectResults');

describe('GetHikes::', () => {
  let sandbox;
  let axiosGetStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    axiosGetStub = sandbox.stub(axios, 'get');
    axiosGetStub.resolves(googleDirectionsMock);

    axiosGetStub.onFirstCall().resolves(hikingProjectResults);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should get list of hikes', async () => {
    const hikes = await getHikes({
      lat: 40.394390,
      lon: -105.070580
    });
    
    expect(hikes.doable.length + hikes.stretch.length + hikes.tooLong.length).to.equal(10);
  });
});
