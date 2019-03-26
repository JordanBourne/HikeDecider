import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { difficultyMap } from '../config'

function HikeResults() {
  const [hikes, setHikes] = useState({});
  const [orderedHikes, setOrderedHikes] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:1337/getHikes${window.location.search}`)
      .then(response => {
        const doable = addNonDuplicate(hikes.doable, response.data.doable);
        const stretch = addNonDuplicate(hikes.stretch, response.data.stretch);
        setHikes({ doable, stretch });
        updateOrderedHikes({ doable, stretch });
      });
  }, []);

  const updateOrderedHikes = ({ doable, stretch }) => {
    const hikeCopy = [...doable, ...stretch];
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

  return (
    <div>
      Hello World <br />
      {(hikes.doable || hikes.stretch) && 'GOT HIKE RESULTS'}
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
