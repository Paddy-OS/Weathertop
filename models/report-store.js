
import { v4 as uuid } from "uuid"; //  unique IDs for reports

// memory storeage for weather reports https://dev.to/arulpiruthiviraj/building-a-crud-rest-api-for-employee-records-using-expressjs-and-in-memory-array-4hjl?utm_
const reportStore = {
  reports: [],  //  Array to hold all weather reports https://stackoverflow.com/questions/26108594/how-to-implement-search-and-filtering-in-a-rest-api-with-nodejs-and-express?utm

  // Values required for report https://dev.to/arulpiruthiviraj/building-a-crud-rest-api-for-employee-records-using-expressjs-and-in-memory-array-4hjl?utm , https://stackoverflow.com/questions/53706002/express-push-to-testing-array-on-post-request?utm

  addReport(stationId, code, temp, wind, pressure, windDirection) {
    this.reports.push({
      id: uuid(),                       // Unique id
      stationId,                           // station id
      code: parseInt(code, 10),            // Weather code
      temperature: parseFloat(temp),       // Temp
      windSpeed: parseFloat(wind),         // sWind
      pressure: parseFloat(pressure),      // Pressure
      windDirection: parseInt(windDirection), // Wind direction 
      createdAt: new Date().toISOString()
      
    });
  },

  // Get reports for a  station
  getReportsByStationId(stationId) {
    return this.reports.filter((report) => report.stationId === stationId);
  },



  // Remove  report by id
  remove (reportId) {
    for (let i = 0; i < this.reports.length; i++) {
      const report = this.reports[i];
      if (report.id === reportId) {
        this.reports.splice(i, 1);   // delete index i
        return true;                 // if removed something
      }
    }
    return false;                    // nothing matched
  },

  // Remove all reports for a stationId
  removeByStationId (stationId) {
    let removed = 0;
    // loop backwards so splicing doesn't mess up the indexes https://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property
    for (let i = this.reports.length - 1; i >= 0; i--) {
      const report = this.reports[i];
      if (report.stationId === stationId) {
        this.reports.splice(i, 1);
        removed++;
      }
    }
    return removed;
  }
};

export default reportStore;
