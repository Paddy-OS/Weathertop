
import { v4 as uuid } from "uuid"; // NEW: unique IDs for reports

// memory storeage for weather reports https://dev.to/arulpiruthiviraj/building-a-crud-rest-api-for-employee-records-using-expressjs-and-in-memory-array-4hjl?utm_
const reportStore = {
  reports: [],  //  Array to hold all weather reports https://stackoverflow.com/questions/26108594/how-to-implement-search-and-filtering-in-a-rest-api-with-nodejs-and-express?utm

  // Values required for report https://dev.to/arulpiruthiviraj/building-a-crud-rest-api-for-employee-records-using-expressjs-and-in-memory-array-4hjl?utm , https://stackoverflow.com/questions/53706002/express-push-to-testing-array-on-post-request?utm

  addReport(stationId, code, temp, wind, pressure, windDirection) {
    this.reports.push({
      _id: uuid(),                         // Unique id
      stationId,                           // station id
      code: parseInt(code, 10),            // Weather code
      temperature: parseFloat(temp),       // Temp
      windSpeed: parseFloat(wind),         // sWind
      pressure: parseFloat(pressure),      // Pressure
      windDirection: parseInt(windDirection) // Wind direction 
      
    });
  },

  // Get reports for a  station
  getReportsByStationId(stationId) {
    return this.reports.filter((report) => report.stationId === stationId);
  }
};

export default reportStore;
