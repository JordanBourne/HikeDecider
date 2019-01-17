const sinon = require('sinon');
const axios = require('axios');
const request = require('request-promise');
const { expect, assert } = require('chai');

const app = require('../../app');
const googleDirectionsMock = require('../mocks/googleDirections');
const hikingProjectResults = require('../mocks/hikingProjectResults');
const timezoneMock = require('../mocks/timezoneMock');
const sunsetResponse = require('../mocks/sunsetResponse');

describe('GetHikes::', () => {
  let sandbox;
  let axiosGetStub;
  let server;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    axiosGetStub = sandbox.stub(axios, 'get');

    axiosGetStub.onFirstCall().resolves(timezoneMock);
    axiosGetStub.onSecondCall().resolves(sunsetResponse);
    axiosGetStub.onThirdCall().resolves(hikingProjectResults);
    axiosGetStub.resolves(googleDirectionsMock);

    server = app.listen(1337);
  });

  afterEach(() => {
    sandbox.restore();
    server.close();
  });

  it('Should get list of hikes', async () => {
    const response = await request.get('http://localhost:1337/getHikes?lat=40.394390&lon=-105.070580');

    const hikes = JSON.parse(response);
    expect(axiosGetStub.called).to.be.true;
    expect(hikes.doable.length + hikes.stretch.length + hikes.tooLong.length).to.equal(10);
    return;
  });
});