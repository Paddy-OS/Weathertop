import express from "express";                            // https://expressjs.com/en/starter/hello-world.html
import session from "express-session";
import { engine } from "express-handlebars";              // Template engine: https://www.npmjs.com/package/express-handlebars
import { stationController } from "./controllers/station-controller.js";     // Controller for station views
import { dashboardController } from "./controllers/dashboard-controller.js"; // Controller for dashboard
import { reportController } from "./controllers/report-controller.js"; // controller for report
import { accountsController } from "./controllers/accounts-controller.js"; // Controller for accounts


const app = express();                                     // Create Express app
const port = process.env.PORT || 3000;                                          // Port for hosting

// Middleware

app.use((req, res, next) => { // https://stackoverflow.com/questions/25538962/how-to-write-a-middleware-to-log-the-url-or-the-body-parameters
  console.log("REQ:", req.method, req.url); // accepts incoming requests and logs all
  next();
});




app.use(express.urlencoded({ extended: true }));           // To parse form data
app.use(express.static("public"));                         // To serve static files like CSS/images

app.use(session({                                     //  basic session
  secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
  const uid = req.session.userId || null;   // guest or a real user id or null
  res.locals.currentUserId = uid;
  res.locals.isLoggedIn = !!uid && uid !== "guest";
  next();
});


// Make userId available to all views  https://stackoverflow.com/questions/15622618/where-should-i-store-current-user-in-node-js? , https://stackoverflow.com/questions/47766181/how-can-i-access-session-data-in-an-ejs-template-with-a-node-js-backend?utm
 app.use((req, res, next) => {
  // If not logged in, treat as aguest user
  if (!req.session.userId) {
    req.session.userId = "guest";
  }
  // Make it available to all views 
  res.locals.currentUserId = req.session.userId;
  next();
}); // if not logged in still viewable https://www.onemorecommit.com/2016/01/28/making-data-available-to-all-express-views/?
  

const IMAGES = { // image mapping for weather codes
  "800": "800.png", // clear sky
  "801": "801.png", // few clouds
  "600": "600.png", // light snow
  "502": "502.png", // heavy rain
  "500": "500.png", // light rain
  "202" : "202.png" // thunderstporm

};

const hbsHelpers = {

  trendIcon: function(t) {            // map trend 
  if (t === "up")   return "↑";     // up arrow
  if (t === "down") return "↓";     // down arrow
  return "→";                       // steady (or unknown)
},

// Helper to add users local time and date to report
formatDate: (iso) => {                       // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString?
  if (!iso) return "";                       // if missing/empty, show nothing
  const d = new Date(iso);                   //  convert string into iso date 
  return d.toLocaleString();                 // Convert to the user's local date & time string
},
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
  min(arr, prop) {
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
  max(arr, prop) {
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
app.engine("hbs", engine({
  extname: ".hbs",
  helpers: hbsHelpers,
  layoutsDir: "./views/layouts",
  defaultLayout: "main",
  partialsDir: "./views/partials"
}));        // Use .hbs extension https://stackoverflow.com/questions/43974542/helpers-in-express-handlebars?utm


app.set("view engine", "hbs");
app.set("views", "./views");                               // Folder for view templates

//Accounts controllers routes
app.get("/signup", accountsController.showSignup);     // express routes that connect URLS to account controllers    
app.post("/signup", accountsController.signup);            
app.get("/login", accountsController.showLogin);           
app.post("/login", accountsController.login);              
app.post("/logout", accountsController.logout);
app.get("/logout", accountsController.logout);

// Delete station routes
app.post("/station/:stationId/report/:reportId/delete", reportController.deleteReport);// Delete a report
app.post("/station/:id/delete", stationController.deleteStation);// delete a station

// Member details
app.get("/account",  accountsController.showAccount);
app.post("/account", accountsController.updateAccount);



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