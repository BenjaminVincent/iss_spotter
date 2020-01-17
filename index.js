const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

// const IP = fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("DIDN'T WORK! ", error);
//     return;
//   }

//   console.log("IT WORKED! RETURNED IP: ", ip);
//   return ip;
// });




// fetchCoordsByIP('216.90', (error, data) => {
//   if (error) {
//     console.log("DIDN'T WORK! ", error);
//     return;
//   }

//   console.log(data);
// });