import express from "express";                            // https://expressjs.com/en/starter/hello-world.html
import path from "path";   
import { engine } from "express-handlebars";              // Template engine: https://www.npmjs.com/package/express-handlebars
import { stationController } from "./controllers/station-controller.js";     // Controller for station views
import { dashboardController } from "./controllers/dashboard-controller.js"; // Controller for dashboard
import { reportController } from "./controllers/report-controller.js";



const app = express();                                     // Create Express app
const port = 3000;                                         // Port to listen on

// Middleware
app.use(express.urlencoded({ extended: true }));           // To parse form data
app.use(express.static("public"));                         // To serve static files like CSS/images

const IMAGES = { // image mapping for weather codes
  "100": "sunny.png",
  "200": "cloudy.png",
  "300": "rainy.png",
  "400": "snow.png"
};

const hbsHelpers = {
  // Change wind direction  into a compass direction - https://codepal.ai/code-generator/query/2GmJpNwg/javascript-compass-direction?utm
  compass: function(deg) {
    // If deg is not a number, return an empty string
    if (deg === null || isNaN(deg)) {
      return "";
    }

    // List of compass directions https://stackoverflow.com/questions/36475255/i-have-wind-direction-data-coming-from-openweathermap-api-and-the-data-is-repre?utm
    var dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE",
                "S","SSW","SW","WSW","W","WNW","NW","NNW"];

    // Work out which direction index to use 
    var index = Math.round((deg % 360) / 22.5) % 16; // dividing it by 360 wraps it back around and dividing by 22.5 splits the circle into 16 equal parts

    // Return the matching direction string
    return dirs[index];
  },

  // Find the minimum value for a property
  min: function(arr, prop) {
    if (!arr || arr.length === 0) return "";// check if array is false or empty
    let minValue = arr[0][prop]; // start with first value
    for (let i = 1; i < arr.length; i++) { // starts at index 1 
      if (arr[i][prop] < minValue) {
        minValue = arr[i][prop]; // if value at index i is lower than min value it updates min value to lower temp 
      }
    }
    return minValue;
  },

  // Find the maximum value for a property
  max: function(arr, prop) {
    if (!arr || arr.length === 0) return ""; // checks if array is empty or false
    let maxValue = arr[0][prop]; // start with first value
    for (let i = 1; i < arr.length; i++) { 
      if (arr[i][prop] > maxValue) {
        maxValue = arr[i][prop]; // if index i is greater than max value , max value updated to bigger number
      }
    }
    return maxValue;
  },

  // Path for mapping images to weather codes
  iconFor: function(code) {
    if (!code) return "/images/na.png"; // fall back if no code https://stackoverflow.com/questions/38661295/node-express-handlebars-where-to-define-custom-helpers?
    let file = IMAGES[String(code)] || "na.png";// use matching image assigned for code
    return "/images/" + file;
  }
};




// Set up Handlebars as the view engine
app.engine("hbs", engine({ extname: ".hbs", helpers: hbsHelpers }));            // Use .hbs extension https://stackoverflow.com/questions/43974542/helpers-in-express-handlebars?utm
app.set("view engine", "hbs");
app.set("views", "./views");                               // Folder for view templates


//  View single station page https://expressjs.com/en/guide/routing.html
app.get("/station/:id", stationController.showStation);


//  POST route to add a report to a station
app.post("/station/:id/report", reportController.addReport);


//  Dashboard page with all stations
app.get("/dashboard", dashboardController.index);


//  Add a new station
app.post("/dashboard/addstation", dashboardController.addStation);

//  Redirect root URL to dashboard
app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

// Start the server
app.listen(port, () => {
  console.log(` WeatherTop app running at http://localhost:${port}`);
});