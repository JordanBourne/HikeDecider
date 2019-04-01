import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { difficultyMap } from '../config'

function HikeResults() {
  const [hikes, setHikes] = useState([]);
  const [orderedHikes, setOrderedHikes] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:1337/getHikes${window.location.search}`)
      .then(response => {
        const newHikes = addNonDuplicate(response.data.doable, response.data.stretch);
        const hikeList = addNonDuplicate(hikes, newHikes);
        setHikes(hikeList);
        updateOrderedHikes(hikeList);
      });
  }, []);

  const updateOrderedHikes = (hikeList) => {
    const hikeCopy = [...hikeList];
    const lengthOrder = [...hikeCopy].sort((a, b) => a.trail.length - b.trail.length);
    const timeToHikeOrder = [...hikeCopy].sort((a, b) => a.timeToHike - b.timeToHike);
    const difficultyOrder = [...hikeCopy].sort((a, b) => {
      return difficultyMap[a.trail.difficulty] - difficultyMap[b.trail.difficulty]
    });
    const drivingTimeSort = [...hikeCopy].sort((a, b) => 
      a.distanceDetails.routes[0].legs[0].duration.value - b.distanceDetails.routes[0].legs[0].duration.value
    );
  
    setOrderedHikes({
      byLength: lengthOrder,
      byDifficulty: difficultyOrder,
      byHikingTime: timeToHikeOrder,
      byDrivingDistance: drivingTimeSort
    });
  }

  const getCurrentHikeIndex = (listName) => {
    const currentHike = hikes[0];
    return orderedHikes[listName].map(hike => 
      hike.trail.name).indexOf(currentHike.trail.name);
  }

  const getNextHike = (listName) => {
    return () => {
      const currentIndex = getCurrentHikeIndex(listName);
      if (currentIndex !== hikes.length - 1) {
        const newHike = orderedHikes[listName][currentIndex + 1];
        return updateSuggestedTrail(newHike);
      }
    }
  }

  const getPreviousHike = (listName) => {
    return () => {
      const currentIndex = getCurrentHikeIndex(listName);
      if (currentIndex !== 0) {
        const newHike = orderedHikes[listName][currentIndex - 1];
        return updateSuggestedTrail(newHike);
      }
    }
  }

  const updateSuggestedTrail = (newTrail) => {
    const trailList = [...hikes];
    const trailIndex = trailList.indexOf(newTrail);
    trailList.splice(trailIndex, 1)
    trailList.unshift(newTrail);
    
    return setHikes(trailList);
  }

  const createDetails = (hike, key) => {
    return (
      <p key={key}>
        Trail Name: <a href={hike.trail.url}>{hike.trail.name}</a> <br />
        Trail Length: {hike.trail.length} Miles<br />
        Trail Difficulty: {hike.trail.difficulty} <br />
        Driving Distance: {hike.distanceDetails.routes[0].legs[0].distance.text} <br />
        Driving Time: {hike.distanceDetails.routes[0].legs[0].duration.text} <br />
        Time to Hike: {Math.floor(hike.timeToHike / 60 / 60 * 10) / 10} Hours<br />
      </p>
    );
  }

  const renderButtons = () => {
    return (
      <>
        <button id="getShorterDistance" onClick={getPreviousHike('byLength')}>Shorter Hike</button>
        <button id="getLongerDistance" onClick={getNextHike('byLength')}>Longer Hike</button>
        <button id="getShorterDrive" onClick={getPreviousHike('byDrivingDistance')}>Closer Drive</button>
        <button id="getLongerDrive" onClick={getNextHike('byDrivingDistance')}>Longer Drive</button>
        <button id="getLessDifficult" onClick={getPreviousHike('byDifficulty')}>Less Difficult</button>
        <button id="getMoreDifficult" onClick={getNextHike('byDifficulty')}>More Difficult</button>
      </>
    )
  }

  return (
    <div>
      Hello World <br />
      {hikes.length > 0 && createDetails(hikes[0], 12345)}
      {hikes.length > 0 && renderButtons()}
    </div>
  )
}

export const addNonDuplicate = (hikes = [], moreHikes) => {
  let hikeMap = {};
  
  hikes.forEach(hike => {
    hikeMap[hike.trail.name] = true;
  });

  moreHikes.forEach(hike => {
    if (!hikeMap[hike.trail.name]) {
      hikes.push(hike);
    }
  });

  return hikes;
}

export default HikeResults;
