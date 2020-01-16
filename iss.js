/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const request = require('request');
const URL = 'https://api.ipify.org/?format=json';




const fetchMyIP = (callBack) => {
  // use request to fetch IP address from JSON API
  request(URL, (error, response, body) => {
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


module.exports = {
  fetchMyIP
};