# leaflet-challenge

[<img src="images/earthquake-map.jpg">](https://jforbis.github.io/leaflet-challenge/)

In this project I used data from the United States Geological Survey (USGS) to map earthquakes by both their location, magnitude, and intensity. To accomplish this I did the following:
* Utilized geoJson data from the USGS website, dataset can be found [here](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson).
* I had to view the json data via my console in order to see how to map through it.
* I was able to put markers on my map to show the exact location of each earthquake (Lat/Long coordinates).
* Once my markers were plotted I used d3 to style my markers, render my legend, and apply colors and sizing (using the third coordinate provided in the data - this refers to the depth of the earth where the earthquake generated) to each marker.
* I also created tooltips with popups if the user clicks a marker. These tooltips had both the location and magnitude of each earthquake.

To view my final project please click the image above or [this link](https://jforbis.github.io/leaflet-challenge/).