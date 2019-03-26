import { buildUrlPath, goToSearch } from './urlUtils';

describe('urlUtils::', () => {
  describe('buildUrlPath', () => {
    it('takes lat and lng and returns a path string', () => {
      const latLong = {
        lat: 40,
        lng: -120,
      };

      const path = buildUrlPath(latLong);
      expect(path).toEqual('getHikes?lat=40&lon=-120&maxDistanceToTrail=50&minTrailLength=0&maxTrailLength=20&rating=1&difficulty=4&experience=beginner&ignoreTimeRestriction=false');
    });
    it('can pass in extra params to overwrite defaults', () => {
      const latLong = {
        lat: 40,
        lng: -120,
      };
      const extraParams = {
        maxDistanceToTrail: 1,
        minTrailLength: 2,
        maxTrailLength: 3,
        rating: 4,
        difficulty: 'Easy',
        experience: 'advanced',
        ignoreTimeRestriction: true
      };

      const path = buildUrlPath(latLong, extraParams);
      expect(path).toEqual('getHikes?lat=40&lon=-120&maxDistanceToTrail=1&minTrailLength=2&maxTrailLength=3&rating=4&difficulty=1&experience=advanced&ignoreTimeRestriction=true');
    });
  });
});