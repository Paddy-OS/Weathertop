
import reportStore from "../models/report-store.js";  //  Import the report store
import stationStore from "../models/station-store.js";

export const reportController = {
  //  Handles form POST request to add new weather report
  addReport(request, response) {
    console.log("Form submitted to add report"); // Log when form is submitted

    const stationId = request.params.id; //  gets station ID from URL https://expressjs.com/en/guide/routing.html#route-parameters
    const station = stationStore.getStationById(stationId); // Find station in store

     if (!station) {
      console.log("Station not found");
      return response.status(404).send("Station not found");
    }

    // Get form values
    const code = request.body.code;                
    const temperature = request.body.temperature;  
    const windSpeed = request.body.windSpeed;      
    const pressure = request.body.pressure;        
    const windDirection = request.body.windDirection; 

     reportStore.addReport(
      stationId,
      code,
      temperature,
      windSpeed,
      pressure,
      windDirection
    );

    
    
    console.log("Report added for station:", stationId);

    // Redirect back to the station page
    response.redirect("/station/" + stationId);
  },

   deleteReport (request, response) {
    // gets ids from the URL
    var stationId = request.params.stationId;
    var reportId  = request.params.reportId;

    // Go back to the same station page
    return response.redirect("/station/" + stationId);
  }
};