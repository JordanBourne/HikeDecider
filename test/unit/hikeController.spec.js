const { expect, assert } = require('chai');
const sinon = require('sinon');
const axios = require('axios');

const hikeController = require('../../src/controllers/hikeController');

const googleDirectionsMock = require('../mocks/googleDirections');
const hikingProjectResults = require('../mocks/hikingProjectResults');
const detailedTrails = require('../mocks/detailedTrails');
const oneDetailedTrail = require('../mocks/oneDetailedTrail');

describe('HikeController::', () => {
  let sandbox;
  let axiosGetStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getTrails::', () => {
    beforeEach(() => {
      axiosGetStub = sandbox.stub(axios, 'get');
      axiosGetStub.resolves(hikingProjectResults);
    });

    it('Should get results back from HikingProject', async () => {
      const trails = await hikeController.getTrails({});

      expect(trails).to.deep.equal(hikingProjectResults.data.trails);
    });

    it.skip('Should handle error', async () => {
      expect.fail('Not supported yet');
    });
  });

  describe('getTrailDistances::', () => {
    beforeEach(() => {
      axiosGetStub = sandbox.stub(axios, 'get');
      axiosGetStub.resolves(googleDirectionsMock);
    });

    it('Should get results back from HikingProject', async () => {
      const params = {
        lat: 40.394390,
        lon: -105.070580,
        trails: hikingProjectResults.data.trails, 
        experience: 'beginner'
      };

      const trails = await hikeController.getTrailDistances(params);
      expect(trails).to.deep.equal(detailedTrails);
    });

    it.skip('Should handle error', async () => {
      expect.fail('Not supported yet');
    });
  });

  describe('filterTrails::', () => {
    let detailedTrail;
    beforeEach(() => {
      detailedTrail = JSON.parse(JSON.stringify(oneDetailedTrail));
      detailedTrail.trail.difficulty = 'green';
      detailedTrail.trail.length = 1;
      detailedTrail.distanceDetails.routes[0].legs[0].duration.value = 60;
      detailedTrail.timeToHike = 60;
    });

    it('Should get return one doable trail', () => {
      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.filterTrails(params);
      expect(filteredTrails.doable.length).to.equal(1);
    });

    it('Increasing trail difficulty should put it into stretch', () => {
      detailedTrail.trail.difficulty = 'greenBlue';

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.filterTrails(params);
      expect(filteredTrails.stretch.length).to.equal(1);
    });

    it('Increasing trail length should put it into stretch', () => {
      detailedTrail.trail.length = 1.2;

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.filterTrails(params);
      expect(filteredTrails.stretch.length).to.equal(1);
    });

    it('Increasing trail length to more than 125% should put it into tooLong', () => {
      detailedTrail.trail.length = 1.26;

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.filterTrails(params);
      expect(filteredTrails.tooLong.length).to.equal(1);
    });

    it('Increasing time to hike should put it into stretch', () => {
      detailedTrail.timeToHike = 61;

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.filterTrails(params);
      expect(filteredTrails.stretch.length).to.equal(1);
    });

    it('Increasing time to hike to more than 30 minutes extra should put it into tooLong', () => {
      detailedTrail.timeToHike = 1861;

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.filterTrails(params);
      expect(filteredTrails.tooLong.length).to.equal(1);
    });

    it('Combined stretch goals should push it into tooLong', () => {
      detailedTrail.timeToHike = 61;
      detailedTrail.trail.length = 1.2;
      detailedTrail.trail.difficulty = 'greenBlue';

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.filterTrails(params);
      expect(filteredTrails.tooLong.length).to.equal(1);
    });
  });
});
