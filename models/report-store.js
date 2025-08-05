

// memory storeage for weather reports https://dev.to/arulpiruthiviraj/building-a-crud-rest-api-for-employee-records-using-expressjs-and-in-memory-array-4hjl?utm_
const reportStore = {
  reports: [],  //  Array to hold all weather reports https://stackoverflow.com/questions/26108594/how-to-implement-search-and-filtering-in-a-rest-api-with-nodejs-and-express?utm

  //  Add a new report
  addReport(report) {
    this.reports.push(report);
  },

  // Get reports for a specific station
  getReportsByStationId(stationId) {
    return this.reports.filter((report) => report.stationId === stationId);
  }
};

export default reportStore;
