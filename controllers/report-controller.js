
import reportStore from "../models/report-store.js";  //  Import the report store

export const reportController = {
  //  Handles form POST request to add new weather report
  addReport(request, response) {
    const stationId = request.params.id; //  gets station ID from URL https://expressjs.com/en/guide/routing.html#route-parameters

    const newReport = {
      stationId: stationId,                      //  Link to station
      code: request.body.code,                  //  Weather code 
      temperature: request.body.temperature,    //  Temperature
      windSpeed: request.body.windSpeed,        //  Wind speed
      pressure: request.body.pressure           //  Atmospheric pressure
    };

    reportStore.addReport(newReport);          //  Save the report
    response.redirect("/station/" + stationId); //  Redirect back to station page
  }
};
