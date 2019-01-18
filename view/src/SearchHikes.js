import React, { Component } from 'react';
import axios from 'axios';

const EXPERIENCELEVELS = ['new', 'beginner', 'intermediate', 'advanced', 'expert'];
const DIFFICULTYLEVELS = ['Very Easy', 'Easy', 'Medium', 'Very Medium', 'Hard', 'Very Hard'];

class SearchHikes extends Component {
  state = {
    lat: 40.394390,
    lon: -105.070580,
    maxDistanceToTrail: 50,
    minTrailLength: 0,
    maxTrailLength: 20,
    rating: 1,
    difficulty: 'Hard',
    experience: 'beginner',
    ignoreTimeRestriction: false
  };

  handleInputChange = (fieldName, event) => {
    const value = event.target.value;
    this.setState(state => {
      return state[fieldName] = value;
    });
  };
  
  handleCheckboxChange = (fieldName, event) => {
    this.setState(state => {
      return state[fieldName] = !state[fieldName];
    });
  };

  buildUrl = () => {
    let url = `http://localhost:1337/getHikes?`;
    const keys = Object.keys(this.state);
    keys.forEach((key, index)=> {
      if (index !== 0) {
        url += '&'
      }
      if (key === 'difficulty') {
        url += `${key}=${DIFFICULTYLEVELS.indexOf(this.state[key])}`;
      } else {
        url += `${key}=${this.state[key]}`;
      }
    });

    return url;
  }

  submitForm = () => {
    const url = this.buildUrl();

    axios.get(url)
      .then(response => {
        // let response = {}
        // response.data = JSON.parse(asdf)
        console.log('## RESPONSE ##', response.data)
        this.props.setHikes(response.data);
      });
  }
  
  render() {
    return (
      <div className="search-params">
        <label htmlFor="lat">
          Starting Latitude: 
          <input
            id="lat"
            type="number"
            value={this.state.lat}
            placeholder={this.state.lat}
            onChange={this.handleInputChange.bind(this, 'lat')}
          />
        </label>
        <br />
        <label htmlFor="lon">
          Starting Longitude: 
          <input
            id="lon"
            type="number"
            value={this.state.lon}
            placeholder={this.state.lon}
            onChange={this.handleInputChange.bind(this, 'lon')}
          />
        </label>
        <br />
        <label htmlFor="maxDistanceToTrail">
          Max Distance To Trail: 
          <input
            id="maxDistanceToTrail"
            type="number"
            value={this.state.maxDistanceToTrail}
            placeholder="Max Driving Distance"
            onChange={this.handleInputChange.bind(this, 'maxDistanceToTrail')}
          />
        </label>
        <br />
        <label htmlFor="minTrailLength">
          Minimum Trail Length: 
          <input
            id="minTrailLength"
            type="number"
            value={this.state.minTrailLength}
            placeholder="Min Trail Length"
            onChange={this.handleInputChange.bind(this, 'minTrailLength')}
          />
        </label>
        <br />
        <label htmlFor="maxTrailLength">
          Maximum Trail Length: 
          <input
            id="maxTrailLength"
            type="number"
            value={this.state.maxTrailLength}
            placeholder="Max Trail Length"
            onChange={this.handleInputChange.bind(this, 'maxTrailLength')}
          />
        </label>
        <br />
        <label htmlFor="experience">
          Experience (used to calculate hiking speed):
          <select
            id="experience"
            value={this.state.experience}
            onChange={this.handleInputChange.bind(this, 'experience')}
            onBlur={this.handleInputChange.bind(this, 'experience')}
          >
            <option />
            {EXPERIENCELEVELS.map(experience => (
              <option key={experience} value={experience}>
                {experience}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="difficulty">
          Max Trail Difficulty:
          <select
            id="difficulty"
            value={this.state.difficulty}
            onChange={this.handleInputChange.bind(this, 'difficulty')}
            onBlur={this.handleInputChange.bind(this, 'difficulty')}
          >
            <option />
            {DIFFICULTYLEVELS.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="rating">
          Trail Rating Minimum:
          <select
            id="rating"
            value={this.state.rating}
            onChange={this.handleInputChange.bind(this, 'rating')}
            onBlur={this.handleInputChange.bind(this, 'rating')}
          >
            <option />
            {[1,2,3,4,5].map(rating => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="ignoreTimeRestriction">
          Ignore Time Restriction:
          <input
            id="ignoreTimeRestriction"
            type="checkbox"
            checked={this.state.ignoreTimeRestriction}
            onChange={this.handleCheckboxChange.bind(this, 'ignoreTimeRestriction')}
          />
        </label>
        <br />
        <button onClick={this.submitForm}>Submit</button>
      </div>
    );
  }
}

export default SearchHikes;

const asdf = `{"doable":[{"trail":{"id":7009398,"name":"Greyrock Mountain Loop","type":"Featured Hike","summary":"This great hike rewards you with amazing views!","difficulty":"blueBlack","stars":4.3,"starVotes":38,"location":"Bellvue, Colorado","url":"https://www.hikingproject.com/trail/7009398/greyrock-mountain-loop","imgSqSmall":"https://cdn-files.apstatic.com/hike/7004953_sqsmall_1433728082.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7004953_small_1433728082.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7004953_smallMed_1433728082.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7004953_medium_1433728082.jpg","length":7.4,"ascent":2241,"descent":-2241,"high":7469,"low":5571,"longitude":-105.284,"latitude":40.6948,"conditionStatus":"Minor Issues","conditionDetails":"Mostly Dry, Icy - Conditions varied depending on sun exposure. Overall it was a great hike.","conditionDate":"2018-11-26 09:11:33"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"Ei04NDMxIFBvdWRyZSBDYW55b24gUmQsIEJlbGx2dWUsIENPIDgwNTEyLCBVU0EiGxIZChQKEgklzFJ7mDtphxG_9BIVYp0ucxDvQQ","types":["street_address"]}],"routes":[{"bounds":{"northeast":{"lat":40.6996926,"lng":-105.0704167},"southwest":{"lat":40.394391,"lng":-105.2840235}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"33.1 mi","value":53275},"duration":{"text":"51 mins","value":3038},"end_address":"8431 Poudre Canyon Rd, Bellvue, CO 80512, USA","end_location":{"lat":40.6949857,"lng":-105.2840235},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.394391,"lng":-105.0706274},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"Taft Hill Rd and CO-14 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":19776.9},{"trail":{"id":7009685,"name":"Lumpy Ridge Loop","type":"Featured Hike","summary":"A beautiful hike showcasing some of the most scenic trails that Estes Park has to offer.","difficulty":"blueBlack","stars":4.3,"starVotes":23,"location":"Estes Park, Colorado","url":"https://www.hikingproject.com/trail/7009685/lumpy-ridge-loop","imgSqSmall":"https://cdn-files.apstatic.com/hike/7049408_sqsmall_1531177399.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7049408_small_1531177399.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7049408_smallMed_1531177399.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7049408_medium_1531177399.jpg","length":10.7,"ascent":2361,"descent":-2387,"high":9231,"low":7778,"longitude":-105.5132,"latitude":40.3964,"conditionStatus":"All Clear","conditionDetails":"Icy","conditionDate":"2018-12-14 00:00:00"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJSUZDiFpvaYcRzztQG-uYIT0","types":["establishment","point_of_interest","premise"]}],"routes":[{"bounds":{"northeast":{"lat":40.4330501,"lng":-105.0704167},"southwest":{"lat":40.37644299999999,"lng":-105.5152119}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"31.4 mi","value":50469},"duration":{"text":"55 mins","value":3277},"end_address":"1144 Lumpy Ridge Trail, Estes Park, CO 80517, USA","end_location":{"lat":40.3963662,"lng":-105.5131529},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.394391,"lng":-105.0706274},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"US-34 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":27804.899999999998},{"trail":{"id":7022391,"name":"Hall Ranch Loop","type":"Featured Hike","summary":"A landscape of rolling grasslands and sandstone buttes provides excellent viewing opportunities.","difficulty":"blue","stars":4.4,"starVotes":15,"location":"Lyons, Colorado","url":"https://www.hikingproject.com/trail/7022391/hall-ranch-loop","imgSqSmall":"https://cdn-files.apstatic.com/hike/7008088_sqsmall_1446741737.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7008088_small_1446741737.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7008088_smallMed_1446741737.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7008088_medium_1446741737.jpg","length":9.8,"ascent":1447,"descent":-1446,"high":6750,"low":5489,"longitude":-105.2894,"latitude":40.2121,"conditionStatus":"All Clear","conditionDetails":"Dry","conditionDate":"2018-10-21 09:11:08"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJyW1aWs7ja4cR4qPYPCme6Ig","types":["route"]}],"routes":[{"bounds":{"northeast":{"lat":40.3943658,"lng":-105.0706283},"southwest":{"lat":40.2031695,"lng":-105.2893772}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"25.7 mi","value":41336},"duration":{"text":"34 mins","value":2052},"end_address":"Bitterbrush Trail, Lyons, CO 80540, USA","end_location":{"lat":40.21204220000001,"lng":-105.2893772},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.3943658,"lng":-105.0706283},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"US-287 S and CO-66 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":24822.300000000003},{"trail":{"id":7002461,"name":"Red Deer Lake","type":"Featured Hike","summary":"A beautiful creekside hike in an awesome mountain setting!","difficulty":"blue","stars":4.5,"starVotes":11,"location":"Nederland, Colorado","url":"https://www.hikingproject.com/trail/7002461/red-deer-lake","imgSqSmall":"https://cdn-files.apstatic.com/hike/7001580_sqsmall_1426286312.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7001580_small_1426286312.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7001580_smallMed_1426286312.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7001580_medium_1426286312.jpg","length":14.2,"ascent":1725,"descent":-1725,"high":10372,"low":8703,"longitude":-105.524,"latitude":40.1299,"conditionStatus":"Unknown","conditionDetails":null,"conditionDate":"1970-01-01 00:00:00"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJdd3mnOrba4cRWoj22I80kBU","types":["route"]}],"routes":[{"bounds":{"northeast":{"lat":40.3943658,"lng":-105.0706283},"southwest":{"lat":40.1290766,"lng":-105.5240222}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"43.6 mi","value":70220},"duration":{"text":"1 hour 3 mins","value":3773},"end_address":"Middle Saint Vrain Road, Lyons, CO 80540, USA","end_location":{"lat":40.1298467,"lng":-105.5240222},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.3943658,"lng":-105.0706283},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"US-287 S and CO-7 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":35632.5},{"trail":{"id":7015874,"name":"Hewlett Gulch Trail #954","type":"Featured Hike","summary":"A fun trail to let your dog off the leash with many water crossings to romp through.","difficulty":"greenBlue","stars":4.4,"starVotes":13,"location":"Laporte, Colorado","url":"https://www.hikingproject.com/trail/7015874/hewlett-gulch-trail-954","imgSqSmall":"https://cdn-files.apstatic.com/hike/7013599_sqsmall_1457926759.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7013599_small_1457926759.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7013599_smallMed_1457926759.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7013599_medium_1457926759.jpg","length":8.4,"ascent":1125,"descent":-1125,"high":6797,"low":5729,"longitude":-105.3104,"latitude":40.6895,"conditionStatus":"Unknown","conditionDetails":null,"conditionDate":"1970-01-01 00:00:00"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJqeqsK4c7aYcRlT8PrC35BfA","types":["street_address"]}],"routes":[{"bounds":{"northeast":{"lat":40.6996926,"lng":-105.0704167},"southwest":{"lat":40.394391,"lng":-105.3117096}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"35.3 mi","value":56846},"duration":{"text":"55 mins","value":3278},"end_address":"150 Hewlett Gulch Trail, Bellvue, CO 80512, USA","end_location":{"lat":40.689288,"lng":-105.3102605},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.394391,"lng":-105.0706274},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"Taft Hill Rd and CO-14 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":21172.500000000004},{"trail":{"id":7053211,"name":"Crystal Lakes Long Loop","type":"Featured Hike","summary":"A tiring experience that will give you a little bit of everything the Rockies have to offer.","difficulty":"blueBlack","stars":5,"starVotes":1,"location":"Estes Park, Colorado","url":"https://www.hikingproject.com/trail/7053211/crystal-lakes-long-loop","imgSqSmall":"https://cdn-files.apstatic.com/hike/7000398_sqsmall_1420759200.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7000398_small_1420759200.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7000398_smallMed_1420759200.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7000398_medium_1420759200.jpg","length":32,"ascent":5919,"descent":-5953,"high":11505,"low":7598,"longitude":-105.5132,"latitude":40.3964,"conditionStatus":"Unknown","conditionDetails":null,"conditionDate":"1970-01-01 00:00:00"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJSUZDiFpvaYcRzztQG-uYIT0","types":["establishment","point_of_interest","premise"]}],"routes":[{"bounds":{"northeast":{"lat":40.4330501,"lng":-105.0704167},"southwest":{"lat":40.37644299999999,"lng":-105.5152119}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"31.4 mi","value":50469},"duration":{"text":"55 mins","value":3277},"end_address":"1144 Lumpy Ridge Trail, Estes Park, CO 80517, USA","end_location":{"lat":40.3963662,"lng":-105.5131529},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.394391,"lng":-105.0706274},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"US-34 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":82127.09999999999},{"trail":{"id":7046990,"name":"Brainard Lake Snowshoe Trail","type":"Featured Hike","summary":"A pleasant snowshoe through dense forest to a great view of the continental divide.","difficulty":"greenBlue","stars":4.5,"starVotes":6,"location":"Nederland, Colorado","url":"https://www.hikingproject.com/trail/7046990/brainard-lake-snowshoe-trail","imgSqSmall":"https://cdn-files.apstatic.com/hike/7043805_sqsmall_1518106012.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7043805_small_1518106012.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7043805_smallMed_1518106012.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7043805_medium_1518106012.jpg","length":4.8,"ascent":468,"descent":-467,"high":10352,"low":10073,"longitude":-105.535,"latitude":40.0808,"conditionStatus":"All Clear","conditionDetails":"Snowy","conditionDate":"2019-01-08 23:29:14"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJa9KvwSTba4cRnpHXv8Mv9O8","types":["route"]}],"routes":[{"bounds":{"northeast":{"lat":40.3943658,"lng":-105.0706283},"southwest":{"lat":40.0753293,"lng":-105.5350499}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"50.8 mi","value":81755},"duration":{"text":"1 hour 10 mins","value":4225},"end_address":"Left Hand Reservoir Rd, Colorado, USA","end_location":{"lat":40.0807991,"lng":-105.5350499},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.3943658,"lng":-105.0706283},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"US-287 S and CO-7 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":11941.199999999999},{"trail":{"id":7001055,"name":"Gem Lake and Balanced Rock","type":"Featured Hike","summary":"A tour of some of the best scenery and terrain on offer in the Lumpy Ridge Area.","difficulty":"blue","stars":4.3,"starVotes":12,"location":"Estes Park, Colorado","url":"https://www.hikingproject.com/trail/7001055/gem-lake-and-balanced-rock","imgSqSmall":"https://cdn-files.apstatic.com/hike/7000381_sqsmall_1420752845.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7000381_small_1420752845.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7000381_smallMed_1420752845.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7000381_medium_1420752845.jpg","length":7.5,"ascent":1563,"descent":-1562,"high":8827,"low":7841,"longitude":-105.5125,"latitude":40.3966,"conditionStatus":"Minor Issues","conditionDetails":"Snowy, Icy","conditionDate":"2019-01-11 13:48:57"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJSUZDiFpvaYcRzztQG-uYIT0","types":["establishment","point_of_interest","premise"]}],"routes":[{"bounds":{"northeast":{"lat":40.4330501,"lng":-105.0704167},"southwest":{"lat":40.37644299999999,"lng":-105.5152119}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"31.3 mi","value":50409},"duration":{"text":"54 mins","value":3220},"end_address":"1144 Lumpy Ridge Trail, Estes Park, CO 80517, USA","end_location":{"lat":40.3966874,"lng":-105.5125829},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.394391,"lng":-105.0706274},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"US-34 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":19406.7},{"trail":{"id":7002305,"name":"Rabbit Mountain","type":"Featured Hike","summary":"A nice, mellow hike with good views of the Front Range.","difficulty":"greenBlue","stars":4.2,"starVotes":11,"location":"Lyons, Colorado","url":"https://www.hikingproject.com/trail/7002305/rabbit-mountain","imgSqSmall":"https://cdn-files.apstatic.com/hike/7001496_sqsmall_1426007570.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7001496_small_1426007570.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7001496_smallMed_1426007570.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7001496_medium_1426007570.jpg","length":6,"ascent":597,"descent":-591,"high":5851,"low":5521,"longitude":-105.2237,"latitude":40.2464,"conditionStatus":"Bad / Closed","conditionDetails":"CLOSED MONDAY-WEDNESDAY THROUGH JANUARY 31, 2019 FOR ELK MANAGEMENT.","conditionDate":"2018-11-06 06:46:25"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJx2EjNsria4cR6gmUXoEiLh8","types":["route"]}],"routes":[{"bounds":{"northeast":{"lat":40.3943658,"lng":-105.0706283},"southwest":{"lat":40.2031695,"lng":-105.230298}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"24.5 mi","value":39422},"duration":{"text":"31 mins","value":1882},"end_address":"Eagle Wind Trail, Longmont, CO 80503, USA","end_location":{"lat":40.2464132,"lng":-105.2236877},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.3943658,"lng":-105.0706283},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"US-287 S and CO-66 W","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":14937.300000000001},{"trail":{"id":7021992,"name":"Horsetooth Falls Out and Back","type":"Featured Hike","summary":"This short route is the perfect way to spend time in the park and leads to a scenic waterfall.","difficulty":"greenBlue","stars":4.2,"starVotes":10,"location":"Laporte, Colorado","url":"https://www.hikingproject.com/trail/7021992/horsetooth-falls-out-and-back","imgSqSmall":"https://cdn-files.apstatic.com/hike/7023812_sqsmall_1476068509.jpg","imgSmall":"https://cdn-files.apstatic.com/hike/7023812_small_1476068509.jpg","imgSmallMed":"https://cdn-files.apstatic.com/hike/7023812_smallMed_1476068509.jpg","imgMedium":"https://cdn-files.apstatic.com/hike/7023812_medium_1476068509.jpg","length":2.3,"ascent":378,"descent":-379,"high":5894,"low":5727,"longitude":-105.1812,"latitude":40.524,"conditionStatus":"Minor Issues","conditionDetails":"Icy","conditionDate":"2018-11-23 10:46:07"},"distanceDetails":{"geocoded_waypoints":[{"geocoder_status":"OK","place_id":"ChIJbzIQjw5TaYcR83jEHs3UESg","types":["premise"]},{"geocoder_status":"OK","place_id":"ChIJA9Vnsd1IaYcRNzZ3iXKW02I","types":["street_address"]}],"routes":[{"bounds":{"northeast":{"lat":40.5238617,"lng":-105.0704167},"southwest":{"lat":40.394391,"lng":-105.200177}},"copyrights":"Map data ©2019 Google","legs":[{"distance":{"text":"14.9 mi","value":23993},"duration":{"text":"26 mins","value":1570},"end_address":"6550 W County Rd 38 E, Fort Collins, CO 80526, USA","end_location":{"lat":40.5238617,"lng":-105.1811945},"start_address":"305 N Washington Ave, Loveland, CO 80537, USA","start_location":{"lat":40.394391,"lng":-105.0706274},"traffic_speed_entry":[],"via_waypoint":[]}],"summary":"US-34 W/E Eisenhower Blvd and Glade Rd","warnings":[],"waypoint_order":[]}],"status":"OK"},"timeToHike":5860.2}],"stretch":[],"tooLong":[]}`