const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let originalmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    titleSize: 600,
    maxZoom: 10,
    zoomOffset: 0,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

let myMap = L.map("map", {
    center: [40.52, -34.34], 
    zoom: 5,
});

originalmap.addTo(myMap);