//  Import station and report data stores
import stationStore from "../models/station-store.js";
import reportStore from "../models/report-store.js";  //  Store for weather reports

function calcAvg(arr, prop) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  let sum = 0, count = 0;
  for (const r of arr) {
    const val = Number(r?.[prop]);
    if (Number.isFinite(val)) {
      sum += val;
      count++;
    }
  }
  return count ? Number((sum / count).toFixed(1)) : null;
}

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

  const averages = { // CREATES NEW OBJECT FOR AVERAGES
      temperature: calcAvg(reports, "temperature")?? calcAvg(reports, "temp"),// CALLS CALAVG  TO LOOP THROUGH REPORTS AND GET AVERAGES FROM ALL REPORTS
      windSpeed:   calcAvg(reports, "windSpeed") ?? calcAvg(reports, "wind"),
      pressure:    calcAvg(reports, "pressure"),
      
    };

      var temps = [], winds = [], presses = [];                // // arrays to hold temperature, wind, pressure https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?

  
   for (var i = 0; i < reports.length; i++) { // for loop over all reports https://stackoverflow.com/questions/34094905/javascript-comparing-the-current-value-to-the-previous-value-drawn-from-json?
    var r = reports[i];


   var t = Number(r.temperature != null ? r.temperature : r.temp);
      var w = Number(r.windSpeed   != null ? r.windSpeed   : r.wind);
      var p = Number(r.pressure);


    if (isFinite(t)) temps.push(t); // keeps only real numbers and pushes to end of array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite?
    if (isFinite(w)) winds.push(w);
    if (isFinite(p)) presses.push(p);
  }

  function simpleTrend(arr) {                              // compare the last two values in an array
    if (!arr || arr.length < 2) return "steady"; // need at least 2 points to compare
    var prev = arr[arr.length - 2];// second to last value
    var curr = arr[arr.length - 1];
    if (curr > prev) return "up";// went up
    if (curr < prev) return "down";// went down
    return "steady";// remained the same
  }

  var trends = {                                           // pass these to the view
    temperature: simpleTrend(temps), // arrows for variables
    windSpeed:   simpleTrend(winds),
    pressure:    simpleTrend(presses)
  };

//  Render the station
    response.render("station", {
      title: `${station.name} Details`,
      station: station,
      reports: reports,
      latest: latest,
      averages:averages,
      trends: trends 
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
    const {  code,
      temperature,      
      windSpeed,        
      temp,             
      wind,             
      pressure,
      windDirection
    } = request.body;

    const tempVal = temperature != null ? temperature : temp;
    const windVal = windSpeed   != null ? windSpeed   : wind;

    // adds report to report store
    reportStore.addReport(stationId, code, tempVal, windVal, pressure, windDirection);

    // report is now visble from station store https://www.geeksforgeeks.org/web-tech/express-js-res-redirect-function/?utm_
    response.redirect(`/station/${stationId}`);
  },

  // Remove a  report by its id, then go back to that station page https://stackoverflow.com/questions/65015000/how-do-i-use-express-js-app-delete-to-remove-a-specific-object-from-an-array
deleteReport(request, response) {
  const stationId = request.params.stationId;   // which station we return to
  const reportId  = request.params.reportId;    // which report to remove

  reportStore.remove(reportId);                 // delete  report from the store
  return response.redirect(`/station/${stationId}`); // back to the station page
},

// Remove an entire station and all of its reports
deleteStation(request, response) {
    console.log("delete station hit:", request.params.id);
  const stationId = request.params.id;          // station to remove

  reportStore.removeByStationId(stationId);     // clean up all reports for this station
  stationStore.remove(stationId);               // remove the station 

  return response.redirect("/dashboard");       // back to dashboard list
},


};
