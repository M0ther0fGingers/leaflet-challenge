// logic_2.js file is a copy of logic.js. 
// The purpose of logic_2.js is to develop the option Step 2 portion without breaking the working part 1 code
// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map
let street = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create the map object with center and zoom options.
// Centered map on Los Angeles
let map = L.map("map", {
  center: [34.052235, -118.243683],
  zoom: 4,
  // Then add the 'basemap' tile layer to the map.
  layers: [basemap]
});


// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
let baseMaps = {
  "Base Map": basemap,
  "Street Map": street
};
// Initialize the overlay layers
let earthquakes = L.layerGroup();
let tectonic_plates = L.layerGroup();
let overlays = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonic_plates
};
// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(
  { "Base Map": basemap, "Topo Map": street }, // Base maps
  { "Earthquakes": earthquakes, "Tectonic Plates": tectonic_plates }, // Overlays
  { collapsed: false }
).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
let earthquakeData = data;
console.log(earthquakes)
// });

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    console.log(feature);
    return {
      fillColor: getColor(feature.geometry.coordinates[2]),
      radius: getRadius(feature.properties.mag),
      fillOpacity: .75,
      color: "white",
      weight: 0.5,
    };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth > 90) {
      return "#fc0f03";
    }
    if (depth > 70) {
      return "#f67103";
    }
    if (depth > 50) {
      return "#f6a603";
    }
    if (depth > 30) {
      return "#f6ec03";
    }    
    if (depth > 10) {
      return "#59a511";
    }
    return "#7cf905";
  };

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    // if the magnitude is 0, 
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
    };

  // Add a GeoJSON layer to the map once the file is loaded.
  let earthquakeLayer = L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      // Create a circle marker for each feature
      return L.circleMarker(latlng, {
        radius: feature.properties.mag * 4, 
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "white",
        weight: 1,
        fillOpacity: 0.75
      })
    },

    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<h3>Magnitude: ${feature.properties.mag}</h3><hr><h3>Depth: ${feature.geometry.coordinates[2]}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(earthquakes);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

// Then add all the details for the legend
legend.onAdd = function (map) {
// Initialize depth intervals and colors for the legend
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 30, 50, 70, 90],
        labels = ["#7cf905", "#59a511", "#f6ec03", "#f6a603", "#f67103", "#fc0f03"];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            // Loop through our depth intervals to generate a label with a colored square for each interval.
            '<i style="background:' + labels[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
  // Finally, add the legend to the map.
legend.addTo(map);


  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.
    let tectonicPlatesLayer = L.geoJson(plate_data, {
      style: function(feature) {
        return {
          color: "orange",
          weight: 1.5
        };
      }
    })
    console.log(tectonicPlatesLayer);
    // let tectonic_plates = plate_data;

    // Then add the tectonic_plates layer to the map.
    tectonicPlatesLayer.addTo(tectonic_plates);
  });
});
