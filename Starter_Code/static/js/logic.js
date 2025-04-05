// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map


// Create the map object with center and zoom options.
// Centered map on Los Angeles
let map = L.map("map-id", {
  center: [34.052235, -118.243683],
  zoom: 13,
  // Then add the 'basemap' tile layer to the map.
  layers: [basemap]
});


// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.


// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    // Create a variable to hold the magnitude data
    let magnitude = feature.features.mag;
    // Initialize an array to hold the magnitude array
    let magnitudeMarkers = [];
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    // Initialize an array to hold the depth
    let depthMarkers = [];
    // Use .forEach to loop through the array
      depth.forEach((feature) => {
      let depthCoordinate = feature.geometry.coordinates[2];
            // Assign color based on depth. The depth coordinate is measure in kilometers. According to the USGS site
            // 0-70 km is shallow, 70-300 km is intermediate, and 300-700 km is deep. 
            let markerColor = depthCoordinate < 70 ? "#d4ff33" : // Light green for a shallow quake
                              depthCoordinate < 300 ? "#bfe728" : // Medium green for an intermediate quake
                              depthCoordinate < 700 ? "#829d1b" : "#000000 "; // Dark green for a deep quake, black for all else
        }
  };

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
  // Loop through the data and populate the magnitudeMarkers array
    for (let i = 0; i < magnitudeMarkers.length; i++) {
      // Create a new object with properties of both magnitude and depth
          let mag = Object.assign({}, magnitudeMarkers[i], depthMarkers[i]);
          // magnitude of quake determines radius of marker. 
          if (!features.mag < 1) {magnitudeMarkers = {L.circleMarker(magnitudeMarkers[i], {
            radius: markerSize(magnitudeMarkers[i].)
          }
          )}}
    }
  };

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {

    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {

    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend


    // Loop through our depth intervals to generate a label with a colored square for each interval.


    return div;
  };

  // Finally, add the legend to the map.


  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.


    // Then add the tectonic_plates layer to the map.

  });
});
