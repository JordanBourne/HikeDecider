import { experienceLevels, difficultyLevels, difficultyMap, defaultParams } from '../config'

export const buildUrlPath = (latLng, extraParams) => {
  const queryParams = { ...defaultParams, ...extraParams };
  let url = `getHikes?lat=${latLng.lat}&lon=${latLng.lng}&`;
  const keys = Object.keys(queryParams);
  keys.forEach((key, index)=> {
    if (index !== 0) {
      url += '&'
    }
    if (key === 'difficulty') {
      url += `${key}=${difficultyLevels.indexOf(queryParams[key])}`;
    } else {
      url += `${key}=${queryParams[key]}`;
    }
  });

  return url;
};

// lat lon maxDistanceToTrail minTrailLength maxTrailLength rating difficulty experience ignoreTimeRestriction 
export const goToSearch = (latLng, extraParams) => {
  const path = buildUrlPath(latLng, extraParams);
  window.location.href = path;
};

export default {
  goToSearch,
  buildUrlPath
}