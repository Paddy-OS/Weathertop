//  Import station and report data stores
import stationStore from "../models/station-store.js";
import reportStore from "../models/report-store.js";  //  Store for weather reports

//  Export the station controller object
export const stationController = {

  //  GET stationid
  //  Show a single station's detail page and all its reports
  showStation(request, response) {
    const stationId = request.params.id;  //  Extract station ID from the URL

    const station = stationStore.getStationById(stationId); //  Finds the station by ID
    

       if (!station) {
      // to help debugging https://stackoverflow.com/questions/36837531/how-to-throw-a-404-error-in-express-js?
      return response.status(404).send("Station not found"); 
    }

    const reports = reportStore.getReportsByStationId(stationId); // Gets report for relevant station 

    // Get latest report (if exists)
  let latest = null;
  if (reports.length > 0) {
    latest = reports[reports.length - 1];
  }
//  Render the station
    response.render("station", {
      title: `${station.name} Details`,
      station: station,
      reports: reports,
      latest: latest
    });
  },

  // Add a new report to a station 
  addReport(request, response) {
    const stationId = request.params.id;               //  station id from URL
    const station = stationStore.getStationById(stationId); // check station exists
    if (!station) {
      return response.status(404).send("Station not found"); // Error mesage if no station found https://www.geeksforgeeks.org/javascript/guard-clause-in-javascript/?utm_
    }

    // Info requested in form
    const { code, temp, wind, pressure, windDirection } = request.body;

    // adds report to report store
    reportStore.addReport(stationId, code, temp, wind, pressure, windDirection);

    // report is now visble from station store https://www.geeksforgeeks.org/web-tech/express-js-res-redirect-function/?utm_
    response.redirect(`/station/${stationId}`);
  }

};
