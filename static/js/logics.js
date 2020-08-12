// Step 1: Store the url for the eartquake dataset chosen as a variable
//============================================================
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Step 2: Perform a GET request to the query URL
//============================================================
d3.json(queryUrl, function(data) {
  createMarkers(data.features);
});

function createMarkers(earthquakeData) {
  console.log(earthquakeData);

// Step 3: create a geoJSON layer
//============================================================
function createMarker(feature, layer) {
  // Give each marker a popup displaying the place and time of the earthquake
  layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><h3>Magnitude: "
    + (feature.properties.mag) + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    
L.geoJSON(earthquakeData, {
  onEachFeature: function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr>Magnitude: "+ feature.properties.mag +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
});

// Step 4: add circle markers basing the size and color on the magnitude (use world cup exercise)
//============================================================
for(var i = 0; i < earthquakeData.length; i++) {
  var color = "";
  console.log(earthquakeData[i].properties.mag);
  var properties = earthquakeData[i].properties;
  var mag = properties.mag;
  if (mag >= 5.0) {
    color = "orange red";
  }
  else if (mag >= 4.0) {
    color = "orange";
  }
  else if (mag >= 3.0) {
    color = "yellow orange";
  }
  else if (mag >= 2.0) {
    color = "yellow";
  }
  else if (mag >= 1.0) {
    color = "yellow green";
  }
  else {
    color = "green";
  }
  
  L.circle(earthquakeData[i].geometry.coordinates, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: mag
  // }).bindPopup("<h1>" + properties.place + "</h1> <hr> <h3>" + mag + "</h3> <hr> <h3>" + properties.time + "</h3>").addTo(myMap);
  }).addTo(myMap);
};

  // Step 5: create the base map
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Step 6: Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// need to figure out how to add this to my map - I'm creating them but not adding them.


 
  // Step 8: create a legend providing context for the map data
//============================================================

  // createMap(earthquakes);
}

