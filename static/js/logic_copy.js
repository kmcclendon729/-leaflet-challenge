// Step 1: Store the url for the eartquake dataset chosen as a variable
//============================================================
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Step 2: Perform a GET request to the query URL
//============================================================
d3.json(queryUrl, function (data) {
  console.log(data.features);

  // Use the features array returned from the API call above to create markers
  createMarkers(data.features);
});

// Step 3: Create Markers
function createMarkers(earthquakeData) {
  console.log(earthquakeData);

  function createMarker(feature, layer) {
    // Give each marker a popup displaying the place and time of the earthquake
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><h3>Magnitude: "
      + (feature.properties.mag) + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  // function createCircles(feature, layer) {
    // Define circles as the marker of choice, assign radius and color based on magnitude
    // for(var i = 0; i < earthquakeData[i].length; i++) {
    //   var color = "";
    //   console.log(earthquakeData[i].properties.mag);
    //   var properties = earthquakeData[i].properties;
    //   var mag = properties.mag;

    //   console.log(earthquakeData[i].geometry.coordinates);
    //   var geometry = earthquakeData[i].geometry;
    //   var coordinates = geometry.coordinates;

    //   if (mag >= 5.0) {
    //     color = "orange red";
    //   }
    //   else if (mag >= 4.0) {
    //     color = "orange";
    //   }
    //   else if (mag >= 3.0) {
    //     color = "yellow orange";
    //   }
    //   else if (mag >= 2.0) {
    //     color = "yellow";
    //   }
    //   else if (mag >= 1.0) {
    //     color = "yellow green";
    //   }
    //   else {
    //     color = "green";
    //   }
      
    //   L.circle(coordinates, {
    //     fillOpacity: 0.75,
    //     color: "white",
    //     fillColor: color,
    //     // Adjust radius
    //     radius: mag
    //     // add popup displaying additional earthquake info when clicked
    //   }).addTo(myMap);
};

  // Create a GeoJSON layer containing the markers
  // Run the onEachFeature function once for each marker
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: createMarker
  });

  // Send the GeoJSON layer to the createMap function
  createMap(earthquakes);

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create a new map
  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control 
  // pass in our baseMaps and overlayMaps
  // add layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}