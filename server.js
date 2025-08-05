import express from "express";                            // https://expressjs.com/en/starter/hello-world.html
import { engine } from "express-handlebars";              // Template engine: https://www.npmjs.com/package/express-handlebars
import { stationController } from "./controllers/station-controller.js";     // Controller for station views
import { dashboardController } from "./controllers/dashboard-controller.js"; // Controller for dashboard
import { reportController } from "./controllers/report-controller.js";



const app = express();                                     // Create Express app
const port = 3000;                                         // Port to listen on

// Middleware
app.use(express.urlencoded({ extended: true }));           // To parse form data
app.use(express.static("public"));                         // To serve static files like CSS/images

// Set up Handlebars as the view engine
app.engine("hbs", engine({ extname: ".hbs" }));            // Use .hbs extension
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