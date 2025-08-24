import { v4 as uuid } from "uuid";

// Import the station data model
import stationStore from "../models/station-store.js";

//  creates and exports object  dashboardcontroller 
export const dashboardController = {

 
  index(req, res) {
    const stations = stationStore.getAllStations(); //  Gets all stations  https://expressjs.com/en/api.html#res.render

     const userId = req.session.userId;                  //  users logg in
    const myStations = stations.filter(s => s.userId === userId); //  only users stations

     myStations.sort(function (a, b) { // https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      var nameA = a && a.name ? String(a.name).toLowerCase() : "";// if a exists convert to a string and make it lower case if not present uses empty string
      var nameB = b && b.name ? String(b.name).toLowerCase() : "";// same for b
      if (nameA < nameB) return -1; // if name a comes before b alphabetically return -1 pujtting a first
      if (nameA > nameB) return  1;// if b should come before a put b first
      return 0; // if they start with same letter keep same order
    });


    res.render("dashboard", {
      title: "WeatherTop Dashboard",
      stations:myStations,
    });
  },

 
  // Add new weather station 

  addStation(req, res) {
    console.log(" Received POST to add station");

    const newStation = {
      id: uuid(),                     //  Unique station ID
      name: req.body.name,           //  Name  form
      readings: [],                 //  starts with empty readings
      lat: req.body.lat,
      lng: req.body.lng,
      userId: req.session.userId 
    };

    stationStore.addStation(newStation); //  Add station to memory
    res.redirect("/dashboard");          //  Return to dashboard https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/forms
  }
};