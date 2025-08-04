//  Imports the station data store 
import stationStore from "../models/station-store.js";

// Export s controller object 
export const stationController = {


  
  // Show a single station’s detail page and its readings
  
  showStation(request, response) {
    const stationId = request.params.id; //  Get station ID from the URL https://expressjs.com/en/guide/routing.html#route-parameters, https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction#sending_responses

    const station = stationStore.getStationById(stationId); //  Find matching station by ID

    const viewData = {
      title: `${station.name} Details`,
      station: station, //  Includes readings array
    };

    response.render("station", viewData); //  Renders views/station.hbs with the data
  }

};