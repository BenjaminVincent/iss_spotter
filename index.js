const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// coords = { lattitude: '43.63190', longitude: '-79.37160' };

// const IP = fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("DIDN'T WORK! ", error);
//     return;
//   }

//   console.log("IT WORKED! RETURNED IP: ", ip);
//   return ip;
// });




// // fetchCoordsByIP('216.232.132.90', (error, data) => {
// //   if (error) {
// //     console.log("DIDN'T WORK! ", error);
// //     return;
// //   }

// //   console.log(data);
// // });

// fetchISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     console.log("DIDN'T WORK! ", error);
//     return;
//   }

//   console.log(data);
// });





