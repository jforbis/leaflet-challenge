const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let map = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    titleSize: 600,
    maxZoom: 10,
    zoomOffset: 0,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

let myMap = L.map("map", {
    center: [0,0], 
    zoom: 2,
});

map.addTo(myMap);

d3.json(url, d => {
    L.geoJson(d).addTo(myMap);

    function chooseStyle(feature) {
        return {
            opacity: 2,
            fillOpacity: 2,
            fillColor: chooseColor(feature.properties.mag),
            color: "#000000",
            radius: ,
            stroke: true,
            weight: .5
        };
    }

    function chooseColor(mag) {
        switch(mag) {
            case mag < 10:
                return "green";
            case mag >=10 && mag < 30:
                return "lightgreen";
            case mag >= 30 && mag <50:
                return "yelloworange";
            case mag >= 50 && mag < 70:
                return "lightorange";
            case mag >= 70 && mag < 90:
                return "orange";
            default:
                return "red";
            }
    }

    L.geoJson(d, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: chooseStyle,

        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> Location: " + feature.properties.place);
        }
    })
});
