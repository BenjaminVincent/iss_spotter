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
    const coords = {lattitude: obj.data.latitude, longitude: obj.data.longitude};
    callBack(null, coords);

  });
};

const fetchISSFlyOverTimes = (coords, callBack) => {
  const notifyWithCoords = notifyURL + "lat=" + coords.lattitude + "&lon=" + coords.longitude + "&n=5";
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



const nextISSTimesForMyLocation = (callBack) => {
  //fetchMyIp
    //fetchCoordsByIP
      //fetchISSFlyOverTimes
        //callback

  fetchMyIP((error, ip) => {
    if (error) {
      return callBack(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callBack(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, data) => {
        if (error) {
          return callBack(error, null);
        }
        callBack(null, data);
      })
    });
  });





  

};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};