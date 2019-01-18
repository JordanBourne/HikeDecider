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

  describe('filterTrails::', () => {
    it('Should get results back from HikingProject', async () => {
      const trails = await hikeController.filterTrails({
        trails: hikingProjectResults.data.trails,
        maxTrailLength: 3.5
      });

      expect(trails.length).to.equal(3);
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

  describe('getDoableTrails::', () => {
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

      const filteredTrails = hikeController.getDoableTrails(params);
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

      const filteredTrails = hikeController.getDoableTrails(params);
      expect(filteredTrails.stretch.length).to.equal(1);
    });

    it('Increasing time to hike should put it into stretch', () => {
      detailedTrail.timeToHike = 61;

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.getDoableTrails(params);
      expect(filteredTrails.stretch.length).to.equal(1);
    });

    it('Increasing time to hike to more than 30 minutes extra should exclude the trail', () => {
      detailedTrail.timeToHike = 1861;

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.getDoableTrails(params);
      expect(filteredTrails.doable.length + filteredTrails.stretch.length).to.equal(0);
    });

    it('Combined stretch goals should exclude the trail', () => {
      detailedTrail.timeToHike = 61;
      detailedTrail.trail.length = 1.2;
      detailedTrail.trail.difficulty = 'blue';

      const params = {
        detailedTrails: [detailedTrail], 
        timeToHike: 120, 
        difficulty: 0
      };

      const filteredTrails = hikeController.getDoableTrails(params);
      expect(filteredTrails.doable.length + filteredTrails.stretch.length).to.equal(0);
    });

    it('Having a tooLong hike then a doable hike should include just the doable', () => {
      detailedTrail.timeToHike = 1861;
      const secondHike = Object.assign({}, detailedTrail, { timeToHike: 60 });

      const params = {
        detailedTrails: [detailedTrail, secondHike], 
        timeToHike: 120, 
        maxLength: 1, 
        difficulty: 0
      };

      const filteredTrails = hikeController.getDoableTrails(params);
      expect(filteredTrails.doable.length + filteredTrails.stretch.length).to.equal(1);
    });
  });
});
