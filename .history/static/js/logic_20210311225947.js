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
    L.geoJson(d, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: chooseStyle,

        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> Location: " + feature.properties.place);
        }
    }).addTo(myMap);

    function chooseStyle(feature) {
        return {
            opacity: 2,
            fillOpacity: 2,
            fillColor: chooseColor(feature.properties.mag),
            color: chooseColor(feature.geometry.coordinates[2]),
            radius: chooseSize(feature.properties.mag),
            stroke: true,
            weight: .5
        };
    }

    function chooseSize(mag) {
        return mag * 3;
    };

    function chooseColor(mag) {
        switch(true) {
            case mag > 5:
                return "#964B00";
            case mag > 4:
                return "#B500FF";
            case mag > 3:
                return "#FF0B00";
            case mag > 2:
                return "#FF7F00";
            case mag > 1:
                return "#FFFB00";
            default:
                return "#00FF2F";
            }
    }

    let legend = L.control({
        position: "bottomleft"
    });

    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "legend");

        let intensity = [0,1,2,3,4,5];
        let colors = ["#00FF2F", "FFFB00", "FF7F00", "FF0B00", "B500FF", "964B00"];

        for (let i = 0; i < colors.length; i++) {
            div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            intensity[i] + (intensity[i + 1] ? "&ndash;" + intensity[i + 1] + "<br>" : "+");
        }
        return div;
    };
    legend.addTo(myMap);
});