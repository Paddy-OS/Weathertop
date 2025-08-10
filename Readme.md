#  WeatherTop — Weather Station Dashboard (Release 1)

  Project Overview

WeatherTop is a Node.js and Express-based web app that allows users to add and view weather stations. Each station displays weather reports, including temperature, wind speed, pressure, and a weather code icon.

This README documents the features  implemented for Release 1.

---

 Features Implemented (Release 1)

 1. Add New Station
- Users can add new weather stations using a form on the dashboard.
- Each station requires only a name.


 2. View all stations
- The dashboard displays a list of all stations as cards.
- Each card shows the station name and includes a button to view its detail page.

 3. Station Detail Page
- Each station has a dedicated detail page accessible via `/station/:id`.
- Users can:
  - Submit a new weather report (code, temperature, wind speed, pressure).


---
Users can now submit a weather report for each station:
- Code
- Temperature (°C)
- Wind Speed (km/h)
- Pressure (hPa)

Submitted reports are stored in memory and displayed on the station page.
 
 Features Implemented (Release 2)

 
 1. Image mapping
- Users can can enter what direction the wind is blowing.
- Each station gets an image based of the weather code , just needs images to be loaded into images folder.


 2. Latitude & Longitude
- can be entered while entering a station.
- Each card shows the station name and includes a button to view its detail page.
