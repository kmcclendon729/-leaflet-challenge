// Step 1: create the base map
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Step 2: Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Step 3: Store the url for the earthquake dataset chosen as a variable
//============================================================
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Step 4: Perform a GET request to the query URL
//============================================================
d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  console.log(earthquakeData);

// Step 5: create a geoJSON layer
//============================================================
  L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, coordinates) {
      return L.circleMarker(coordinates);
    },
    style: circleStyle,
    onEachFeature: function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr>Magnitude: "+ feature.properties.mag +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  }).addTo(myMap);

  function circleStyle(feature) {
    return {
      color: getColor(feature.properties.mag),
      radius: feature.properties.mag * 4
    }
  }
  function getColor (mag) {
    var color = ""
    if (mag >= 5.0) {
          color = "red";
        }
        else if (mag >= 4.0) {
          color = "orange";
        }
        else if (mag >= 3.0) {
          color = "yellow";
        }
        else if (mag >= 2.0) {
          color = "green";
        }
        else if (mag >= 1.0) {
          color = "blue";
        }
        else {
          color = "purple";
        } 
        return color
  }

// Step 8: create a legend providing context for the map data
//============================================================
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      mag = ["0", "1", "2", "3", "4", "5"],
      color = [];

  for (var i = 0; i < mag.length; i++) {
    div.innerHTML +=
        '<i style="background:' + getColor(mag[i] + 1) + '"></i> ' +
        mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
  }
  
  return div;
};

legend.addTo(myMap);

}

