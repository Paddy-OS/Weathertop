import { v4 as uuid } from "uuid";

// Import the station data model
import stationStore from "../models/station-store.js";

//  creates and exports object  dashboardcontroller 
export const dashboardController = {

 
  index(req, res) {
    const stations = stationStore.getAllStations(); //  Gets all stations  https://expressjs.com/en/api.html#res.render
    res.render("dashboard", {
      title: "WeatherTop Dashboard",
      stations,
    });
  },

 
  // Add new weather station 

  addStation(req, res) {
    console.log(" Received POST to add station");

    const newStation = {
      id: uuid(),                     //  Unique station ID
      name: req.body.name,           //  Name  form
      readings: []                   //  starts with empty readings
    };

    stationStore.addStation(newStation); //  Add station to memory
    res.redirect("/dashboard");          //  Return to dashboard https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/forms
  }
};