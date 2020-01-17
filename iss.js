/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const request = require('request');
const URL_IPV4 = 'https://api.ipify.org/?format=json';
const URL_GEO = 'https://ipvigilante.com/';
const notifyURL = 'http://api.open-notify.org/iss-pass.json?';




const fetchMyIP = (callBack) => {
  // use request to fetch IP address from JSON API
  request(URL_IPV4, (error, response, body) => {
    if (error) {
      callBack(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callBack(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body);
    //console.log(data);
    callBack(null, data.ip);
  });


};


const fetchCoordsByIP = (ip, callBack) => {
  const URLWithIP = URL_GEO + ip;
  request(URLWithIP, (error, response, body) => {
    if (error) {
      callBack(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates IP. Response: ${body}`;
      callBack(Error(msg), null);
      return;
    }


    const obj = JSON.parse(body);
    //console.log(obj);
    const coords = {lattitude: obj.data.latitude, longitude: obj.data.longitude};
    callBack(null, coords);

  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = (coords, callBack) => {

  const notifyWithCoords = notifyURL + "lat=" + coords.lattitude + "&lon=" + coords.longitude;
  request(notifyWithCoords, (error, response, body) => {



    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates IP. Response: ${body}`;
      callBack(Error(msg), null);
      return;
    }

    const obj = JSON.parse(body);
    callBack(null, obj.response);
  });

};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};