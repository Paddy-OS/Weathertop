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
    const reports = reportStore.getReportsByStationId(stationId); //  Get all reports for this station

    //  changes data to Handlebars view
    const viewData = {
      title: `${station.name} Details`,
      station: station,
      reports: reports
    };

    //  Render the station https://expressjs.com/en/guide/using-template-engines.html
    response.render("station", viewData);
  }

};
