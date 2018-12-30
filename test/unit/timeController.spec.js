const { expect, assert } = require('chai');
const sinon = require('sinon');
const axios = require('axios');

const config = require('../../src/shared/config');
const timeController = require('../../src/controllers/timeController');

const timezoneMock = require('../mocks/timezoneMock');
const sunsetMock = require('../mocks/sunsetResponse');

describe('HikeController::', () => {
  let sandbox;
  let axiosGetStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getTimestampSeconds::', () => {
    beforeEach(() => {
      axiosGetStub = sandbox.stub(axios, 'get');
      axiosGetStub.resolves(timezoneMock);
    });

    it('Should return timestamp in seconds', async () => {
      const currentTime = await timeController.getTimestampSeconds(config.locations.loveland.lat, config.locations.loveland.lon);

      expect(currentTime).to.equal(timezoneMock.data.timestamp);
    });
  });

  describe('getTimestampFormatted::', () => {
    beforeEach(() => {
      axiosGetStub = sandbox.stub(axios, 'get');
      axiosGetStub.resolves(timezoneMock);
    });

    it('Should return timezone within MST', async () => {
      const currentTime = await timeController.getTimestampFormatted(config.locations.loveland.lat, config.locations.loveland.lon);

      expect(currentTime).to.equal('2018-12-30T12:57:19.000Z');
    });
  });

  describe('getTimeOfSunset::', () => {
    beforeEach(() => {
      axiosGetStub = sandbox.stub(axios, 'get');
      axiosGetStub.resolves(sunsetMock);
    });

    it('Should return timezone within MST', async () => {
      const timeOfSunset = await timeController.getTimeOfSunset(config.locations.loveland.lat, config.locations.loveland.lon);

      expect(timeOfSunset).to.equal(sunsetMock.data.results.sunset);
    });
  });
});
