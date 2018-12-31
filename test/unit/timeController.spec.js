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

  describe('getSecondsPassedToday::', () => {
    beforeEach(() => {
      axiosGetStub = sandbox.stub(axios, 'get');
      axiosGetStub.resolves(timezoneMock);
    });

    it('Should return current time in seconds', async () => {
      const currentTime = await timeController.getSecondsPassedToday(timezoneMock.data);

      expect(currentTime).to.equal(46639);
    });
  });

  describe('getSecondsUntilSunset::', () => {
    beforeEach(() => {
      axiosGetStub = sandbox.stub(axios, 'get');
      axiosGetStub.resolves(timezoneMock);
    });

    it('Should return 6pm in seconds in gmt -6', async () => {
      const sunsetTime = await timeController.getSecondsUntilSunset('12:00:00 AM', -21600);

      expect(sunsetTime).to.equal(64800);
    });

    it('Should return 6pm in seconds in gmt -7', async () => {
      const sunsetTime = await timeController.getSecondsUntilSunset('1:00:00 AM', -25200);

      expect(sunsetTime).to.equal(64800);
    });

    it('Should return 6pm in seconds in gmt -12', async () => {
      const sunsetTime = await timeController.getSecondsUntilSunset('6:00:00 AM', -43200);

      expect(sunsetTime).to.equal(64800);
    });

    it('Should return 6pm in seconds in gmt+6', async () => {
      const sunsetTime = await timeController.getSecondsUntilSunset('12:00:00 PM', 21600);

      expect(sunsetTime).to.equal(64800);
    });

    it('Should return 6pm in seconds in gmt+7', async () => {
      const sunsetTime = await timeController.getSecondsUntilSunset('1:00:00 PM', 18000);

      expect(sunsetTime).to.equal(64800);
    });

    it('Should return 6pm in seconds in gmt', async () => {
      const sunsetTime = await timeController.getSecondsUntilSunset('6:00:00 PM', 0);

      expect(sunsetTime).to.equal(64800);
    });
  });

  describe('getRemainingDaylight::', () => {
    beforeEach(() => {
      axiosGetStub = sandbox.stub(axios, 'get');
      axiosGetStub.onFirstCall().resolves(timezoneMock);
      axiosGetStub.onSecondCall().resolves(sunsetMock);
    });

    it('Should return timezone within MST', async () => {
      const remainindDaylight = await timeController.getRemainingDaylight(config.locations.loveland.lat, config.locations.loveland.lon);
    
      expect(remainindDaylight).to.equal(13557);
    });
  });
});
