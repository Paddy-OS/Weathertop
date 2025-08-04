
// Holds memory and readings data


const stationStore = {

  //  database of stations https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
  stations: [
    {
      id: "1234",                           //  Unique ID for the station
      name: "Tramore Weather Station",      // 🏷Station name
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

  //  Add a new station 
  addStation(station) {
    this.stations.push(station);
  }
};

export default stationStore;
