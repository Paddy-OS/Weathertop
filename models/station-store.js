import { v4 as uuid } from "uuid"; //  Import UUID for unique IDs

// Holds memory and readings data
const stationStore = {

  //  database of stations https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
  stations: [
    {
      id: "1234",                           //  Unique ID for the station
      name: "Tramore Weather Station",      // Station name
      readings: [                           //  Array of  objects
        {
          temperature: 18,                  //  Temperature 
          windSpeed: 10,                    //  Wind speed  
          pressure: 1012                    //  Air pressure in hPa
        }
      ]
    }
  ],

  //  Get all stations 
  getAllStations() {
    return this.stations;
  },

  //  Find one station by its ID https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find


  getStationById(id) {
    return this.stations.find((station) => station.id === id);
  },

   // Add a new station
  addStation({ name, lat, lng, userId }) {
    this.stations.push({
      id: uuid(),                           // New ID
      name,
      lat: parseFloat(lat),                 //  Store as number
      lng: parseFloat(lng),                 //  Store as number
      userId: userId || null,                // Save owner ID if available
      readings: []                          // Start with empty readings
    });
  },

  // Get all stations for a specific user
getStationsByUserId(userId) {
  // Loop through the stations array and return only those with matching Id
  return this.stations.filter(function(station) {
    return station.userId === userId;
  });
},

// Add a new station to the array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push?v=a&
addStation(data) {
  this.stations.push({
    id: uuid(),               // unique id
    name: data.name,
    lat: Number(data.lat),    // convert to number
    lng: Number(data.lng),    // convert to number
    userId: data.userId || null,
    readings: []
  });
}

};

export default stationStore;
